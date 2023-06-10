// Global Utility Variables
var data = {}; // Placeholder for your actual data

// Global HTML selectors
var inputSelector = d3.select("#selDataset");
var panelDemoInfo = d3.select("#sample-metadata");

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

// Populate the restaurants Info panel
function populateRestaurantsInfo(idNum) {
  // Log a change
  console.log("Pop: " + idNum);

  // Just grab the one category we want
  var metadataFilter = data.filter(item => item["categories"] === idNum);
  console.log(`metaFilter length: ${metadataFilter.length}`);

  // Clear out the data first
  panelDemoInfo.html("");

  // Fill it back in
  Object.entries(metadataFilter[0]).forEach(([key, value]) => {
    var titleKey = titleCase(key);
    panelDemoInfo.append("h6").text(`${titleKey}: ${value}`);
  });
}

// Object Compare Function
function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase()
      : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase()
      : b[key];
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
function optionChanged(value) {
  populateRestaurantsInfo(value);
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











// Draw Pie Chart
// Load the sample JSON data
d3.json("Data/sample.json").then(function(jsonData) {
    // Extract the required information for the pie chart
    const ratings = jsonData.map(item => item.rating);
    const count1to2 = ratings.filter(rating => rating >= 1 && rating < 3).length;
    const count3to4 = ratings.filter(rating => rating >= 3 && rating <= 4).length;
    const countAbove4 = ratings.filter(rating => rating > 4).length;
  
    // Create an array of objects representing the rating ranges and their counts
    const pieData = [
      { label: '1-2', value: count1to2 },
      { label: '3-4', value: count3to4 },
      { label: 'Above 4', value: countAbove4 }
    ];
  
    // Set up options for the PieChart
    const options = {
      width: 400,
      height: 300
      // Add more options as needed
    };
  
    // Call the PieChart function
    const chartElement = PieChart(pieData, options);
  
    // Append the chart element to the DOM
    document.getElementById("chart-container").appendChild(chartElement);
  }).catch(function(error) {
    console.log(error);
  });
  
  // Implementation of the PieChart function
  function PieChart(data, {
    name = d => {
      if (d.data.label === '1-2') {
        return 'Rating 1-2';
      } else if (d.data.label === '3-4') {
        return 'Rating 3-4';
      } else if (d.data.label === 'Above 4') {
        return 'Above 4';
      }
    },
    value = d => d.value,
    title = d => `${name(d)} (${(value(d) / d3.sum(data, value) * 100).toFixed(2)}%)`,
    width = 640,
    height = 400,
    innerRadius = 0,
    outerRadius = Math.min(width, height) / 2,
    labelRadius = (innerRadius * 0.2 + outerRadius * 0.8),
    format = ",",
    colors = d3.schemeCategory10,
    stroke = innerRadius > 0 ? "none" : "white",
    strokeWidth = 1,
    strokeLinejoin = "round",
    padAngle = stroke === "none" ? 1 / outerRadius : 0
  } = {}) {
    const arcs = d3.pie()
      .padAngle(padAngle)
      .sort(null)
      .value(value)(data);
  
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  
    const arcLabel = d3.arc()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);
  
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    svg.append("g")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin)
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (_, i) => colors[i % colors.length])
      .attr("d", arc)
      .append("title")
      .text(title);
  
    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => `${name(d)}, ${((value(d) / d3.sum(data, value)) * 100).toFixed(2)}%`));
  
    return svg.node();
  }
  



// Draw the bar plot
/


