
    // Mise en place des variable const pour sélectionné les avatars
    const avatarenfant = document.getElementById('avatar_enfant');
    const avataradulte = document.getElementById('avatar_adulte');
    const avatarvieille = document.getElementById('avatar_vieille');
    const avatar = document.getElementById('avatar');

    // Mise en place des const age pour sélectionné les li 
    const age1 = document.getElementById('age1');
    const age2 = document.getElementById('age2');
    const age3 = document.getElementById('age3');

    // Mise en place des const text pour sélectionné les informations textuelle 
    const texte = document.getElementById('texte');

    const info1 = document.getElementById('info1');
    const info2 = document.getElementById('info2');
    const info3 = document.getElementById('info3');

    // =========


    // Code javascript pour afficher l'avatar et le texte pour la catégorie enfant
            age1.addEventListener('mouseenter', () => {
                avatar.classList.add('hidden')
                avatar.classList.remove('visible')
                avataradulte.classList.add('hidden')
                avataradulte.classList.remove('visible')
                avatarvieille.classList.add('hidden')
                avatarvieille.classList.remove('visible')
                texte.classList.add('hidden')
                texte.classList.remove('visible')
                info2.classList.add('hidden')
                info2.classList.remove('visible')
                info3.classList.add('hidden')
                info3.classList.remove('visible')


                avatarenfant.classList.remove('hidden')
                avatarenfant.classList.add('visible')
                info1.classList.add('visible')
                info1.classList.remove('hidden')
            })

            age1.addEventListener('click', function (){
                texte.classList.add('visible')
                texte.classList.remove('hidden')
                avatar.classList.add('visible')
                avatar.classList.remove('hidden')

                info1.classList.add('hidden')
                info1.classList.remove('visible')
                info2.classList.add('hidden')
                info2.classList.remove('visible')
                info3.classList.add('hidden')
                info3.classList.remove('visible')
                avatarenfant.classList.add('hidden')
                avatarenfant.classList.remove('visible')
                avataradulte.classList.add('hidden')
                avataradulte.classList.remove('visible')
                avatarvieille.classList.add('hidden')
                avatarvieille.classList.remove('visible')
            })

    // Code javascript pour afficher l'avatar et le texte pour la catégorie adulte
            age2.addEventListener('mouseenter', () => {
                avatarenfant.classList.add('hidden')
                avatarenfant.classList.remove('visible')
                avatarvieille.classList.add('hidden')
                avatarvieille.classList.remove('visible')
                avatar.classList.add('hidden')
                avatar.classList.remove('visible')

                info1.classList.add('hidden')
                info1.classList.remove('visible')
                info3.classList.add('hidden')
                info3.classList.remove('visible')
                texte.classList.add('hidden')
                texte.classList.remove('visible')

                avataradulte.classList.add('visible')
                avataradulte.classList.remove('hidden')
                info2.classList.add('visible')
                info2.classList.remove('hidden')

            })

            age2.addEventListener('click', function (){
                texte.classList.add('visible')
                texte.classList.remove('hidden')
                avatar.classList.add('visible')
                avatar.classList.remove('hidden')

                info1.classList.add('hidden')
                info1.classList.remove('visible')
                info2.classList.add('hidden')
                info2.classList.remove('visible')
                info3.classList.add('hidden')
                info3.classList.remove('visible')
                avatarenfant.classList.add('hidden')
                avatarenfant.classList.remove('visible')
                avataradulte.classList.add('hidden')
                avataradulte.classList.remove('visible')
                avatarvieille.classList.add('hidden')
                avatarvieille.classList.remove('visible')
            })


    // Code javascript pour afficher l'avatar et le texte pour la catégorie senior
            age3.addEventListener('mouseenter', () => {
                texte.classList.add('hidden')
                texte.classList.remove('visible')
                info1.classList.add('hidden')
                info1.classList.remove('visible')
                info2.classList.add('hidden')
                info2.classList.remove('visible')
                avatar.classList.add('hidden')
                avatar.classList.remove('visible')
                avataradulte.classList.add('hidden')
                avataradulte.classList.remove('visible')
                avatarenfant.classList.add('hidden')
                avatarenfant.classList.remove('visible')

                avatarvieille.classList.add('visible')
                avatarvieille.classList.remove('hidden')
                info3.classList.add('visible')
                info3.classList.remove('hidden')
            })

            age3.addEventListener('click', function (){
                texte.classList.add('visible')
                texte.classList.remove('hidden')
                avatar.classList.add('visible')
                avatar.classList.remove('hidden')

                info1.classList.add('hidden')
                info1.classList.remove('visible')
                info2.classList.add('hidden')
                info2.classList.remove('visible')
                info3.classList.add('hidden')
                info3.classList.remove('visible')
                avatarenfant.classList.add('hidden')
                avatarenfant.classList.remove('visible')
                avataradulte.classList.add('hidden')
                avataradulte.classList.remove('visible')
                avatarvieille.classList.add('hidden')
                avatarvieille.classList.remove('visible')
            })


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