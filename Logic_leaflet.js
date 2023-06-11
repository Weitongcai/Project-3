// Store our API endpoint inside queryUrl
var queryUrl = "https://open.toronto.ca/dataset/city-wards/";

// Perform a GET request to the query URL
fetch(queryUrl)
  .then(response => response.json())
  .then(data => {
    createFeatures(data);
  })
  .catch(error => {
    console.error('Error loading City Wards GeoJSON:', error);
  });

function createFeatures(cityWardsData) {
  // Create the map
  var map = L.map('map').setView([43.7, -79.4], 10);

  // Add the tile layer (e.g., OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Create a GeoJSON layer containing the City Wards features
  L.geoJSON(cityWardsData).addTo(map);
}
