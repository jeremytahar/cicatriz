fetch('script/data.json')
    .then((response) => response.json())
    .then((data) => {
        // Charger les données depuis le JSON
        const dataVictime = data.sectionAgression.categories;

        // Initialisation des éléments DOM
        const texte = document.getElementById('texte');
        const dynamicInfo = document.getElementById('dynamic-info');
        const ageList = document.getElementById('age-list');
        const avatar = document.getElementById('avatar');
        const infoPercentage = document.getElementById('info-percentage');
        const infoText = document.getElementById('info-text');
        const infoSource = document.getElementById('info-source');

        // Créer dynamiquement la liste des tranches d'âge
        dataVictime.forEach((category, index) => {
            const li = document.createElement('li');
            li.textContent = category.ageRange;
            li.className = "section__agression-list-age";
            li.addEventListener('mouseenter', () => displayCategory(category));
            ageList.appendChild(li);
        });

        // Afficher les informations dynamiques selon la catégorie
        function displayCategory(category) {
            // Mettre à jour l'avatar
            avatar.src = category.avatar;

            // Mettre à jour les informations textuelles
            infoPercentage.textContent = category.percentage;
            infoText.textContent = category.text;
            infoSource.href = category.source;

            // Rendre visibles les éléments correspondants
            texte.classList.add('hidden');
            dynamicInfo.classList.remove('hidden');
        }

        // ========== GRAPHIQUE VICTIMES ========== 
        // Graphique 2
        let ctx2 = document.getElementById('graph2').getContext('2d');
        const graph2Data = data.graph2;

        graph2Data.datasets[0].pointBackgroundColor = Array(graph2Data.labels.length).fill('#FFFFFF');
        graph2Data.datasets[0].pointBorderColor = Array(graph2Data.labels.length).fill('#FFFFFF');
        graph2Data.datasets[0].pointRadius = Array(graph2Data.labels.length).fill(5);

        const graph2 = new Chart(ctx2, {
            type: 'line',
            data: graph2Data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    filler: { propagate: false },
                    title: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: {
                        grid: { color: '#ffffff' },
                        ticks: {
                            color: '#ffffff',
                            font: { size: 22, family: 'Bebas' },
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }
                    },
                    y: {
                        grid: { color: '#ffffff' },
                        ticks: {
                            color: '#ffffff',
                            font: { size: 22, family: 'Bebas' },
                            min: 20000,
                            max: 90000,
                            stepSize: 10000,
                            beginAtZero: false
                        }
                    }
                },
                elements: {
                    point: { radius: 5, hoverRadius: 12 }
                }
            }
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

        let activeIndex = null;

        // Gestionnaire d'événement pour le clic sur un point du graphique
        graph2.canvas.onclick = (event) => {
            const activePoints = graph2.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            if (activePoints.length) {
                const index = activePoints[0].index;
                const year = graph2Data.labels[index];
                const victims = graph2Data.datasets[0].data[index];
                const text = graph2Data.texts[index];

                const victimInfo = document.getElementById('section__victime-info');
                victimInfo.innerHTML = `
        <span class="line1">EN <span class="purple" id="year-counter">${year}</span></span><br>
        <span class="line2"><span class="purple" id="victim-counter"></span> VICTIMES</span>
        <p class="section__victime-info-texte">${text}</p>
      `;

                const victimElement = document.getElementById('victim-counter');
                animateCounter(victimElement, 0, victims, 2000);
                const yearElement = document.getElementById('year-counter');
                animateCounter(yearElement, 2000, year, 400);
            }
        };

        graph2.canvas.addEventListener('mousemove', function (event) {
            let points = graph2.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

            if (points.length) {
                graph2.canvas.style.cursor = 'pointer';
            } else {
                graph2.canvas.style.cursor = 'default';
            }
        });

// ========== GRAPHIQUE CONDAMNATION ==========
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
const ctx3 = document.getElementById('graph3').getContext('2d');
let graph3 = new Chart(ctx3, {
    type: 'line',
    data: data.graph3,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 50,
                    font: { family: 'Alatsi', size: 14 },
                    color: '#FFFFFF'
                }
            },
            tooltip: { enabled: false }
        },
        scales: {
            x: {
                grid: { color: '#FFFFFF', lineWidth: 0.5 },
                ticks: {
                    font: { family: 'Bebas', size: 22 },
                    color: '#FFFFFF'
                }
            },
            y: {
                grid: { color: '#FFFFFF', lineWidth: 0.5 },
                beginAtZero: true,
                max: 35000,
                ticks: {
                    font: { family: 'Bebas', size: 22 },
                    color: '#FFF'
                }
            }
        },
        elements: {
            point: { radius: 5, hoverRadius: 12 }
        }
    },
    plugins: [backgroundColorPlugin]
});

// Création du second graphique en barres (graph4)
const ctxBar = document.getElementById('graphBar').getContext('2d');
let graphBar = new Chart(ctxBar, {
    type: 'bar',
    data: data.graphBar,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 50,
                    font: { family: 'Alatsi', size: 14 },
                    color: '#FFFFFF'
                }
            },
            tooltip: { enabled: false }
        },
        scales: {
            x: {
                grid: { color: '#FFFFFF', lineWidth: 0.5 },
                ticks: {
                    font: { family: 'Bebas', size: 22 },
                    color: '#FFF'
                }
            },
            y: {
                grid: { color: '#FFFFFF', lineWidth: 0.5 },
                beginAtZero: true,
                max: 35000,
                ticks: {
                    font: { family: 'Bebas', size: 22 },
                    color: '#FFF'
                }
            }
        }
    },
    plugins: [backgroundColorPlugin]
});

const barData = data.barData;
const lineData = data.lineData;
const courbectx = document.getElementById('graph3').getContext('2d');
const barCtx = document.getElementById('graphBar').getContext('2d');

barCtx.canvas.onclick = (event) => {
    const elements = graphBar.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (elements.length > 0) {
        const firstElement = elements[0];
        const datasetIndex = firstElement.datasetIndex;
        const dataIndex = firstElement.index;

        const dataset = graphBar.data.datasets[datasetIndex];
        const barValue = dataset.data[dataIndex];
        const year = graphBar.data.labels[dataIndex];
        const label = dataset.label;

        const otherDatasetIndex = datasetIndex === 0 ? 1 : 0;
        const otherDataset = graphBar.data.datasets[otherDatasetIndex];
        const otherbarValue = otherDataset.data[dataIndex];
        const otherLabel = otherDataset.label;

        document.getElementById('section__condamnation-info').innerHTML = `
            <h1><span class="white">EN</span> <span id="year-counter2">${year}</span></h1>
            <h2><span class="white"><span id="convictions-counter1">${barValue}</span></span> ${label}</h2>
            <p>Durant l'année ${year}, il y a eu ${barValue} ${label} pour ${otherbarValue} ${otherLabel}. 
            On note qu'il y a toujours eu un important écart entre les ${label} et les ${otherLabel}. 
            Certains justifient ça par un manque de preuves, mais la réalité est que la justice a toujours été trop laxiste envers les plaintes pour agression sexuelle.
            <br>Source : <a href="https://visustat.fr/donnees/nationales/justice/evolution-des-violences-sexuelles-en-france/">source 1</a> 
            <a href="https://www.ined.fr/fr/publications/editions/population-et-societes/violences-sexuelles-durant-l-enfance-et-l-adolescence/">source 2</a></p>
        `;

        animateCounter(document.getElementById('convictions-counter1'), 0, barValue, 2000);
        animateCounter(document.getElementById('year-counter2'), 0, year, 400);
    }
};

// Fonction d'affichage au clique pour le graphique type line
courbectx.canvas.onclick = (event) => {
    const elements = graph3.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    if (elements.length > 0) {
        const firstElement = elements[0];
        const datasetIndex = firstElement.datasetIndex;
        const dataIndex = firstElement.index;

        const dataset = graph3.data.datasets[datasetIndex];
        const pointValue = dataset.data[dataIndex];
        const year = graph3.data.labels[dataIndex];
        const label = dataset.label;

        const otherDatasetIndex = datasetIndex === 0 ? 1 : 0;
        const otherDataset = graph3.data.datasets[otherDatasetIndex];
        const otherValue = otherDataset.data[dataIndex];
        const otherLabel = otherDataset.label;

        document.getElementById('section__condamnation-info').innerHTML = `
            <h1><span class="white">EN</span> <span id="year-counter1">${year}</span></h1>
            <h2><span class="white"><span id="convictions-counter">${pointValue}</span></span> ${label}</h2>
            <p>Durant l'année ${year}, il y a eu ${pointValue} ${label} pour ${otherValue} ${otherLabel}. 
            On note qu'il y a toujours eu un important écart entre les ${label} et les ${otherLabel}. 
            Certains justifient ça par un manque de preuves, mais la réalité est que la justice a toujours été trop laxiste envers les plaintes pour agression sexuelle.
            <br>Source : <a href="https://visustat.fr/donnees/nationales/justice/evolution-des-violences-sexuelles-en-france/">source 1</a> 
            <a href="https://www.ined.fr/fr/publications/editions/population-et-societes/violences-sexuelles-durant-l-enfance-et-l-adolescence/">source 2</a></p>
        `;

        animateCounter(document.getElementById('convictions-counter'), 0, pointValue, 2000);
        animateCounter(document.getElementById('year-counter1'), 0, year, 400);
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
        const mapData = data.mapData;

        function getAggressionDataForRegion(region) {
            return mapData.regions[region] || 'Données non disponibles';
        }

        function getAggressionDataForDepartment(department) {
            return mapData.departments[department] || 'Données non disponibles';
        }

        function calculateZoom() {
            const width = window.innerWidth;
            if (width > 1200) {
                return 5.8;
            } else if (width > 768) {
                return 5.5;
            } else {
                return 5; 
            }
        }

        window.addEventListener('resize', () => {
            const newZoom = calculateZoom();
            map.setZoom(newZoom);
            if (regionMap) {
                regionMap.setZoom(newZoom);
            }
        });


        var map = L.map('map', {
            center: [46.603354, 1.888334],
            zoom: calculateZoom(),
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
            let formattedRegionName = regionName
                .toLowerCase()                   // Convertir en minuscules
                .normalize("NFD")                 // Décomposer les caractères accentués
                .replace(/[\u0300-\u036f]/g, "")  // Supprimer les accents
                .replace(/ /g, '-')
                .replace(/'/g, '-');

            let geojsonFile = `https://france-geojson.gregoiredavid.fr/repo/regions/${formattedRegionName}/departements-${formattedRegionName}.geojson`;

            console.log(regionName);

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
        fetch('https://france-geojson.gregoiredavid.fr/repo/regions.geojson')
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
        });
    };

    const options = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    observer.observe(section);
});


// Récupérer les modales et les liens de fermeture
const modals = document.querySelectorAll('.modal1, .modal2');
const closeLinks = document.querySelectorAll('.close');
const body = document.body;

modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) { // Vérifie si le clic est en dehors de la modale
            window.location.hash = '#footer'; // Redirige vers le pied de page pour fermer la modale
            body.classList.remove('no-scroll');
        }
    });
});

// Gérer l'ouverture d'une modale
modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            body.classList.remove('no-scroll');
        }
    });
});

// Gérer la fermeture d'une modale via le bouton "close"
closeLinks.forEach(link => {
    link.addEventListener('click', () => {
        body.classList.remove('no-scroll');
    });
});

// Gérer l'ajout de la classe `no-scroll` pour les liens activant les modales
document.querySelectorAll('.footer__list li a').forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.getAttribute('href');
        console.log(targetId);
        const targetElement = document.querySelector(targetId);
        console.log(targetElement);
        if (targetElement &&
            (targetElement.classList.contains('modal1') ||
                targetElement.classList.contains('modal2'))) {
            body.classList.add('no-scroll');
        }
    });
});
