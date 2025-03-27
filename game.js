document.addEventListener("DOMContentLoaded", () => {
    let points = 100;
    let wallHealth = 100;
    let enemies = [{ health: 50, attack: 2 }];
    let units = {
        warrior: { attack: 5, cost: 15, upgradeCost: 20, level: 1, count: 0, health: 30 },
        archer: { attack: 8, cost: 20, upgradeCost: 30, level: 1, count: 0, health: 25 },
        pikeman: { attack: 10, cost: 25, upgradeCost: 40, level: 1, count: 0, health: 40 }
    };

    const pointsDisplay = document.getElementById("points");
    const wallDisplay = document.getElementById("wall-health");
    const eventLog = document.getElementById("event-log");
    const problemDisplay = document.getElementById("problem");
    const answerInput = document.getElementById("answer");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");
    const enemyCountDisplay = document.getElementById("enemy-count");

    function logEvent(message) {
        eventLog.innerHTML = `<p>${message}</p>` + eventLog.innerHTML;
    }

    function updateDisplay() {
        pointsDisplay.textContent = `Punkty: ${points.toFixed(1)}`;
        wallDisplay.textContent = `Zdrowie murów: ${wallHealth}`;
        Object.keys(units).forEach(unit => {
            document.getElementById(`${unit}-stats`).textContent = 
                `Atak: ${units[unit].attack}, Ilość: ${units[unit].count}, Poziom: ${units[unit].level}, Zdrowie: ${units[unit].health}`;
        });
        updateEnemyCount();
    }

    function updateEnemyCount() {
        enemyCountDisplay.textContent = `Liczba wrogów: ${enemies.length}`;
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
                units[unit].health += 5; // Zwiększamy zdrowie jednostki przy ulepszeniu
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
            let totalAttack = enemies.reduce((sum, enemy) => sum + enemy.attack, 0);
            wallHealth -= totalAttack;
            logEvent(`Wróg atakuje mury za ${totalAttack} obrażeń!`);
            updateDisplay();

            if (wallHealth <= 0) {
                logEvent("Mury zostały zniszczone! Przegrana.");
                // Możemy tutaj dodać logikę zakończenia gry
            }
        }
    }

    function spawnEnemy() {
        enemies.push({ health: 50, attack: Math.floor(Math.random() * 5) + 1 });
        logEvent("Nowy wróg pojawił się na polu bitwy!");
        updateEnemyCount();
    }

    function unitAttack() {
        units.forEach(unit => {
            if (unit.count > 0) {
                // Dodajemy logiczne uderzenie jednostek
            }
        });
    }

    setInterval(enemyAttack, 10000); // Co 10 sekund atak wroga
    setInterval(spawnEnemy, 15000); // Co 15 sekund pojawiają się nowi wrogowie


    updateDisplay();
});
