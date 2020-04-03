// //Create variables for the width and height of the chart you are creating
// //console.log("hello");
// var svgWidth = 900;
// var svgHeight = 750;

// //Create variables for the margin
// var margin = {
//   top: 20,
//   right: 75,
//   bottom: 80,
//   left: 100
// };

// //Set the screen size
// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// var chartGroup = svg
//   .append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// d3.select("body")
//   .append("div")
//   .attr("class", "tooltip")
//   .style("opacity", 0);

// // Import Data
// d3.csv("assets/data/data.csv")
//   .then(function(data) {
//     //console.log(data);

//     // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     data.forEach(function(data) {
//       data.poverty = +data.poverty;
//       data.healthcare = +data.healthcare;
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     var xLinearScale = d3
//       .scaleLinear()
//       .domain([20, d3.max(data, d => d.poverty)])
//       .range([0, width]);

//     var yLinearScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, d => d.healthcare)])
//       .range([height, 0]);

//     // Step 3: Create axis functions
//     // ==============================
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

//     var xMin = d3.min(data, function(data) {
//       return data.poverty;
//     });
//     var xMax = d3.max(data, function(data) {
//       return data.poverty;
//     });
//     var yMin = d3.min(data, function(data) {
//       return data.healthcare;
//     });
//     var yMax = d3.max(data, function(data) {
//       return data.healthcare;
//     });
//     //   console.log(`xmin: ${xMin}`);
//     //console.log(`xmax: ${xMax}`);
//     //   console.log(`ymin: ${yMin}`);
//     //console.log(`ymax: ${yMax}`);

//     xLinearScale.domain([xMin, xMax + 2]);
//     yLinearScale.domain([yMin, yMax]);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup
//       .append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g").call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================
//     var circlesGroup = chartGroup
//       .selectAll("circle")
//       .data(data)
//       .enter()
//       .append("circle")
//       .attr("cx", d => xLinearScale(d.poverty + 0.6))
//       .attr("cy", d => yLinearScale(d.healthcare + 1.1))
//       .attr("r", "15")
//       .attr("fill", "blue")
//       .attr("opacity", ".5");

//     //.on("mouseout", function(data, index) {
//     //  toolTip.hide(data);
//     // });

//     // Step 6: Initialize tool tip
//     // ==============================
//     // var toolTip = d3
//     //   .tip()
//     //   .attr("class", "tooltip")
//     //   .offset([80, -60])
//     //   .html(function(d) {
//     //     return `${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`;
//     //   });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     // chartGroup.call(toolTip);
//     // //Step 8: Create event listeners to display and hide the tooltip
//     // // ==============================
//     // circlesGroup
//     //   .on("click", function(data) {
//     //     toolTip.show(data, this);
//     //   })
//     //   // onmouseout event
//     //   .on("mouseout", function(data, index) {
//     //     toolTip.hide(data);
//     //   });

//     // Create axes labels

//     chartGroup
//       .append("text")
//       .style("font-size", "10px")
//       .selectAll("tspan")
//       .data(data)
//       .enter()
//       .append("tspan")
//       .attr("x", function(data) {
//         return xLinearScale(data.chosenXAxis + 0.45);
//       })
//       .attr("y", function(data) {
//         return yLinearScale(data.healthcare + 1);
//       })
//       .text(function(data) {
//         return data.abbr;
//       })
//       .style("fill", "white");

//     chartGroup
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 10)
//       .attr("x", 0 - height / 2)
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Lacks Healthcare (%)");

//     chartGroup
//       .append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("In Poverty (%)");
//   })
//   .catch(function(error) {
//     console.log(error);
//   });


////////***********THIS IS WHERE MY SECOND ATTEMPT STARTS - DO NOT CHANGE CODE ABOVE!!!!!!!!! */
var svgWidth = 850;
var svgHeight = 500;

var margin = {
  top: 50,
  right: 40,
  bottom: 80,
  left: 100
};

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

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(stateData, chosenXAxis) {
  // create scales
  var xLinearScale = d3
    .scaleLinear()
    .domain([
      d3.min(stateData, d => d[chosenXAxis]) * 0.8,
      d3.max(stateData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis
    .transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup
    .transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))


  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
  var label;

  if (chosenXAxis === "poverty") {
    label = "Poverty (%):"

  } else {
    label = "Annual Income ($)";
  }

  var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function (d) {
      return `${d.abbr}<br>${label} ${d[chosenXAxis]}`;
    });

  circlesGroup.call(toolTip);

  circlesGroup
    .on("mouseover", function (data) {
      toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv")
  .then(function (stateData, err) {
    if (err) throw err;

    // parse data
    stateData.forEach(function (data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      data.income = +data.income;


    });

    // xLinearScale function above csv import
    var xLinearScale = xScale(stateData, chosenXAxis);

    // Create y scale function
    var yLinearScale = d3
      .scaleLinear()
      .domain([0, d3.max(stateData, d => d.healthcare)])
      .range([height, 0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    // append x axis
    var xAxis = chartGroup
      .append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    chartGroup.append("g").call(leftAxis);

    // append initial circles
    var xAxis = chartGroup
      .selectAll("circle")
      .data(stateData)
      .enter()
      .append("tspan")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", 20)
      .attr("fill", "blue")
      .attr("opacity", ".5")



    var circlesGroup = chartGroup
      .selectAll("circle")
      .data(stateData)
      .enter()
      .append("circle")
      //.style("fill", function (d) { return stateData(d.attr) })
      .attr("cx", function (data, index) {
        return xLinearScale(Number(data[chosenXAxis]));
      })
      .attr("cy", function (data, index) {
        return yLinearScale(Number(data.healthcare));
      })
      .attr("r", 20)
      .attr("fill", "blue")
      .attr("opacity", ".5")


      .on("mouseover", function (data) {
        toolTip.show(data)
      })
      .on("mouseout", function (data) {
        toolTip.hide(data)
      });



    //create text for each circle
    function circleText() {
      if (chosenXAxis === "poverty") {
        chartGroup.append("text")
          .style("font-size", "12px")
          .style("fill", "white")
          .selectAll("tspan")
          .data(stateData)
          .enter()
          .append("tspan")
          .attr("x", function (data) {
            return xLinearScale(data.poverty - 0.2);
          })
          .attr("y", function (data) {
            return yLinearScale(data.healthcare - 0.2);
          })
          .text(function (data) {
            return data.abbr
          })
      }


      else {
        chartGroup.append("text")
          .style("font-size", "12px")
          .style("fill", "white")
          .selectAll("tspan")
          .data(stateData)
          .enter()
          .append("tspan")
          .text(function (data) {
            return data.abbr
          })
      }
    }


    circleText()

    // var povertyCircle = chartGroup.append("text")
    //   .style("font-size", "12px")
    //   .style("fill", "white")
    //   .selectAll("tspan")
    //   .data(stateData)
    //   .enter()
    //   .append("tspan")
    //   .attr("x", function (data) {
    //     return xLinearScale(data.poverty - 0.2);
    //   })
    //   .attr("y", function (data) {
    //     return yLinearScale(data.healthcare - 0.2);
    //   })
    //   .text(function (data) {
    //     return data.abbr
    //   })

    // var incomeCircle = chartGroup.append("text")
    //   .style("font-size", "12px")
    //   .style("fill", "white")
    //   .selectAll("tspan")
    //   .data(stateData)
    //   .enter()
    //   .append("tspan")
    //   .attr("x", function (data) {
    //     return xLinearScale(data.income - 0.2);
    //   })
    //   .attr("y", function (data) {
    //     return yLinearScale(data.healthcare - 0.2);
    //   })
    //   .text(function (data) {
    //     return data.abbr
    //   })



    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = labelsGroup
      .append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "poverty") // value to grab for event listener
      .classed("active", true)
      .text("In Poverty (%)");

    var incomeLabel = labelsGroup
      .append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "income") // value to grab for event listener
      .classed("inactive", true)
      .text("Annual Income ($)");

    // append y axis
    chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .classed("axis-text", true)
      .text("Lacks Healthcare (%)");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // x axis labels event listener
    labelsGroup.selectAll("text").on("click", function () {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {
        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(stateData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);



        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "income") {
          incomeLabel.classed("active", true).classed("inactive", false);
          povertyLabel.classed("active", false).classed("inactive", true);
        } else {
          incomeLabel.classed("active", false).classed("inactive", true);
          povertyLabel.classed("active", true).classed("inactive", false);
        }
      }
    })




  })
  .catch(function (error) {
    console.log(error);
  });
