// Fetch the data from the JSON file
d3.json("http://127.0.0.1:5500/sample.json").then(function(data) {
  
  // Sort the data by the number of reviews in descending order
  data.sort(function(a, b) {
    return b.reviews - a.reviews;
  });

  // Create arrays to hold the restaurant names and number of reviews
  var restaurantNames = data.map(restaurant => restaurant.name);
  var numberOfReviews = data.map(restaurant => restaurant.reviews);

  // Create a trace for the plot
  var trace = {
    x: restaurantNames,
    y: numberOfReviews,
    type: 'bar'
  };

  // Define the layout
  var layout = {
    title: 'Top Restaurants by Number of Reviews',
    xaxis: { title: 'Restaurant Name' },
    yaxis: { title: 'Number of Reviews' }
  };

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot('bar-plot', [trace], layout);

}).catch(function(error) {
  console.log("Error loading JSON data: " + error);
});



function optionChanged(value) {
  populateRestaurantsInfo(value);
  createTopRatedRestaurantsChart(value);
}

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
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }