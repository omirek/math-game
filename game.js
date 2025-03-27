// Zmienne globalne
let points = 0;
let wallHealth = 100;
let units = {
    warrior: { 
        name: "Wojownik", 
        cost: 10, 
        attack: 5, 
        defense: 2, 
        speed: 1, 
        upgraded: false 
    },
    archer: { 
        name: "Łucznik", 
        cost: 20, 
        attack: 6, 
        defense: 1, 
        speed: 2, 
        upgraded: false 
    },
    pikeman: { 
        name: "Pikinier", 
        cost: 20, 
        attack: 7, 
        defense: 3, 
        speed: 1, 
        upgraded: false 
    },
    knight: { 
        name: "Rycerz", 
        cost: 40, 
        attack: 8, 
        defense: 4, 
        speed: 2, 
        upgraded: false 
    },
    catapult: { 
        name: "Katapulta", 
        cost: 50, 
        attack: 10, 
        defense: 2, 
        speed: 0, 
        upgraded: false 
    },
    mage: { 
        name: "Mag", 
        cost: 60, 
        attack: 12, 
        defense: 1, 
        speed: 3, 
        upgraded: false 
    }
};

let eventLog = []; // Dziennik zdarzeń
let correctAnswer = 0; // Prawidłowa odpowiedź

// Funkcja logowania wydarzeń
function logEvent(message) {
    eventLog.push(message);
    updateEventLog();
}

// Funkcja aktualizacji dziennika
function updateEventLog() {
    const logContainer = document.getElementById('event-log');
    logContainer.innerHTML = '';  // Wyczyść zawartość dziennika
    eventLog.forEach(event => {
        let logEntry = document.createElement('div');
        logEntry.textContent = event;
        logContainer.appendChild(logEntry);
    });
}

// Funkcja losowania nowego zadania matematycznego
function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Losowa liczba od 1 do 10
    const num2 = Math.floor(Math.random() * 10) + 1; // Losowa liczba od 1 do 10
    correctAnswer = num1 + num2; // Prawidłowa odpowiedź
    const problemText = `${num1} + ${num2} = ?`; // Tekst zadania
    document.getElementById('problem').textContent = problemText; // Wyświetlenie zadania
}

// Funkcja rozwiązywania zadania matematycznego
function solveMathProblem() {
    const answerInput = document.getElementById('answer');
    const answer = parseInt(answerInput.value);

    if (answer === correctAnswer) {
        points += 10;
        logEvent(`Rozwiązano zadanie: ${document.getElementById('problem').textContent}`);
        updateStatus();
        generateMathProblem(); // Losowanie nowego zadania
    } else {
        logEvent(`Błędna odpowiedź! Spróbuj ponownie.`);
    }
    answerInput.value = ''; // Wyczyść pole odpowiedzi
}

// Funkcja wysyłania jednostki
function sendUnit(unitName) {
    if (units[unitName]) {
        let unit = units[unitName];
        if (points >= unit.cost) {
            points -= unit.cost;
            logEvent(`${unit.name} został wysłany do obrony!`);
            updateStatus();
        } else {
            logEvent(`Nie masz wystarczająco punktów na wysłanie ${unit.name}.`);
        }
    }
}

// Funkcja ulepszania jednostki
function upgradeUnit(unitName) {
    if (units[unitName]) {
        let unit = units[unitName];
        let upgradeCost = 0;
        if (unitName === 'warrior' && !unit.upgraded) upgradeCost = 30;
        if (unitName === 'archer' && !unit.upgraded) upgradeCost = 40;
        if (unitName === 'knight' && !unit.upgraded) upgradeCost = 50;

        if (points >= upgradeCost) {
            points -= upgradeCost;
            unit.upgraded = true;
            unit.attack += 3;  // Przykład zwiększenia statystyk po ulepszeniu
            unit.defense += 2;  // Zwiększenie obrony
            unit.speed += 1;    // Zwiększenie szybkości
            logEvent(`${unit.name} został ulepszony!`);
            updateStatus();
        } else {
            logEvent(`Nie masz wystarczająco punktów na ulepszenie ${unit.name}.`);
        }
    }
}

// Funkcja aktualizacji stanu gry
function updateStatus() {
    document.getElementById('points').textContent = `Punkty: ${points}`;
    document.getElementById('wall-health').textContent = `Zdrowie murów: ${wallHealth}`;
    // Pokaż statystyki jednostek
    const unitStats = document.getElementById('unit-stats');
    unitStats.innerHTML = '';
    for (let unitName in units) {
        const unit = units[unitName];
        const unitInfo = document.createElement('div');
        unitInfo.textContent = `${unit.name} - Atak: ${unit.attack}, Obrona: ${unit.defense}, Szybkość: ${unit.speed}`;
        unitStats.appendChild(unitInfo);
    }
}

// Funkcja symulacji ataku wroga
function enemyAttack() {
    const damage = Math.floor(Math.random() * 20) + 1;  // Losowe obrażenia od 1 do 20
    wallHealth -= damage;
    logEvent(`Wrogowie zaatakowali! Zniszczono ${damage} punktów zdrowia murów.`);
    if (wallHealth <= 0) {
        logEvent("Mury zostały zniszczone! Przegrana.");
        alert("Przegrana! Mury zostały zniszczone.");
        resetGame();  // Zresetowanie gry
    }
    updateStatus();
}

// Funkcja resetująca grę
function resetGame() {
    points = 0;
    wallHealth = 100;
    for (let unitName in units) {
        units[unitName].upgraded = false;
        units[unitName].attack = units[unitName].cost / 2; // Reset statystyk jednostek
        units[unitName].defense = units[unitName].cost / 5;
        units[unitName].speed = 1;
    }
    updateStatus();
}

// Nasłuchiwanie kliknięć na przyciski po załadowaniu strony
document.addEventListener("DOMContentLoaded", function() {
    generateMathProblem(); // Generowanie pierwszego zadania matematycznego

    // Nasłuchiwać na przyciski jednostek i ulepszeń
    document.getElementById('warriorButton').addEventListener('click', function() { sendUnit('warrior'); });
    document.getElementById('archerButton').addEventListener('click', function() { sendUnit('archer'); });
    document.getElementById('pikemanButton').addEventListener('click', function() { sendUnit('pikeman'); });
    document.getElementById('knightButton').addEventListener('click', function() { sendUnit('knight'); });
    document.getElementById('catapultButton').addEventListener('click', function() { sendUnit('catapult'); });
    document.getElementById('mageButton').addEventListener('click', function() { sendUnit('mage'); });

    document.getElementById('upgradeWarriorButton').addEventListener('click', function() { upgradeUnit('warrior'); });
    document.getElementById('upgradeArcherButton').addEventListener('click', function() { upgradeUnit('archer'); });
    document.getElementById('upgradeKnightButton').addEventListener('click', function() { upgradeUnit('knight'); });

    // Co kilka sekund atak wroga
    setInterval(enemyAttack, 3000);  // Atak co 3 sekundy
});
