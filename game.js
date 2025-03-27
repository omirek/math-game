document.addEventListener("DOMContentLoaded", function () {
    let points = 100; // Punkty gracza
    let wallHealth = 100; // Zdrowie murów

    let units = {
        warrior: { count: 0, level: 1, attack: 5, health: 20 },
        archer: { count: 0, level: 1, attack: 8, health: 15 },
        pikeman: { count: 0, level: 1, attack: 10, health: 25 },
        knight: { count: 0, level: 1, attack: 15, health: 40 },
        catapult: { count: 0, level: 1, attack: 20, health: 50 },
        mage: { count: 0, level: 1, attack: 25, health: 30 }
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
            logEvent("Błędna odpowiedź! Spróbuj ponownie.");
        }
        updateDisplay();
        generateMathProblem();
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
    }

    // Podpinanie eventów do przycisków
    document.getElementById("answer").addEventListener("keydown", function (event) {
        if (event.key === "Enter") solveMathProblem();
    });

    document.querySelector(".math button").addEventListener("click", solveMathProblem);

    // Inicjalizacja
    updateDisplay();
    generateMathProblem();
});
