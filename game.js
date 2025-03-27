document.addEventListener("DOMContentLoaded", function () {
    let points = 100;
    let wallHealth = 100;

    let units = {
        warrior: { count: 0, level: 1, attack: 5, health: 20, upgradeCost: 20 },
        archer: { count: 0, level: 1, attack: 8, health: 15, upgradeCost: 30 },
        pikeman: { count: 0, level: 1, attack: 10, health: 25, upgradeCost: 40 }
    };

    let currentProblem = {};

    function generateMathProblem() {
        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let isMultiplication = Math.random() > 0.5;

        currentProblem = {
            question: isMultiplication ? `${num1} × ${num2}` : `${num1} + ${num2}`,
            answer: isMultiplication ? num1 * num2 : num1 + num2
        };

        document.getElementById("problem").textContent = currentProblem.question + " = ?";
    }

    function solveMathProblem() {
        let userAnswer = parseInt(document.getElementById("answer").value);
        if (userAnswer === currentProblem.answer) {
            points += 10;
            logEvent("Poprawna odpowiedź! Otrzymujesz 10 punktów.");
        } else {
            logEvent("Błędna odpowiedź!");
        }
        updateDisplay();
        generateMathProblem();
    }

    function sendUnit(type) {
        if (units[type].count > 0) {
            logEvent(`Wysłałeś ${type} do obrony.`);
            units[type].count--;
            enemyAttack();
        }
        updateDisplay();
    }

    function upgradeUnit(type) {
        if (points >= units[type].upgradeCost) {
            points -= units[type].upgradeCost;
            units[type].level++;
            units[type].attack += 2;
            units[type].health += 5;
            units[type].upgradeCost += 10;
            logEvent(`${type} ulepszony do poziomu ${units[type].level}`);
        } else {
            logEvent("Za mało punktów na ulepszenie!");
        }
        updateDisplay();
    }

    function enemyAttack() {
        let damage = Math.floor(Math.random() * 10) + 5;
        wallHealth -= damage;
        logEvent(`Wróg zaatakował! Mury tracą ${damage} HP.`);
        if (wallHealth <= 0) {
            logEvent("Mury zostały zniszczone! Przegrałeś!");
        }
        updateDisplay();
    }

    function logEvent(message) {
        const eventLog = document.getElementById('event-log');
        const newLogEntry = document.createElement('div');
        newLogEntry.textContent = message;
        eventLog.insertBefore(newLogEntry, eventLog.firstChild);
    }

    function updateDisplay() {
        document.getElementById('points').textContent = `Punkty: ${points}`;
        document.getElementById('wall-health').textContent = `Zdrowie murów: ${wallHealth}`;
        document.getElementById('warrior-stats').textContent = `Wojownik: Poziom ${units.warrior.level}, Atak ${units.warrior.attack}`;
        document.getElementById('archer-stats').textContent = `Łucznik: Poziom ${units.archer.level}, Atak ${units.archer.attack}`;
        document.getElementById('pikeman-stats').textContent = `Pikinier: Poziom ${units.pikeman.level}, Atak ${units.pikeman.attack}`;
    }

    // Eventy dla przycisków
    document.getElementById("solve").addEventListener("click", solveMathProblem);
    document.getElementById("send-warrior").addEventListener("click", () => sendUnit('warrior'));
    document.getElementById("send-archer").addEventListener("click", () => sendUnit('archer'));
    document.getElementById("send-pikeman").addEventListener("click", () => sendUnit('pikeman'));
    document.getElementById("upgrade-warrior").addEventListener("click", () => upgradeUnit('warrior'));
    document.getElementById("upgrade-archer").addEventListener("click", () => upgradeUnit('archer'));
    document.getElementById("upgrade-pikeman").addEventListener("click", () => upgradeUnit('pikeman'));

    updateDisplay();
    generateMathProblem();
});
