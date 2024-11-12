// Initialisation des avatars
const avatarenfant = document.getElementById('avatar_enfant');
const avataradulte = document.getElementById('avatar_adulte');
const avatarvieille = document.getElementById('avatar_vieille');
const avatar = document.getElementById('avatar');

// Initialisation des éléments d'âge
const age1 = document.getElementById('age1');
const age2 = document.getElementById('age2');
const age3 = document.getElementById('age3');

// Initialisation des éléments de texte
const texte = document.getElementById('texte');
const info1 = document.getElementById('info1');
const info2 = document.getElementById('info2');
const info3 = document.getElementById('info3');

// Fonction pour afficher l'avatar et l'information correspondants à la catégorie d'âge
function displayCategory(avatarElement, infoElement) {
    // Masquer tous les avatars et informations
    [avatar, avatarenfant, avataradulte, avatarvieille].forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('visible');
    });
    
    [info1, info2, info3, texte].forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('visible');
    });
    
    // Afficher l'avatar et l'information de la catégorie sélectionnée
    avatarElement.classList.add('visible');
    avatarElement.classList.remove('hidden');
    infoElement.classList.add('visible');
    infoElement.classList.remove('hidden');
}

// Événements pour chaque catégorie d'âge
age1.addEventListener('mouseenter', () => displayCategory(avatarenfant, info1));
age2.addEventListener('mouseenter', () => displayCategory(avataradulte, info2));
age3.addEventListener('mouseenter', () => displayCategory(avatarvieille, info3));

// ========== GRAPHIQUE CONDAMNATION ==========

let ctx = document.getElementById('graph3').getContext('2d');

// spécification des datas 

let data = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022',],
    datasets: [{
        labels: 'Nombre de condamnation',
        data: [1.024, 1.026, 1.005, 978, 1.088, 806, 1.413, 7.500],
        backgroundColor: '#4D2A7B',
        borderColor: '#FFFFFF',
        borderWidth: 1
    }]
}

let graph3 = new graph

console.log(data)