document.addEventListener("DOMContentLoaded", () => {
    let points = 100;
    let wallHealth = 100;
    let units = {
        warrior: { level: 1, attack: 5, cost: 15, upgradeCost: 20, count: 0 },
        archer: { level: 1, attack: 8, cost: 20, upgradeCost: 30, count: 0 }
    };
    let enemies = [];
    
    function logEvent(message) {
        const logEntries = document.getElementById("log-entries");
        const entry = document.createElement("div");
        entry.textContent = message;
        logEntries.prepend(entry);
    }
    
    function updateUI() {
        document.getElementById("wall-health").textContent = `Mury: ${wallHealth}%`;
        document.getElementById("wall-bar-fill").style.width = `${wallHealth}%`;
        document.getElementById("warrior-level").textContent = units.warrior.level;
        document.getElementById("warrior-attack").textContent = units.warrior.attack;
        document.getElementById("archer-level").textContent = units.archer.level;
        document.getElementById("archer-attack").textContent = units.archer.attack;
    }
    
    function solveMathProblem() {
        const answer = parseInt(document.getElementById("answer").value, 10);
        if (answer === currentProblem.solution) {
            points += 10;
            logEvent("Poprawna odpowiedź! Otrzymujesz 10 punktów.");
        } else {
            logEvent("Niepoprawna odpowiedź.");
        }
        generateMathProblem();
        updateUI();
    }
    
    function generateMathProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        currentProblem = {
            question: `${num1} + ${num2}`,
            solution: num1 + num2
        };
        document.getElementById("problem").textContent = currentProblem.question;
    }
    
    document.getElementById("solve").addEventListener("click", solveMathProblem);
    generateMathProblem();
    updateUI();
});
