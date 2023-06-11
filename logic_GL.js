// Global Utility Variables
var data = {}; // Placeholder for your actual data

// Global HTML selectors
var inputSelector = d3.select("#selDataset");
var panelDemoInfo = d3.select("#sample-metadata");

// Populate the restaurant info panel
function populateRestaurantsInfo(idNum) {
  console.log("Pop: " + idNum);

  // Find the first item with the selected category
  var metadataFilter = data.find(item => item["categories"] === idNum);
  console.log("metadataFilter: ", metadataFilter);

  // Clear out the existing data
  panelDemoInfo.html("");

  // Fill it back in
  Object.entries(metadataFilter).forEach(([key, value]) => {
    var titleKey = titleCase(key);
    panelDemoInfo.append("h6").text(`${titleKey}: ${value}`);
  });
}

// Compare function for sorting objects
function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (order === 'desc') ? (comparison * -1) : comparison;
  };
}

// Event handler for the select element
function optionChanged() {
  var selectedCategory = inputSelector.property("value");
  populateRestaurantsInfo(selectedCategory);
  createTopRatedRestaurantsChart(selectedCategory);
}

// Load the JSON data from the file
d3.json("sample.json").then(function(jsonData) {
  data = jsonData; // Assign the loaded data to the data variable

  // Populate the select element with options
  var categories = [...new Set(data.map(item => item.categories.split(", ")).flat())];
  categories.forEach(category => {
    inputSelector.append("option").text(category).attr("value", category);
  });
}).catch(function(error) {
  console.log("Error loading JSON data: " + error);
});

function createTopRatedRestaurantsChart(category) {
  // Filter restaurants by the selected category
  var filteredData = data.filter(restaurant => restaurant.categories.includes(category));

  // Sort by rating in descending order
  var sortedData = filteredData.sort(compareValues('rating', 'desc'));

  // Get top 10 (or fewer if there aren't 10)
  var topRatedRestaurants = sortedData.slice(0, 10);

  // Prepare data for Plotly
  var trace = {
    x: topRatedRestaurants.map(restaurant => restaurant.name),
    y: topRatedRestaurants.map(restaurant => restaurant.rating),
    type: 'bar'
  };

  var layout = {
    title: 'Top 10 Rated Restaurants in ' + category,
    xaxis: { title: 'Restaurant' },
    yaxis: { title: 'Rating' }
  };

  // Render the plot to the div with id 'top-restaurants-bar'
  Plotly.newPlot('top-restaurants-bar', [trace], layout);
}

// Add a listener for the geolocation mapping feature
d3.select("#selDataset").on("change", function() {
  var selectedCategory = this.value;

  // Filter and sort as before
  var filteredData = data.filter(restaurant => restaurant.categories.includes(selectedCategory));
  var sortedData = filteredData.sort(compareValues('rating', 'desc'));
  var topRatedRestaurants = sortedData.slice(0, 10);
});

// Title case function
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}
