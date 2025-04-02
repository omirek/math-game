document.addEventListener("DOMContentLoaded", () => {
    let points = 100;
    let wallHealth = 100;
    let units = {
        warrior: { level: 1, attack: 5, cost: 15, upgradeCost: 20, instances: [] },
        archer: { level: 1, attack: 8, cost: 20, upgradeCost: 30, instances: [] }
    };
    let enemies = [];
    let currentProblem = {};

    setTimeout(spawnEnemy, 30000 + Math.random() * 30000);
    setInterval(enemyAttack, 10000);

    function logEvent(message) {
        const logEntries = document.getElementById("log-entries");
        if (logEntries) {
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
        updateEnemyIcons();
        updateDefenderIcons();
    }

    function solveMathProblem() {
        const answer = parseInt(document.getElementById("answer").value, 10);
        if (answer === currentProblem.solution) {
            points += 10;
            logEvent("Poprawna odpowiedź! Otrzymujesz 10 punktów.");
            playSound("correct-answer-sound.mp3");
            generateMathProblem();
            updatePointsDisplay();
        } else {
            logEvent("Niepoprawna odpowiedź. Spróbuj ponownie.");
            playSound("wrong-answer-sound.mp3");
        }
        updateUI();
    }

    function playSound(filename) {
        const audio = new Audio(filename);
        audio.play();
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

    function spawnEnemy() {
        const enemy = {
            health: 20 + Math.floor(Math.random() * 10),
            attack: 5 + Math.floor(Math.random() * 5)
        };
        enemies.push(enemy);
        logEvent("Pojawił się nowy wróg!");
        updateEnemyIcons();
        setTimeout(spawnEnemy, 30000 + Math.random() * 30000);
    }

    function enemyAttack() {
        if (enemies.length === 0) return;
        enemies.forEach(enemy => {
            let target = findWeakestDefender();
            if (target) {
                target.health -= enemy.attack;
                logEvent(`Wróg zaatakował obrońcę! Pozostałe HP: ${target.health}`);
                if (target.health <= 0) {
                    units[target.type].instances = units[target.type].instances.filter(d => d !== target);
                    logEvent(`Obrońca (${target.type}) został pokonany!`);
                }
                updateHealthBars();
            } else {
                wallHealth -= enemy.attack;
                logEvent(`Wróg uderzył w mury! Pozostałe HP murów: ${wallHealth}`);
            }
        });
        updateUI();
    }

    function updateHealthBars() {
        const defenderIcons = document.querySelectorAll("#defender-icons .defender-icon");
        defenderIcons.forEach((icon, index) => {
            let healthFill = icon.querySelector(".health-fill");
            let defender = index < units.warrior.instances.length ? units.warrior.instances[index] : units.archer.instances[index - units.warrior.instances.length];
            healthFill.style.width = `${(defender.health / defender.maxHealth) * 100}%`;
        });
    }

    function findWeakestDefender() {
        let weakest = null;
        Object.keys(units).forEach(type => {
            units[type].instances.forEach(defender => {
                if (!weakest || defender.health < weakest.health) {
                    weakest = defender;
                }
            });
        });
        return weakest;
    }

    function updateEnemyIcons() {
        const enemyIcons = document.getElementById("enemy-icons");
        enemyIcons.innerHTML = '';
        enemies.forEach(() => {
            const enemyIcon = document.createElement("div");
            enemyIcon.classList.add("enemy-icon");
            enemyIcons.appendChild(enemyIcon);
        });
    }

    function recruitUnit(unitType) {
        const unit = units[unitType];
        if (points >= unit.cost) {
            points -= unit.cost;
            const newUnit = { type: unitType, health: unit.health, maxHealth: unit.health };
            unit.instances.push(newUnit);
            logEvent(`Zrekrutowano jednostkę: ${unitType}.`);
            logEvent(`Pozostałe punkty: ${points}`);
            updateDefenderIcons();
            updateUI();
            updatePointsDisplay();
        } else {
            logEvent("Nie masz wystarczającej ilości punktów.");
        }
    }

    function updateDefenderIcons() {
        const defenderIcons = document.getElementById("defender-icons");
        defenderIcons.innerHTML = '';
        units.warrior.instances.forEach(() => {
            const warriorDiv = document.createElement("div");
            warriorDiv.classList.add("defender-icon", "warrior");
            const healthBar = document.createElement("div");
            healthBar.classList.add("health-bar");
            const healthFill = document.createElement("div");
            healthFill.classList.add("health-fill");
            healthFill.style.width = "100%";
            healthBar.appendChild(healthFill);
            warriorDiv.appendChild(healthBar);
            defenderIcons.appendChild(warriorDiv);
        });
        units.archer.instances.forEach(() => {
            const archerDiv = document.createElement("div");
            archerDiv.classList.add("defender-icon", "archer");
            const healthBar = document.createElement("div");
            healthBar.classList.add("health-bar");
            const healthFill = document.createElement("div");
            healthFill.classList.add("health-fill");
            healthFill.style.width = "100%";
            healthBar.appendChild(healthFill);
            archerDiv.appendChild(healthBar);
            defenderIcons.appendChild(archerDiv);
        });
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
