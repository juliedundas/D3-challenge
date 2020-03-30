//Create variables for the width and height of the chart you are creating
//console.log("hello");
var svgWidth = 900;
var svgHeight = 750;

//Create variables for the margin
var margin = {
  top: 20,
  right: 75,
  bottom: 80,
  left: 100
};

//Set the screen size
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(data) {
    //console.log(data);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3
      .scaleLinear()
      .domain([20, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xMin = d3.min(data, function(data) {
      return data.poverty;
    });
    var xMax = d3.max(data, function(data) {
      return data.poverty;
    });
    var yMin = d3.min(data, function(data) {
      return data.healthcare;
    });
    var yMax = d3.max(data, function(data) {
      return data.healthcare;
    });
    //   console.log(`xmin: ${xMin}`);
    //console.log(`xmax: ${xMax}`);
    //   console.log(`ymin: ${yMin}`);
    //console.log(`ymax: ${yMax}`);

    xLinearScale.domain([xMin, xMax + 2]);
    yLinearScale.domain([yMin, yMax]);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty + 0.6))
      .attr("cy", d => yLinearScale(d.healthcare + 1.1))
      .attr("r", "15")
      .attr("fill", "blue")
      .attr("opacity", ".5");

    // .on("mouseout", function(data, index) {
    //   toolTip.hide(data);
    // });

    //   // Step 6: Initialize tool tip
    // // ==============================
    // var toolTip = d3
    //   .tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return `${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`;
    //   });

    // // Step 7: Create tooltip in the chart
    // // ==============================
    // chartGroup.call(toolTip);
    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    //   circlesGroup
    //     .on("click", function(data) {
    //       toolTip.show(data, this);
    //     })
    //     // onmouseout event
    //     .on("mouseout", function(data, index) {
    //       toolTip.hide(data);
    //     });

    // Create axes labels

    chartGroup
      .append("text")
      .style("font-size", "10px")
      .selectAll("tspan")
      .data(data)
      .enter()
      .append("tspan")
      .attr("x", function(data) {
        return xLinearScale(data.poverty + 0.5);
      })
      .attr("y", function(data) {
        return yLinearScale(data.healthcare + 1);
      })
      .text(function(data) {
        return data.abbr;
      })
      .style("fill", "white");

    chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  })
  .catch(function(error) {
    console.log(error);
  });
