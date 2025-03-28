document.addEventListener("DOMContentLoaded", () => {
    let points = 100;
    let wallHealth = 100;
    let units = {
        warrior: { level: 1, attack: 5, cost: 15, upgradeCost: 20, count: 0 },
        archer: { level: 1, attack: 8, cost: 20, upgradeCost: 30, count: 0 }
    };
    let enemies = 0;

    function updateUI() {
        document.getElementById("wall-health").textContent = `Mury: ${wallHealth}%`;
        document.getElementById("wall-bar-fill").style.width = `${wallHealth}%`;
        document.getElementById("log-entries").innerHTML = log.join("<br>");
    }

    function recruitUnit(type) {
        if (points >= units[type].cost) {
            points -= units[type].cost;
            units[type].count++;
            logEvent(`Zrekrutowano ${type} (Razem: ${units[type].count})`);
            updateUI();
        }
    }

    function upgradeUnit(type) {
        if (points >= units[type].upgradeCost) {
            points -= units[type].upgradeCost;
            units[type].level++;
            units[type].attack += 3;
            logEvent(`${type} ulepszony do poziomu ${units[type].level}`);
            updateUI();
        }
    }

    function solveMathProblem() {
        let answer = parseInt(document.getElementById("answer").value);
        if (answer === currentProblem.result) {
            logEvent("Poprawna odpowiedź! Wysłano jednostkę do walki.");
            sendUnit();
        } else {
            logEvent("Błędna odpowiedź!");
        }
        updateUI();
    }

    function sendUnit() {
        if (units.warrior.count > 0) {
            units.warrior.count--;
            enemies--;
            logEvent("Wojownik walczy z wrogiem!");
            updateUI();
        }
    }

    function enemyAttack() {
        if (enemies > 0) {
            wallHealth -= 5;
            logEvent("Wróg atakuje! Mury tracą zdrowie.");
            if (wallHealth <= 0) {
                logEvent("Mury zniszczone! Przegrana!");
            }
            updateUI();
        }
    }

    function logEvent(message) {
        log.unshift(message);
        updateUI();
    }

    document.getElementById("solve").addEventListener("click", solveMathProblem);
    document.getElementById("recruit-warrior").addEventListener("click", () => recruitUnit("warrior"));
    document.getElementById("upgrade-warrior").addEventListener("click", () => upgradeUnit("warrior"));
    
    setInterval(enemyAttack, 5000);
    updateUI();
});
