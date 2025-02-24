# Leaflet Challenge
Develope a way to visualize USGS earthquake data that will allow for a way to educate the public and other government organizations. The USGS collect a massive amount of data from all over the world each day. The United States Geological Survey (USGS) is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. The value delivered is the methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

## Solution
[Click Here](https://saurabh-lakhanpal.github.io/leaflet-challenge/)

## Instructions
### Part 1: Create the Earthquake Visualization
1. **Get the dataset:** 
    - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and choose a dataset to visualize.
    - Upon clicking a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization.
2. **Import and visualize the data:**
    - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    - The data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color. The depth of the earth can be found as the third coordinate for each earthquake.
    - Include popups that provide additional information about the earthquake when its associated marker is clicked.
    - Create a legend that will provide context for the map data.

### Part 2: Gather and Plot More Data 
1. Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. Pull in this dataset and visualize it alongside the original data. Data on tectonic plates can be found at [GitHub Tectonic Plates](https://github.com/fraxen/tectonicplates).
2. **Perform the following tasks:**
    - Plot the tectonic plates dataset on the map in addition to the earthquakes.
    - Add other base maps to choose from.
    - Put each dataset into separate overlays that can be turned on and off independently.
    - Add layer controls to the map.
