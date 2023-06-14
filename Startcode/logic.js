// draw Barchart
function createTopRatedRestaurantsChart(category) {
  // Fetch the data from the JSON file
d3.json("sample.json").then(function(data) {
  
// Sort the data by the number of ratings in descending order
data.sort(function(a, b) {
  return b.rating - a.rating;
});



// Filter restaurants by the selected category
  var filteredData = data.filter(restaurant => restaurant.categories.includes(category));


// Sort by rating in descending order
  var sortedData = filteredData.sort(compareValues('rating', 'desc'));


// Get top 10 (or fewer if there aren't 10)
  var topRatedRestaurants = sortedData.slice(0, 11);                        //CHANGED THIS FROM (0,10) TO (0,11) TO CAPTURE ALL 10 RESTAURANTS                                 



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
})}








// Draw Pie Chart
function createPieChart(category) {
  d3.json("sample.json").then(function(data) {
  // Filter the data for the selected category
  var filteredData = data.filter(restaurant => restaurant.categories.includes(category));


  // Create an object to count restaurants for each rating
  var ratingCounts = {};
  filteredData.forEach(restaurant => {
    var rating = Math.round(restaurant.rating); // Round to the nearest integer
    ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
  });

  // Create arrays for ratings and counts
  var ratings = Object.keys(ratingCounts);
  var counts = Object.values(ratingCounts);

  // Create the data for the pie chart
  var pieData = [{
    values: counts,
    labels: ratings,
    type: 'pie'
  }];

  // Define the layout
  var layout = {
    title: 'Distribution of Restaurant Ratings for ' + category,
    height: 400,
    width: 500
  };

  // Plot the chart to a div tag with id "category-pie"
  Plotly.newPlot('category-pie', pieData, layout);
}
  )}








// change Options of Resturants
function optionChanged(value) {                                             //MOVED THIS DOWN 
    populateRestaurantsInfo(value);
    createTopRatedRestaurantsChart(value);
    createPieChart(value);
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