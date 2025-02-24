// Define the map and set its view to the initial latitude and longitude coordinates.
const map = L.map('map').setView([37.7749, -122.4194], 5);

// Add a tile layer to the map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Fetch earthquake data from the USGS GeoJSON Feed.
const earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

fetch(earthquakeUrl)
    .then(response => response.json())
    .then(data => {
        // Add earthquake data to the map.
        const earthquakes = L.geoJson(data, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: feature.properties.mag * 4,
                    fillColor: getDepthColor(feature.geometry.coordinates[2]),
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
            }
        }).addTo(map);

        // Fetch tectonic plates data.
        const platesUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';

        fetch(platesUrl)
            .then(response => response.json())
            .then(platesData => {
                // Add tectonic plates data to the map.
                const plates = L.geoJson(platesData, {
                    style: {
                        color: '#ff7800',
                        weight: 2
                    }
                }).addTo(map);

                // Add layer controls to the map.
                const baseMaps = {
                    "Street Map": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 })
                };

                const overlayMaps = {
                    "Earthquakes": earthquakes,
                    "Tectonic Plates": plates
                };

                L.control.layers(baseMaps, overlayMaps, {
                    collapsed: false
                }).addTo(map);
            });
    });

// Function to get color based on depth.
function getDepthColor(depth) {
    return depth > 90 ? '#d73027' :
           depth > 70 ? '#fc8d59' :
           depth > 50 ? '#fee08b' :
           depth > 30 ? '#d9ef8b' :
           depth > 10 ? '#91cf60' :
                        '#1a9850';
}

// Add legend to the map.
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend'),
        depths = [0, 10, 30, 50, 70, 90],
        labels = [];

    // Add title to the legend.
    div.innerHTML += '<p>Size = Intensity</br>Color = Depth in Km</p>';

    // Loop through depth intervals and generate a label with a colored square for each interval.
    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getDepthColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
