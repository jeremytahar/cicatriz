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

// ========== GRAPHIQUE VICTIMES ========== 
let ctx2 = document.getElementById('graph2').getContext('2d');

// spécification des datas

let data2 = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
        {
            label: 'Nombre de victimes',
            data: [41600, 49400, 55500, 57100, 71007, 78753, 83456],
            backgroundColor: '#AF94E0',
            borderColor: '#AF94E0',
            borderWidth: 5,
            pointBorderColor: '#FFFFFF',
            pointBackgroundColor: '#FFFFFF',
            fill: 'start'
        }]
};

// Création du graphique
let graph2 = new Chart(ctx2, {
    type: 'line',
    data: data2,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            filler: {
                propagate: false,
            },
            title: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
            axis: 'x',
            animationDuration: 0
        },
        scales: {
            x: {
                grid: {
                    color: '#ffffff',
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 22,
                        family: 'Bebas'
                    },
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
            y: {
                grid: {
                    color: '#ffffff',
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 22,
                        family: 'Bebas'
                    },
                    min: 40000,
                    max: 90000,
                    stepSize: 10000,
                    beginAtZero: false
                }
            }
        },
        elements: {
            point: {
                radius: 5,
                hoverRadius: 12,
            }
        }
    },
});

graph2.options.elements.line.tension = 0.4;
graph2.update();

// Gestionnaire d'événement pour le clic sur un point du graphique
function animateCounter(element, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 10);
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.innerText = Math.floor(current);
    }, stepTime);
}

// Gestionnaire d'événement pour le clic sur un point du graphique
graph2.canvas.onclick = function (event) {
    let activePoints = graph2.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

    if (activePoints.length) {
        let index = activePoints[0].index;
        let year = data2.labels[index];
        let victims = data2.datasets[0].data[index];

        let victimInfo = document.getElementById('section__victime-info');

        victimInfo.innerHTML = `<span class="line1">EN <span class="purple" id="year-counter">${year}</span></span> <br> <span class="line2"><span class="purple" id="victim-counter"></span> VICTIMES</span>`;

        let victimElement = document.getElementById('victim-counter');
        animateCounter(victimElement, 0, victims, 2000);
        let yearElement = document.getElementById('year-counter');
        animateCounter(yearElement, 2000, year, 400);
    }
};

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
            pointBorderColor: '#FFFFFFFF',

            data: [1024, 1026, 1005, 978, 1088, 806, 1413, 7500],
            data2: [512, 550, 400, 300, 700, 400, 780, 1000],
            backgroundColor: '#FFFFFF',
            borderColor: '#AF94E0',
            borderWidth: 5,
            pointBorderColor: '#FFFFFF',
            pointBackgroundColor: '#FFFFFF'
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

        ctx.fillStyle = "#4D2A7B";

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
            <h1><span class="white">EN</span> <span id="year-counter1">${year}</span></h1>
            <h2><span class="white"><span id="convictions-counter">${pointValue}</span></span> ${label}</h2>
        `;

        let convictionsElement = document.getElementById('convictions-counter');
        animateCounter(convictionsElement, 0, pointValue, 2000);
        let yearElement = document.getElementById('year-counter1');
        animateCounter(yearElement, 2000, year, 400);
    }
};

// Fonction de changement des graphiques 

document.getElementById('changeToLine').addEventListener('click', function () {
    document.getElementById('graph3').classList.add('visible');
    document.getElementById('graph3').classList.remove('hidden');
    document.getElementById('graphBar').classList.add('hidden');
    document.getElementById('graphBar').classList.remove('visible');
});

document.getElementById('changeToBar').addEventListener('click', function () {
    document.getElementById('graph3').classList.add('hidden');
    document.getElementById('graph3').classList.remove('visible');
    document.getElementById('graphBar').classList.add('visible');
    document.getElementById('graphBar').classList.remove('hidden');
});

console.log('teste fichier javascript');



// ========== GRAPHIQUE CARTE ==========
var map = L.map('map', {
    center: [46.603354, 1.888334],
    zoom: 6,
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
    doubleClickZoom: false,
    tap: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    opacity: 0
}).addTo(map);

fetch('script/regions.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#2A114B', // Couleur des contours
                weight: 1,
                opacity: 1,
                fillOpacity: 0.3
            },
            onEachFeature: function (feature, layer) {
                layer.on('mouseover', function () {
                    this.setStyle({
                        fillColor: 'rgba(0, 123, 255, 0.5)', // Couleur de survol
                        fillOpacity: 0.7
                    });

                    // Récupérer le nom de la région
                    var regionName = feature.properties.nom; // Assurez-vous que votre fichier GeoJSON contient un champ 'nom' pour la région

                    // Récupérer les données d'agressions pour la région
                    var aggressionData = getAggressionDataForRegion(regionName); // Fonction à adapter pour vos données

                    // Afficher l'information dans la section__carte-info
                    var infoDiv = document.querySelector('.section__carte-info');
                    infoDiv.innerHTML = `<h3>${regionName}</h3><p>Nombre d'agressions : ${aggressionData}</p>`;
                    infoDiv.style.display = 'block';
                });

                layer.on('mouseout', function () {
                    this.setStyle({
                        fillColor: '#2A114B', // Couleur d'origine
                        fillOpacity: 0.3
                    });

                    // Cacher l'info
                    var infoDiv = document.querySelector('.section__carte-info');
                    infoDiv.style.display = 'none';
                });
            }
        }).addTo(map);
    });

// Exemple de fonction pour récupérer les données d'agressions pour une région
function getAggressionDataForRegion(region) {
    var aggressionData = {
        'Île-de-France': 19754,
        'Provence-Alpes-Côte d\'Azur': 7291,
        'Auvergne-Rhône-Alpes': 12194,
        'Bourgogne-Franche-Comté': 4685,
        'Bretagne': 5429,
        'Centre-Val de Loire': 4655,
        'Corse': 374,
        'Grand Est': 374,
    };

    return aggressionData[region] || 'Données non disponibles'; // Retourne 'Données non disponibles' si la région n'est pas dans les données
}
