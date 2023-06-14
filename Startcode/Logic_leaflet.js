// Creating the map object
let myMap = L.map("map", {
  center: [43.6532, -79.3832], // Toronto GTA coordinates: [latitude, longitude]
  zoom: 10 // Adjust the zoom level as needed
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the restaurant data from sample.json
fetch('sample.json')
  .then(response => response.json())
  .then(data => {
    // Process the retrieved restaurant data
    // Iterate over the data and create markers for each restaurant
    data.forEach(restaurant => {
      const marker = L.marker([latitude, longitude])
        .bindPopup("<strong>" + restaurant.name + "</strong><br />" + restaurant.address);

      marker.addTo(myMap);
    });
  })
  .catch(error => {
    console.error('Error loading restaurant data:', error);
  });


