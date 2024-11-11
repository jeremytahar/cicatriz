
    // Mise en place des variable const pour sélectionné les avatars
    const avatarenfant = document.getElementById('avatar_enfant');
    const avataradulte = document.getElementById('avatar_adulte');
    const avatarvieille = document.getElementById('avatar_vieille');

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

        // Code pour l'affichage au survol de la souris

            // Code pour l'affichage de l'avatar
            age1.addEventListener('mouseenter', () => {
                avatarenfant.classList.add('visible'); 
                avatarenfant.classList.remove('hidden'); 
            });

            age1.addEventListener('mouseleave', () => {
                avatarenfant.classList.add('hidden'); 
                avatarenfant.classList.remove('visible'); 
            });

            // Code pour l'afficahge des informations textuelles

            age1.addEventListener('mouseenter', () => {
                texte.classList.add('hidden');
                texte.classList.remove('visible');
            })

            age1.addEventListener('mouseleave', () => {
                texte.classList.add('visible');
                texte.classList.remove('hidden');
            })

            age1.addEventListener('mouseenter', () =>{
                info1.classList.add('visible');
                info1.classList.remove('hidden');
            })

            age1.addEventListener('mouseleave', () =>{
                info1.classList.add('hidden');
                info1.classList.remove('visible');
            })

        // Code pour l'affichage définitif au click


    // Code javascript pour afficher l'avatar et le texte pour la catégorie adulte

        // Code pour le survol de la souris 

            // Code pour l'affichage de l'avatar
            age2.addEventListener('mouseenter', () => {
                avataradulte.classList.add('hidden');
                avataradulte.classList.add('visible');
            })

            age2.addEventListener('mouseleave', () => {
                avataradulte.classList.add('hidden'); 
                avataradulte.classList.remove('visible'); 
            });

                // Code pour les informations textuelles

                age2.addEventListener('mouseenter', () => {
                    texte.classList.add('hidden');
                    texte.classList.remove('visible');
                })

                age2.addEventListener('mouseleave', () => {
                    texte.classList.add('visible');
                    texte.classList.remove('hidden');
                })

                age2.addEventListener('mouseenter', () =>{
                    info2.classList.add('visible');
                    info2.classList.remove('hidden');
                })

                age2.addEventListener('mouseleave', () =>{
                    info2.classList.add('hidden');
                    info2.classList.remove('visible');
                })

            // Code pour l'afichage définitf au click

    // Code javascript pour afficher l'avatar et le texte pour la catégorie senior

        // Code pour le survol de la souris 

            // Code pour l'avatar
            age3.addEventListener('mouseenter', () => {
                avatarvieille.classList.add('visible'); 
                avatarvieille.classList.remove('hidden'); 
            });

            age3.addEventListener('mouseleave', () => {
                avatarvieille.classList.add('hidden'); 
                avatarvieille.classList.remove('visible'); 
            });

            //  code pour les textes

            age3.addEventListener('mouseenter', () => {
                texte.classList.add('hidden');
                texte.classList.remove('visible');
            })

            age3.addEventListener('mouseleave', () => {
                texte.classList.add('visible');
                texte.classList.remove('hidden');
            })

            age3.addEventListener('mouseenter', () =>{
                info3.classList.add('visible');
                info3.classList.remove('hidden');
            })

            age3.addEventListener('mouseleave', () =>{
                info3.classList.add('hidden');
                info3.classList.remove('visible');
            })

        // Code pour l'affichage définitf au click