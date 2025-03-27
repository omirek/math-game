// Zmienne globalne
let points = 0;
let wallHealth = 100;
let units = {
    warrior: { name: "Wojownik", cost: 10, upgraded: false },
    archer: { name: "Łucznik", cost: 20, upgraded: false },
    pikeman: { name: "Pikinier", cost: 20, upgraded: false },
    knight: { name: "Rycerz", cost: 40, upgraded: false },
    catapult: { name: "Katapulta", cost: 50, upgraded: false },
    mage: { name: "Mag", cost: 60, upgraded: false }
};

let eventLog = []; // Dziennik zdarzeń

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

// Funkcja rozwiązywania zadania matematycznego
function solveMathProblem() {
    const answerInput = document.getElementById('answer');
    const answer = parseInt(answerInput.value);
    const correctAnswer = 8 + 4; // Przykładowe zadanie: 5 + 3

    if (answer === correctAnswer) {
        points += 10;
        logEvent(`Rozwiązano zadanie: 8 + 4 = 12`);
        updateStatus();
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
}
