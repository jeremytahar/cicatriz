// Mise en place des variable const pour sélectionné les avatars
const avatarenfant = document.getElementById('avatar_enfant');
const avataradulte = document.getElementById('avatar_adulte');
const avatarvieille = document.getElementById('avatar_vieille');

// Mise en place des constantes age pour sélectionné les li 
const age1 = document.getElementById('age1');
const age2 = document.getElementById('age2');
const age3 = document.getElementById('age3');

// Code javascript pour afficher l'avatar et le texte pour la catégorie enfant
age1.addEventListener('mouseenter', () => {
    avatarenfant.classList.add('visible'); 
    avatarenfant.classList.remove('hidden'); 
});

age1.addEventListener('mouseleave', () => {
    avatarenfant.classList.add('hidden'); 
    avatarenfant.classList.remove('visible'); 
});

// Code javascript pour afficher l'avatar et le texte pour la catégorie adulte
age2.addEventListener('mouseenter', () => {
    avataradulte.classList.add('hidden');
    avataradulte.classList.add('visible');
})

age2.addEventListener('mouseleave', () => {
    avataradulte.classList.add('hidden'); 
    avataradulte.classList.remove('visible'); 
});

// Code javascript pour afficher l'avatar et le texte pour la catégorie senior
age3.addEventListener('mouseenter', () => {
    avatarvieille.classList.add('visible'); 
    avatarvieille.classList.remove('hidden'); 
});

age3.addEventListener('mouseleave', () => {
    avatarvieille.classList.add('hidden'); 
    avatarvieille.classList.remove('visible'); 
});
