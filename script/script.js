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

let texts = [
    "En 2017, l'arrivée des mouvements #MeToo et #BalanceTonPorc sur les réseaux sociaus permettent une libération de la parole des victimes, entraînant une hausse des signalements. Cette augmentation reflète un bris de tabou et place les violences sexuelles au cœur du débat public.",
    "En 2018, l'élan #MeToo se poursuit avec plus de témoignages et de réformes juridiques. La hausse des signalements montre une confiance accrue des victimes et révèle l'ampleur persistante du problème.",
    "En 2019, les violences sexuelles restent au centre des débats, avec des affaires médiatisées et la marche #NousToutes mobilisant des milliers de personnes. Initiatives éducatives et préventives émergent, tandis que les signalements augmentent, signe d’une prise de conscience collective.",
    "En 2020, la pandémie aggrave les violences sexuelles en isolant les victimes. Des initiatives comme les alertes en pharmacie apparaissent pour contourner ces obstacles, montrant une prise de conscience, malgré des actions encore insuffisantes.",
    "En 2021, la vague de témoignages sur l'inceste, amplifiée par le livre de Camille Kouchner, relance le débat sur les violences intrafamiliales. Les signalements augmentent, notamment grâce à des campagnes ciblées et des outils de signalement en ligne.",
    "En 2022, les plateformes numériques prennent une place centrale dans la dénonciation des violences sexuelles, avec des hashtags comme #DoublePeine dénonçant les failles judiciaires. La hausse des plaintes témoigne d'une pression accrue sur les institutions pour une meilleure prise en charge des victimes.",
    "En 2023, les débats autour du consentement et des violences conjugales s’intensifient, avec des lois renforçant les sanctions. Des affaires très médiatisées, comme celles impliquant des personnalités publiques, continuent de mobiliser l'opinion et encouragent plus de victimes à se manifester."
];

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
        let text = texts[index];

        let victimInfo = document.getElementById('section__victime-info');

        victimInfo.innerHTML = `<span class="line1">EN <span class="purple" id="year-counter">${year}</span></span> <br> <span class="line2"><span class="purple" id="victim-counter"></span> VICTIMES</span>
        <p class="section__victime-info-texte">${text}</p>`;

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
            label: 'Condamnations',
            data: [1024, 1026, 1005, 978, 1088, 806, 1413],
            backgroundColor: '#AF94E0',
            borderColor: '#AF94E0',
            borderWidth: 4,
            pointBackgroundColor: '#FFFFFFFF',
            pointBorderColor: '#FFFFFFFF',
        },
        {
            label: 'Plaintes',
            data: [13450, 15039, 16874, 19750, 23441, 25982, 34343],
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
                },
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
                        size: 22,
                        weight: 'normal'
                    },
                    color: '#FFFFFF',

                }
            },
            y: {
                grid: {
                    color: '#FFFFFF',
                    lineWidth: 0.5
                },
                beginAtZero: true,
                max: 35000,
                ticks: {
                    font: {
                        family: 'Bebas',
                        size: 22,
                        weight: 'normal'
                    },
                    color: '#FFF',
                },
            },
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
                label: 'Condamnation',
                data: [1024, 1026, 1005, 978, 1088, 806, 1413],
                backgroundColor: '#AF94E0',
                borderWidth: 1
            },
            {
                label: 'Plaintes',
                data: [13450, 15039, 16874, 19750, 23441, 25982, 34343],
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
                        family: 'Alatsi',
                    },
                    color: '#FFFFFF'
                },
                padding: 30
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
                        size: 22,
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
                max: 35000,
                ticks: {
                    font: {
                        family: 'Bebas',
                        size: 22,
                        weight: 'normal'
                    },
                    color: '#FFF'
                },
            },
        }
    },
    plugins: [backgroundColorPlugin]
});

const courbectx = document.getElementById('graph3').getContext('2d');
const barCtx = document.getElementById('graphBar').getContext('2d');

barCtx.canvas.onclick = (event) => {
    const elements = graphBar.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (elements.length > 0) {
        const firstElement = elements[0];
        const datasetIndex = firstElement.datasetIndex;
        const dataIndex = firstElement.index;

        // on récupére les données des premières barres
        const dataset = graphBar.data.datasets[datasetIndex];
        const barValue = dataset.data[dataIndex];
        const year = graphBar.data.labels[dataIndex];
        const label = dataset.label;

        // on récupérel es données des deuxièmes barres
        const otherDatasetIndex = datasetIndex === 0 ? 1 : 0;
        const otherDataset = data.datasets[otherDatasetIndex];
        const otherbarValue = otherDataset.data[dataIndex];
        const otherLabel = otherDataset.label;

        document.getElementById('section__condamnation-info').innerHTML = `
         <h1><span class="white">EN</span> <span id="year-counter2">${year}</span></h1>
            <h2><span class="white"><span id="convictions-counter1">${barValue}</span></span> ${label}</h2>
            <p>Durant l'année ${year}, il y a eu ${barValue} ${label} pour ${otherbarValue} ${otherLabel}. On note qu'il y a toujours eu un important écart entre les ${label} et les ${otherLabel}. Certains justifient ça par un mec de preuve, mais la réalité est que la justice a toujours été trop laxiste envers les plaintes pour agression sexuelles.<br>Source : <a href="https://visustat.fr/donnees/nationales/justice/evolution-des-violences-sexuelles-en-france/">source 1</a> <a href="https://www.ined.fr/fr/publications/editions/population-et-societes/violences-sexuelles-durant-l-enfance-et-l-adolescence/">source 2</a></p>
    `;
        let convictionsElement = document.getElementById('convictions-counter1');
        animateCounter(convictionsElement, 0, pointValue, 2000);
        let yearElement = document.getElementById('year-counter2');
        animateCounter(yearElement, 2000, year, 400);
    }
};

// Fonction d'affichage au clique pour le graphique type line
courbectx.canvas.onclick = (event) => {
    const elements = graph3.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (elements.length > 0) {
        const firstElement = elements[0];
        const datasetIndex = firstElement.datasetIndex;
        const dataIndex = firstElement.index;

        // récupération des données de la première courbe
        const dataset = data.datasets[datasetIndex];
        const pointValue = dataset.data[dataIndex];
        const year = data.labels[dataIndex];
        const label = dataset.label;

        // récupération des données de la deuxième courbe 
        const otherDatasetIndex = datasetIndex === 0 ? 1 : 0;
        const otherDataset = data.datasets[otherDatasetIndex];
        const otherValue = otherDataset.data[dataIndex];
        const otherLabel = otherDataset.label;

        // Met à jour le contenu HTML dans le div section__condamnation-info
        document.getElementById('section__condamnation-info').innerHTML = `
            <h1><span class="white">EN</span> <span id="year-counter1">${year}</span></h1>
            <h2><span class="white"><span id="convictions-counter">${pointValue}</span></span> ${label}</h2>
            <p>Durant l'année ${year}, il y a eu ${pointValue} ${label} pour ${otherValue} ${otherLabel}. On note qu'il y a toujours eu un important écart entre les ${label} et les ${otherLabel}. Certains justifient ça par un mec de preuve, mais la réalité est que la justice a toujours été trop laxiste envers les plaintes pour agression sexuelles.<br>Source : <a href="https://visustat.fr/donnees/nationales/justice/evolution-des-violences-sexuelles-en-france/">source 1</a> <a href="https://www.ined.fr/fr/publications/editions/population-et-societes/violences-sexuelles-durant-l-enfance-et-l-adolescence/">source 2</a></p>
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



// ========== GRAPHIQUE CARTE ==========
var map = L.map('map', {
    center: [46.603354, 1.888334],
    zoom: 5.8,
    zoomSnap: 0,
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

let activeRegion = null;
let activeDepartment = null;
let regionMap = null;

function loadRegionMap(regionName) {
    let geojsonFile = `script/departements-${regionName}.geojson`;

    if (regionMap !== null) {
        regionMap.remove();
        regionMap = null;
    }

    regionMap = L.map('region-map', {
        center: [46.603354, 1.888334],
        zoom: 6.5,
        zoomSnap: 0,
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
    }).addTo(regionMap);

    fetch(geojsonFile)
    .then(response => response.json())
    .then(data => {
        // Rendez le conteneur visible
        const mapContainer = document.getElementById('map-container');
        mapContainer.classList.add('active');

        // Attendez que les styles soient appliqués
        setTimeout(() => {
            if (regionMap !== null) {
                regionMap.remove();
                regionMap = null;
            }

            regionMap = L.map('region-map', {
                center: [46.603354, 1.888334],
                zoom: 6.5,
                zoomSnap: 0,
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
            }).addTo(regionMap);

            let geoLayer = L.geoJSON(data, {
                style: {
                    color: '#fff',
                    weight: 1,
                    fillColor: '#4D2A7B',
                    fillOpacity: 0.7
                },
                onEachFeature: function (feature, layer) {
                    layer.on('click', function (e) {
                        if (activeDepartment) {
                            activeDepartment.setStyle({
                                fillColor: '#AF94E0',
                                fillOpacity: 1
                            });
                        }

                        activeDepartment = this;

                        this.setStyle({
                            fillColor: '#fff',
                            fillOpacity: 1
                        });

                        // Récupérer le nom de la région
                        var departmentName = feature.properties.nom;

                        // Afficher l'information dans la section__carte-info
                        var aggressionData = getAggressionDataForDepartment(departmentName);
                        var infoDiv = document.querySelector('.section__carte-info');
                        infoDiv.innerHTML = `<h3>${departmentName}</h3><p>Nombre d'agressions sexuelles: <span id="victim-counter-map">${aggressionData}</span></p>`;
                        infoDiv.style.display = 'block';

                        let victimElement = document.getElementById('victim-counter-map');
                        animateCounter(victimElement, aggressionData - 200, aggressionData, 1000);

                        e.originalEvent.stopPropagation();

                        console.log('Region:', regionName);
                    });

                    layer.on('mouseover', function (e) {
                        const departmentName = feature.properties.nom;
                        const aggressionData = getAggressionDataForDepartment(departmentName);

                        showTooltip(`<strong>${departmentName}</strong><br>Agressions sexuelles : ${aggressionData}`, e.originalEvent);

                        this.setStyle({
                            borderColor: '#ffffff',
                            weight: 2.5
                        });

                        regionMap.getContainer().addEventListener('mousemove', updateTooltipPosition);
                    });

                    layer.on('mouseout', function () {
                        hideTooltip();
                        this.setStyle({
                            borderColor: '#AF94E0',
                            weight: 1
                        });

                        map.getContainer().removeEventListener('mousemove', updateTooltipPosition);
                    });
                }
            }).addTo(regionMap);

            regionMap.fitBounds(geoLayer.getBounds(), {
                animate: false,
            });

            setTimeout(() => {
                regionMap.invalidateSize();
            }, 100);
        }, 100);
    })
    .catch(error => {
        console.error(`Erreur lors du chargement du fichier ${geojsonFile}:`, error);
    });

}

// Réinitialisez l'état si nécessaire
document.addEventListener('click', (event) => {
    if (!event.target.closest('#region-map') && !event.target.closest('#map')) {
        document.getElementById('map-container').classList.remove('active');
    }
});



// Chargement des régions depuis le GeoJSON
fetch('script/regions.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'white',
                weight: 1,
                opacity: 1,
                fillColor: '#4D2A7B',
                fillOpacity: 1
            },
            onEachFeature: function (feature, layer) {
                layer.on('mouseover', function (e) {
                    const regionName = feature.properties.nom;
                    const aggressionData = getAggressionDataForRegion(regionName);

                    showTooltip(`<strong>${regionName}</strong><br>Agressions sexuelles : ${aggressionData}`, e.originalEvent);

                    this.setStyle({
                        borderColor: '#ffffff',
                        weight: 2.5
                    });

                    map.getContainer().addEventListener('mousemove', updateTooltipPosition);
                });

                layer.on('mouseout', function () {
                    hideTooltip();
                    this.setStyle({
                        borderColor: '#AF94E0',
                        weight: 1
                    });

                    map.getContainer().removeEventListener('mousemove', updateTooltipPosition);
                });

                layer.on('click', function (e) {
                    if (activeRegion) {
                        activeRegion.setStyle({
                            fillColor: '#AF94E0',
                            fillOpacity: 1
                        });
                    }

                    activeRegion = this;

                    this.setStyle({
                        fillColor: 'white',
                        fillOpacity: 1
                    });

                    // Récupérer le nom de la région
                    var regionName = feature.properties.nom;

                    // Afficher l'information dans la section__carte-info
                    var aggressionData = getAggressionDataForRegion(regionName);
                    var infoDiv = document.querySelector('.section__carte-info');
                    infoDiv.innerHTML = `<h3>${regionName}</h3><p>Nombre d'agressions sexuelles: <span id="victim-counter-map">${aggressionData}</span></p>`;
                    infoDiv.style.display = 'block';

                    let victimElement = document.getElementById('victim-counter-map');
                    animateCounter(victimElement, aggressionData - 200, aggressionData, 1000);

                    // Charger la carte des départements pour la région cliquée
                    loadRegionMap(regionName);

                    e.originalEvent.stopPropagation();

                    console.log('Region:', regionName);
                });
            }
        }).addTo(map);
    });

// Exemple de fonction pour récupérer les données d'agressions pour une région
function getAggressionDataForRegion(region) {
    var aggressionData = {
        'Île-de-France': 19754,
        'Provence Alpes Côte d\'Azur': 7584,
        'Auvergne-Rhône-Alpes': 12194,
        'Bourgogne-Franche-Comté': 4685,
        'Bretagne': 5429,
        'Centre-Val-de-Loire': 4655,
        'Corse': 374,
        'Grand-Est': 8877,
        'Hauts-de-France': 11959,
        'Normandie': 6307,
        'Nouvelle-Aquitaine': 10956,
        'Occitanie': 9802,
        'Pays-de-la-Loire': 6879
    };

    return aggressionData[region] || 'Données non disponibles';
}

// Exemple de fonction pour récupérer les données d'agressions pour un département
function getAggressionDataForDepartment(department) {
    var aggressionData = {
        // Auvergne-Rhône-Alpes
        'Ain': 880,
        'Allier': 577,
        'Ardèche': 477,
        'Cantal': 231,
        'Drôme': 847,
        'Isère': 1989,
        'Loire': 1050,
        'Haute-Loire': 405,
        'Puy-de-Dôme': 831,
        'Rhône': 3111,
        'Savoie': 695,
        'Haute-Savoie': 1101,
        // Bourgogne-Franche-Comté
        'Côte-d\'Or': 919,
        'Doubs': 769,
        'Jura': 507,
        'Nièvre': 384,
        'Haute-Saône': 412,
        'Saône-et-Loire': 813,
        'Yonne': 685,
        'Territoire de Belfort': 196,
        // Bretagne
        'Côtes-d\'Armor': 892,
        'Finistère': 1453,
        'Ille-et-Vilaine': 1853,
        'Morbihan': 1231,
        // Centre-Val de Loire
        'Cher': 449,
        'Eure-et-Loir': 839,
        'Indre': 345,
        'Indre-et-Loire': 1210,
        'Loir-et-Cher': 661,
        'Loiret': 1151,
        // Corse
        'Corse-du-Sud': 173,
        'Haute-Corse': 201,
        // Grand Est
        'Ardennes': 492,
        'Aube': 456,
        'Marne': 922,
        'Haute-Marne': 349,
        'Meurthe-et-Moselle': 1268,
        'Meuse': 313,
        'Moselle': 1448,
        'Bas-Rhin': 1700,
        'Haut-Rhin': 1338,
        'Vosges': 591,
        // Hauts-de-France
        'Aisne': 985,
        'Nord': 5163,
        'Oise': 1547,
        'Pas-de-Calais': 3083,
        'Somme': 1181,
        // Île-de-France
        'Paris': 5114,
        'Seine-et-Marne': 2078,
        'Yvelines': 2007,
        'Essonne': 1861,
        'Hauts-de-Seine': 2160,
        'Seine-Saint-Denis': 2755,
        'Val-de-Marne': 2005,
        'Val-d\'Oise': 1774,
        // Normandie
        'Calvados': 1389,
        'Eure': 1137,
        'Manche': 857,
        'Orne': 585,
        'Seine-Maritime': 2339,
        // Nouvelle-Aquitaine
        'Charente': 745,
        'Charente-Maritime': 1191,
        'Corrèze': 388,
        'Creuse': 199,
        'Dordogne': 754,
        'Gironde': 3230,
        'Landes': 811,
        'Lot-et-Garonne': 563,
        'Pyrénées-Atlantiques': 918,
        'Deux-Sèvres': 794,
        'Vienne': 833,
        'Haute-Vienne': 530,
        // Occitanie
        'Ariège': 284,
        'Aude': 656,
        'Aveyron': 405,
        'Gard': 1076,
        'Haute-Garonne': 2313,
        'Gers': 293,
        'Hérault': 1903,
        'Lot': 323,
        'Lozère': 170,
        'Hautes-Pyrénées': 416,
        'Pyrénées-Orientales': 925,
        'Tarn': 656,
        'Tarn-et-Garonne': 382,
        // Pays de la Loire
        'Loire-Atlantique': 2402,
        'Maine-et-Loire': 1492,
        'Mayenne': 560,
        'Sarthe': 1240,
        'Vendée': 1185,
        // Provence-Alpes-Côte d'Azur
        'Alpes-de-Haute-Provence': 294,
        'Alpes-Maritimes': 1549,
        'Bouches-du-Rhône': 3163,
        'Var': 1531,
        'Vaucluse': 754
    };

    return aggressionData[department] || 'Données non disponibles';
}


document.addEventListener('click', function (e) {
    const mapContainer = document.getElementById('map');
    const regionMapContainer = document.getElementById('region-map');

    if (!mapContainer.contains(e.target) && (!regionMapContainer || !regionMapContainer.contains(e.target))) {
        if (activeRegion) {
            activeRegion.setStyle({
                fillColor: '#AF94E0',
                fillOpacity: 1
            });
            activeRegion = null;
        }

        if (activeDepartment) {
            activeDepartment.setStyle({
                fillColor: '#AF94E0',
                fillOpacity: 1
            });
            activeDepartment = null;
        }

        var infoDiv = document.querySelector('.section__carte-info');
        infoDiv.innerHTML = '';
        infoDiv.style.display = 'block';

        if (regionMap !== null) {
            regionMap.remove();
            regionMap = null;
        }
    }
});


document.getElementById('map').addEventListener('click', function (e) {
    e.stopPropagation();
});

const tooltip = document.getElementById('tooltip');

function showTooltip(content, event) {
    tooltip.innerHTML = content;
    tooltip.style.display = 'block';
    tooltip.style.left = event.clientX + 10 + 'px';
    tooltip.style.top = event.clientY + 10 + 'px';
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

function updateTooltipPosition(event) {
    tooltip.style.left = event.clientX + 10 + 'px';
    tooltip.style.top = event.clientY + 10 + 'px';
}


window.addEventListener('load', () => {
    setTimeout(() => {
        const img = document.querySelector('.header-title-img img');
        img.classList.add('animate');
    }, 10); 
});

document.addEventListener("DOMContentLoaded", () => {
    const svg = document.querySelector("svg");
    const section = document.querySelector(".presentation");

    svg.classList.add("svg-hidden");
    
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Section visible, animation lancée.");

                svg.classList.add("svg-visible");
                svg.classList.remove("svg-hidden");

                animateSVG();

                observer.unobserve(section);
            }
        });
    };

    // Fonction d'animation SVG
    const animateSVG = () => {
        console.log("Animation SVG déclenchée !");
        document.querySelectorAll(".presentation svg path").forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            path.animate(
                [
                    { strokeDashoffset: length },
                    { strokeDashoffset: 0 }
                ],
                {
                    duration: 16000,
                    easing: "ease",
                    fill: "forwards"
                }
            );

            setTimeout(() => {
                path.style.fill = "#ffffff";
                path.style.fillOpacity = 1;
                path.style.stroke = "#AF94E0";
            }, 1700); 
        });
    };

    const options = {
        root: null,
        threshold: 0.3
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    observer.observe(section);
});
