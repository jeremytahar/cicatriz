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

// Spécification des données
let data = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [
        {
            label: 'Nombre de condamnations',
            data: [1024, 1026, 1005, 978, 1088, 806, 1413],
            backgroundColor: '#AF94E0', 
            borderColor: '#AF94E0',
            borderWidth: 4,
            pointBackgroundColor: '#FFFFFFFF',
            pointBorderColor: '#FFFFFFFF'
        },
        {
            label: 'Condamnation classée sans suite',
            data: [800, 850, 780, 900, 1200, 1100, 1300],
            backgroundColor: '#110521', 
            borderColor: '#110521',
            borderWidth: 4,
            pointBackgroundColor: '#FFFFFFFF',
            pointBorderColor: '#FFFFFFFF'
        }
    ]
};

// Plugin pour le fond de la zone de traçage seulement
const backgroundColorPlugin = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;

        ctx.save();
        ctx.fillStyle = "#4D2A7B"; // Couleur de fond de la zone de traçage

        ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
        );

        ctx.restore();
    }
};

// Création du premier graphique en ligne (graph3)
let graph3 = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                align: 'start',
                labels: {
                    boxWidth: 50,
                    font: {
                        family: 'Alatsi',
                    },
                    color: '#FFFFFF'
                }
            },
            tooltip: { 
                enabled: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#FFFFFF',
                    lineWidth: 0.5
                },
                ticks: {
                    font: {
                        family: 'Bebas',
                        weight: 'normal'
                    },
                    color: '#FFFFFF'
                }
            },
            y: {
                grid: {
                    color: '#FFFFFF',
                    lineWidth: 0.5
                },
                beginAtZero: true,
                max: 2000,
                ticks: {
                    font: {
                        family: 'Bebas',
                        weight: 'normal'
                    },
                    color: '#FFF'
                }
            }
        }
    },
    plugins: [backgroundColorPlugin]
});

// Création du second graphique en barres (graph4)
let ctxBar = document.getElementById('graphBar')?.getContext('2d'); 

    let graphBar = new Chart(ctxBar, {
        type: 'bar', 
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'], 
            datasets: [
                {
                    label: 'Nombre de condamnations', 
                    data: [1024, 1026, 1005, 978, 1088, 806, 1413], 
                    backgroundColor: '#AF94E0', 
                    borderWidth: 1              
                },
                {
                    label: 'Condamnation classé sans suite',
                    data: [800, 850, 780, 900, 1200, 1100, 1300], 
                    backgroundColor: '#110521', 
                    borderWidth: 1             
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    align: 'start',
                    labels: {
                        boxWidth: 50,
                        font: {
                            family: 'Alatsi'
                        },
                        color: '#FFFFFF'
                    }
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#FFFFFF',
                        lineWidth: 0.5
                    },
                    ticks: {
                        font: {
                            family: 'Bebas',
                            weight: 'normal'
                        },
                        color: '#FFF'
                    }
                },
                y: {
                    grid: {
                        color: '#FFFFFF',
                        lineWidth: 0.5
                    },
                    beginAtZero: true,
                    max: 2000,
                    ticks: {
                        font: {
                            family: 'Bebas',
                            weight: 'normal'
                        },
                        color: '#FFF'
                    }
                }
            }
        },
        plugins: [backgroundColorPlugin] 
    });



// Fonction d'affichage au clique pour le graphique type line
ctx.canvas.onclick = (event) => {
    const elements = graph3.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (elements.length > 0) {
        const firstElement = elements[0];
        const datasetIndex = firstElement.datasetIndex;
        const dataIndex = firstElement.index;

        const dataset = data.datasets[datasetIndex];
        const pointValue = dataset.data[dataIndex];
        const year = data.labels[dataIndex];
        const label = dataset.label.toUpperCase();

        // Met à jour le contenu HTML dans le div section__condamnation-info
        document.getElementById('section__condamnation-info').innerHTML = `
            <h1><span class="white">EN</span> ${year}</h1>
            <h2><span class="white">${pointValue}</span> ${label}</h2>
        `;
    }
};

// Fonction de changement des graphiques 

document.getElementById('changeToLine').addEventListener('click', function() {
    document.getElementById('graph3').classList.add('visible');
    document.getElementById('graph3').classList.remove('hidden');
    document.getElementById('graphBar').classList.add('hidden');
    document.getElementById('graphBar').classList.remove('visible');
});

document.getElementById('changeToBar').addEventListener('click', function() {
    document.getElementById('graph3').classList.add('hidden');
    document.getElementById('graph3').classList.remove('visible');
    document.getElementById('graphBar').classList.add('visible');
    document.getElementById('graphBar').classList.remove('hidden');
});

