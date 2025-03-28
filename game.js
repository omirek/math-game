document.addEventListener("DOMContentLoaded", () => {
    let points = 100;
    let wallHealth = 100;
    let units = {
    warrior: { level: 1, attack: 5, cost: 15, upgradeCost: 20, count: 0, health: 100 },
    archer: { level: 1, attack: 8, cost: 20, upgradeCost: 30, count: 0, health: 80 }
};
    let enemies = [];
    let currentProblem = {}; // Poprawiona deklaracja zmiennej

    function logEvent(message) {
        const logEntries = document.getElementById("log-entries");
        if (logEntries) { // Sprawdzenie czy element istnieje
            const entry = document.createElement("div");
            entry.textContent = message;
            logEntries.prepend(entry);
        } else {
            console.error("Element log-entries nie istnieje w HTML.");
        }
    }

   function updateUI() {
    document.getElementById("wall-health").textContent = `Mury: ${wallHealth}%`;
    document.getElementById("wall-bar-fill").style.width = `${wallHealth}%`;
    document.getElementById("warrior-level").textContent = units.warrior.level;
    document.getElementById("warrior-attack").textContent = units.warrior.attack;
    document.getElementById("archer-level").textContent = units.archer.level;
    document.getElementById("archer-attack").textContent = units.archer.attack;
    document.getElementById("points-display").textContent = `Punkty: ${points}`;
}


// Funkcja rozwiązująca zadanie matematyczne, dodająca punkty
function solveMathProblem() {
    const answer = parseInt(document.getElementById("answer").value, 10);
    if (answer === currentProblem.solution) {
        points += 10; // Dodajemy 10 punktów za poprawną odpowiedź
        logEvent("Poprawna odpowiedź! Otrzymujesz 10 punktów.");
    } else {
        logEvent("Niepoprawna odpowiedź.");
    }
    generateMathProblem();
    updatePointsDisplay(); // Zaktualizowanie wyświetlania punktów
}

    function generateMathProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        currentProblem = {
            question: `${num1} + ${num2}`,
            solution: num1 + num2
        };
        const problemElement = document.getElementById("problem");
        if (problemElement) {
            problemElement.textContent = currentProblem.question;
        } else {
            console.error("Element problem nie istnieje w HTML.");
        }
    }

function recruitUnit(unitType) {
    const unit = units[unitType];
    
    if (points >= unit.cost) {
        points -= unit.cost;
        unit.count++;
        logEvent(`Zrekrutowano jednostkę: ${unitType}.`);
        logEvent(`Pozostałe punkty: ${points}`);
        updateDefenderIcons();  // Aktualizujemy ikony obrońców
        updateUI();
        updatePointsDisplay();
    } else {
        logEvent("Nie masz wystarczającej ilości punktów.");
    }
}


    function updateDefenderIcons() {
    const defenderIcons = document.getElementById("defender-icons");
    defenderIcons.innerHTML = '';  // Czyścimy poprzednią zawartość

    // Dodajemy ikony dla wojowników
    for (let i = 0; i < units.warrior.count; i++) {
        const warriorDiv = document.createElement("div");
        warriorDiv.classList.add("defender-icon", "warrior");

        // Pasek zdrowia
        const healthBar = document.createElement("div");
        healthBar.classList.add("health-bar");

        const healthFill = document.createElement("div");
        healthFill.classList.add("health-fill");
        healthFill.style.width = "100%"; // Pełne zdrowie na start

        healthBar.appendChild(healthFill);
        warriorDiv.appendChild(healthBar);

        defenderIcons.appendChild(warriorDiv);
    }

    // Dodajemy ikony dla łuczników
    for (let i = 0; i < units.archer.count; i++) {
        const archerDiv = document.createElement("div");
        archerDiv.classList.add("defender-icon", "archer");

        // Pasek zdrowia
        const healthBar = document.createElement("div");
        healthBar.classList.add("health-bar");

        const healthFill = document.createElement("div");
        healthFill.classList.add("health-fill");
        healthFill.style.width = "100%";

        healthBar.appendChild(healthFill);
        archerDiv.appendChild(healthBar);

        defenderIcons.appendChild(archerDiv);
    }
}


    function upgradeUnit(type) {
        if (points >= units[type].upgradeCost) {
            points -= units[type].upgradeCost;
            units[type].level++;
            units[type].attack += 3;
            logEvent(`Ulepszono jednostkę: ${type}.`);
        } else {
            logEvent(`Za mało punktów na ulepszenie: ${type}.`);
        }
        updateUI();
    }

    // Funkcja aktualizująca wyświetlanie punktów w interfejsie
function updatePointsDisplay() {
    document.getElementById("points-display").textContent = `Punkty: ${points}`;
}

    document.getElementById("solve")?.addEventListener("click", solveMathProblem);
    document.getElementById("recruit-warrior")?.addEventListener("click", () => recruitUnit("warrior"));
    document.getElementById("recruit-archer")?.addEventListener("click", () => recruitUnit("archer"));
    document.getElementById("upgrade-warrior")?.addEventListener("click", () => upgradeUnit("warrior"));
    document.getElementById("upgrade-archer")?.addEventListener("click", () => upgradeUnit("archer"));

    generateMathProblem();
    updateUI();
});
