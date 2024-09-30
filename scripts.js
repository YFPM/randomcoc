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
    // Ajoute d'autres troupes ici selon les besoins
];

// Fonction pour générer une composition aléatoire en fonction de la taille du camp
function generateArmy(campSize) {
    let totalSpace = campSize;
    let army = {};
    let currentSpace = 0;

    while (currentSpace < totalSpace) {
        const randomTroop = troops[Math.floor(Math.random() * troops.length)];

        if (currentSpace + randomTroop.space <= totalSpace) {
            // Si la troupe est déjà dans la composition, on incrémente le compteur
            if (army[randomTroop.name]) {
                army[randomTroop.name]++;
            } else {
                army[randomTroop.name] = 1; // Sinon on l'ajoute avec un compteur de 1
            }
            currentSpace += randomTroop.space;
        }
    }

    return army;
}

// Fonction pour afficher les troupes avec une animation
function displayArmy(army) {
    const armyCompositionDiv = document.getElementById("armyComposition");
    armyCompositionDiv.innerHTML = ""; // Réinitialise le contenu
    let delay = 500; // Délai en millisecondes

    // Pour chaque type de troupe dans l'armée générée
    Object.keys(army).forEach((troop, index) => {
        setTimeout(() => {
            const troopElement = document.createElement("div");
            troopElement.classList.add("troop");
            // Affiche le nom de la troupe suivi de la quantité (ex: "Barbare x3")
            troopElement.innerText = `${troop} x${army[troop]}`;
            armyCompositionDiv.appendChild(troopElement);

            // Ajouter l'animation d'apparition
            setTimeout(() => {
                troopElement.classList.add("show");
            }, 50);
        }, index * delay);
    });
}

// Événement du bouton
document.getElementById("generateButton").addEventListener("click", function() {
    const campSizeInput = document.getElementById("campSize").value;
    const campSize = parseInt(campSizeInput); // Convertit en nombre
    const loadingMessage = document.getElementById("loadingMessage");
    const armyCompositionDiv = document.getElementById("armyComposition");

    if (isNaN(campSize) || campSize <= 0) {
        alert("Veuillez entrer une taille de camp valide.");
        return;
    }

    loadingMessage.innerText = "Chargement...";
    armyCompositionDiv.style.opacity = 0; // Masquer la composition actuelle

    const army = generateArmy(campSize);

    setTimeout(() => {
        loadingMessage.innerText = ""; // Enlever le message de chargement
        armyCompositionDiv.style.opacity = 1; // Rendre la nouvelle composition visible
        displayArmy(army);
    }, 2000); // Temps de chargement simulé de 2 secondes
});
