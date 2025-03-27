let wallsHealth = 100;
let points = 0;
let currentTask = "";
let correctAnswer = 0;
let enemyCount = 5;
let mathDifficulty = 10;

// Funkcja generująca zadanie matematyczne
function generateMathTask() {
    let num1 = Math.floor(Math.random() * mathDifficulty) + 1;
    let num2 = Math.floor(Math.random() * mathDifficulty) + 1;
    currentTask = `${num1} + ${num2}`;
    correctAnswer = num1 + num2;
    document.getElementById("task").textContent = `Rozwiąż: ${currentTask}`;
}

// Funkcja sprawdzająca odpowiedź
document.getElementById("submit-answer").addEventListener("click", function() {
    let userAnswer = parseInt(document.getElementById("answer").value);
    if (userAnswer === correctAnswer) {
        points += 10;
        document.getElementById("points").textContent = points;
        alert("Dobrze! Możesz wysłać jednostki.");
        generateMathTask();
    } else {
        alert("Źle! Spróbuj ponownie.");
    }
});

// Funkcje do wysyłania jednostek
document.getElementById("send-swordsman").addEventListener("click", function() {
    if (points >= 10) {
        points -= 10;
        document.getElementById("points").textContent = points;
        alert("Wysłano wojownika!");
        enemyCount--;
        checkGameStatus();
    } else {
        alert("Nie masz wystarczających punktów.");
    }
});

document.getElementById("send-archer").addEventListener("click", function() {
    if (points >= 20) {
        points -= 20;
        document.getElementById("points").textContent = points;
        alert("Wysłano łucznika!");
        enemyCount--;
        checkGameStatus();
    } else {
        alert("Nie masz wystarczających punktów.");
    }
});

// Funkcja sprawdzająca status gry
function checkGameStatus() {
    if (enemyCount <= 0) {
        alert("Wygrałeś bitwę!");
        resetGame();
    } else if (wallsHealth <= 0) {
        alert("Mury zostały zniszczone! Przegrałeś.");
        resetGame();
    }
}

// Funkcja resetująca grę
function resetGame() {
    wallsHealth = 100;
    points = 0;
    enemyCount = 5;
    mathDifficulty = 10;
    document.getElementById("walls-health").textContent = wallsHealth;
    document.getElementById("enemy-count").textContent = enemyCount;
    document.getElementById("points").textContent = points;
    generateMathTask();
}

generateMathTask();  // Uruchamiamy pierwsze zadanie matematyczne
