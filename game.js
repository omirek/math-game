// Zmienne do przechowywania stanu gry
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

// Funkcja do aktualizacji statystyk jednostek
function updateUnitStats() {
    const unitStats = document.getElementById('unit-stats');
    unitStats.innerHTML = '';
    for (let unit in units) {
        let unitDiv = document.createElement('div');
        unitDiv.innerHTML = `${unit.charAt(0).toUpperCase() + unit.slice(1)}: Liczba: ${units[unit].count}, Poziom: ${units[unit].level}, Atak: ${units[unit].attack}, Zdrowie: ${units[unit].health}`;
        unitStats.appendChild(unitDiv);
    }
}

// Funkcja do wyświetlania dziennika
function logEvent(message) {
    const eventLog = document.getElementById('event-log');
    const newLogEntry = document.createElement('div');
    newLogEntry.textContent = message;
    eventLog.insertBefore(newLogEntry, eventLog.firstChild); // Dodanie na górze
}

// Funkcja do wysyłania jednostki
function sendUnit(unitName) {
    if (points >= 10) { // Przykładowy koszt wysłania jednostki
        points -= 10;
        units[unitName].count++;
        updateUnitStats();
        logEvent(`Wysłano jednostkę ${unitName}`);
    }
}

// Funkcja do ulepszania jednostek
function upgradeUnit(unitName) {
    const upgradeCost = units[unitName].level * 20;
    if (points >= upgradeCost) {
        points -= upgradeCost;
        units[unitName].level++;
        units[unitName].attack += 5;
        units[unitName].health += 10;
        updateUnitStats();
        logEvent(`Ulepszono jednostkę ${unitName} do poziomu ${units[unitName].level}`);
    }
}

// Aktualizacja wyświetlania punktów i zdrowia murów
function updateDisplay() {
    document.getElementById('points').textContent = `Punkty: ${points}`;
    document.getElementById('wall-health').textContent = `Zdrowie murów: ${wallHealth}`;
}

// Inicjalizacja gry
updateUnitStats();
updateDisplay();
