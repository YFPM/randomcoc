// Liste des troupes avec leur coût en espace
const troops = [
    { name: "Barbare", space: 1 },
    { name: "Archère", space: 1 },
    { name: "Géant", space: 5 },
    { name: "Sapeur", space: 2 },
    { name: "Sorcier", space: 4 },
    { name: "Dragon", space: 20 },
    { name: "Bébé Dragon", space: 10 },
    { name: "P.E.K.K.A", space: 25 },
    { name: "Mineur", space: 6 },
    { name: "Valkyrie", space: 8 },
    { name: "Boulistes", space: 6 },
    { name: "Sorcier de glace", space: 4 },
];

// Variables pour le joueur et le classement
let playerName = '';
let campSize = 0;
let availableTroops = [];
let victories = 0;
let currentArmy = {}; // Pour stocker la composition actuelle

// Événement pour le bouton de démarrage
document.getElementById("startButton").addEventListener("click", function() {
    playerName = document.getElementById("playerName").value;
    const hdvLevel = parseInt(document.getElementById("hdvLevel").value);

    if (!playerName || isNaN(hdvLevel) || hdvLevel < 1) {
        alert("Veuillez entrer un pseudo valide et un niveau d'Hôtel de Ville.");
        return;
    }

    document.getElementById("welcomeContainer").style.display = "none";
    document.getElementById("troopSelectionContainer").style.display = "block";

    // Afficher les cases à cocher pour les troupes disponibles
    const troopCheckboxes = document.getElementById("troopCheckboxes");
    troopCheckboxes.innerHTML = ''; // Réinitialiser le contenu

    troops.forEach(troop => {
        const checkbox = document.createElement("div");
        checkbox.className = "troop-checkbox";
        checkbox.innerHTML = `<input type="checkbox" id="${troop.name}" class="troopCheckbox"> ${troop.name}`;
        troopCheckboxes.appendChild(checkbox);

    // Événement pour la case à cocher "Tout sélectionner"
document.getElementById("selectAllTroops").addEventListener("change", function() {
    const checkboxes = document.querySelectorAll(".troopCheckbox");
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked; // Vérifie ou décoche les cases en fonction de l'état de "Tout sélectionner"
    });
});

        
    });
});

// Événement pour le bouton de validation des troupes
document.getElementById("validateTroopsButton").addEventListener("click", function() {
    const selectedTroops = document.querySelectorAll(".troopCheckbox:checked");
    availableTroops = Array.from(selectedTroops).map(checkbox => checkbox.id);

    campSize = parseInt(document.getElementById("campSize").value);
    if (isNaN(campSize) || campSize <= 0) {
        alert("Veuillez entrer une taille de camp valide.");
        return;
    }

    document.getElementById("troopSelectionContainer").style.display = "none";
    document.getElementById("compositionContainer").style.display = "block";
});

// Fonction pour générer une composition aléatoire en fonction de la taille du camp
function generateArmy(campSize) {
    let totalSpace = campSize;
    let army = {};
    let currentSpace = 0;

    while (currentSpace < totalSpace) {
        const randomTroop = availableTroops[Math.floor(Math.random() * availableTroops.length)];
        const troopData = troops.find(t => t.name === randomTroop);
        
        if (currentSpace + troopData.space <= totalSpace) {
            if (army[troopData.name]) {
                army[troopData.name]++;
            } else {
                army[troopData.name] = 1;
            }
            currentSpace += troopData.space;
        }
    }

    return army;
}

// Fonction pour afficher les troupes avec une animation
function displayArmy(army) {
    const armyCompositionDiv = document.getElementById("armyComposition");
    armyCompositionDiv.innerHTML = ""; // Réinitialise le contenu
    let delay = 500; // Délai en millisecondes

    Object.keys(army).forEach((troop, index) => {
        setTimeout(() => {
            const troopElement = document.createElement("div");
            troopElement.classList.add("troop");
            troopElement.innerText = `${troop} x${army[troop]}`;
            armyCompositionDiv.appendChild(troopElement);
            setTimeout(() => {
                troopElement.classList.add("show");
            }, 50);
        }, index * delay);
    });
}

// Événement du bouton de génération de composition (dé)
document.getElementById("generateButton").addEventListener("click", function() {
    currentArmy = generateArmy(campSize);
    displayArmy(currentArmy);
    document.getElementById("compositionContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";
});

// Événements pour le bouton de résultat
document.getElementById("successButton").addEventListener("click", function() {
    victories++;
    updateLeaderboard();

    // Régénérer une nouvelle composition aléatoire
    currentArmy = generateArmy(campSize);
    displayArmy(currentArmy);
});

// Fonction pour mettre à jour le classement
function updateLeaderboard() {
    const leaderboardDiv = document.getElementById("leaderboard");
    leaderboardDiv.innerHTML = `<strong>Hdv: ${document.getElementById("hdvLevel").value} - Victoires: ${victories}</strong>`;
}

// Événement pour le bouton de défaite
document.getElementById("failButton").addEventListener("click", function() {
    document.getElementById("retryButton").style.display = "block";
});

// Événement pour le bouton de recommencer
document.getElementById("retryButton").addEventListener("click", function() {
    // Réinitialiser les valeurs pour recommencer le défi
    playerName = '';
    campSize = 0;
    availableTroops = [];
    victories = 0;
    currentArmy = {};

    document.getElementById("welcomeContainer").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("retryButton").style.display = "none";
    document.getElementById("armyComposition").innerHTML = ""; // Réinitialise l'affichage de la composition
    document.getElementById("leaderboard").innerHTML = ""; // Réinitialise l'affichage du classement
});

// Événement pour le bouton "Recommencer"
document.getElementById("restartButton").addEventListener("click", function() {
    // Réinitialise l'affichage sans changer l'état des cases à cocher
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("troopSelectionContainer").style.display = "block"; // Garde les sélections
    // Optionnel : si vous souhaitez garder le pseudo et le niveau d'Hdv, vous pouvez les conserver ici.
});

let troopSelections = {}; // Object pour mémoriser les sélections de troupes

// Événement pour le bouton "Tout sélectionner"
document.getElementById("selectAll").addEventListener("change", function() {
    const isChecked = this.checked;
    document.querySelectorAll(".troopCheckbox").forEach(checkbox => {
        checkbox.checked = isChecked; // Coche ou décoche toutes les cases
        troopSelections[checkbox.id] = isChecked; // Met à jour l'objet des sélections
    });
});

// Événement pour le bouton de validation des troupes
document.getElementById("validateTroopsButton").addEventListener("click", function() {
    const selectedTroops = document.querySelectorAll(".troopCheckbox:checked");
    availableTroops = Array.from(selectedTroops).map(checkbox => checkbox.id);

    // Mémoriser les sélections de troupes
    selectedTroops.forEach(checkbox => {
        troopSelections[checkbox.id] = true;
    });

    campSize = parseInt(document.getElementById("campSize").value);
    if (isNaN(campSize) || campSize <= 0) {
        alert("Veuillez entrer une taille de camp valide.");
        return;
    }

    document.getElementById("troopSelectionContainer").style.display = "none";
    document.getElementById("compositionContainer").style.display = "block";
});

// Événement pour le bouton "Recommencer"
document.getElementById("restartButton").addEventListener("click", function() {
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("troopSelectionContainer").style.display = "block"; // Affiche le conteneur de sélection des troupes


});

