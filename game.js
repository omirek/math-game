document.addEventListener("DOMContentLoaded", () => {
    let points = 100;
    let wallHealth = 100;
    let enemies = [];
    let units = {
        warrior: { attack: 5, cost: 15, upgradeCost: 20, level: 1, count: 0 },
        archer: { attack: 8, cost: 20, upgradeCost: 30, level: 1, count: 0 },
        pikeman: { attack: 10, cost: 25, upgradeCost: 40, level: 1, count: 0 }
    };

    const pointsDisplay = document.getElementById("points");
    const wallDisplay = document.getElementById("wall-health");
    const eventLog = document.getElementById("event-log");
    const problemDisplay = document.getElementById("problem");
    const answerInput = document.getElementById("answer");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");

    function logEvent(message) {
        eventLog.innerHTML = `<p>${message}</p>` + eventLog.innerHTML;
    }

    function updateDisplay() {
        pointsDisplay.textContent = `Punkty: ${points.toFixed(1)}`;
        wallDisplay.textContent = `Zdrowie murów: ${wallHealth}`;
        Object.keys(units).forEach(unit => {
            document.getElementById(`${unit}-stats`).textContent = 
                `Atak: ${units[unit].attack}, Ilość: ${units[unit].count}, Poziom: ${units[unit].level}`;
        });
    }

    function generateProblem() {
        let a = Math.floor(Math.random() * 10) + 1;
        let b = Math.floor(Math.random() * 10) + 1;
        problemDisplay.textContent = `${a} + ${b}`;
        return a + b;
    }

    let correctAnswer = generateProblem();

    document.getElementById("solve").addEventListener("click", () => {
        if (parseInt(answerInput.value) === correctAnswer) {
            points += 5;
            logEvent("Poprawna odpowiedź! Otrzymujesz 5 punktów.");
            correctSound.play();
        } else {
            logEvent("Błędna odpowiedź!");
            wrongSound.play();
        }
        answerInput.value = "";
        correctAnswer = generateProblem();
        updateDisplay();
    });

    answerInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            document.getElementById("solve").click();
        }
    });

    Object.keys(units).forEach(unit => {
        document.getElementById(`send-${unit}`).addEventListener("click", () => {
            if (points >= units[unit].cost) {
                points -= units[unit].cost;
                units[unit].count++;
                logEvent(`Wysłano ${unit} na pole bitwy.`);
                updateDisplay();
            } else {
                logEvent("Za mało punktów!");
            }
        });

        document.getElementById(`upgrade-${unit}`).addEventListener("click", () => {
            if (points >= units[unit].upgradeCost) {
                points -= units[unit].upgradeCost;
                units[unit].attack += 3;
                units[unit].level++;
                units[unit].upgradeCost += 10;
                logEvent(`${unit} został ulepszony do poziomu ${units[unit].level}!`);
                updateDisplay();
            } else {
                logEvent("Za mało punktów na ulepszenie!");
            }
        });
    });

    document.getElementById("repair-wall").addEventListener("click", () => {
        if (points >= 30) {
            points -= 30;
            wallHealth = Math.min(100, wallHealth + 20);
            logEvent("Naprawiono mury!");
            updateDisplay();
        } else {
            logEvent("Za mało punktów na naprawę!");
        }
    });

    function enemyAttack() {
        if (wallHealth > 0) {
            wallHealth -= Math.max(1, enemies.length * 2);
            logEvent("Wróg atakuje mury!");
            updateDisplay();
        }
    }

    setInterval(enemyAttack, 5000);
    setInterval(() => { points = Math.max(0, points - 0.1); updateDisplay(); }, 1000);

    updateDisplay();
});
