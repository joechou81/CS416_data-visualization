function chart_3(){
	// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 70, left: 50},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleLinear().domain([0,1]).range([0, width]);
var y = d3.scaleLinear().domain([0,1]).range([height, 0]);

// define square feet line
var valueline = d3.line()
    .x(function(d) { return x(d.SalePrice); })
    .y(function(d) { return y(d.TotalSF); });

// define garage area line
var valueline2 = d3.line()
    .x(function(d) { return x(d.SalePrice); })
    .y(function(d) { return y(d.GarageArea); });


// define Living Area line
var valueline3 = d3.line()
    .x(function(d) { return x(d.SalePrice); })
    .y(function(d) { return y(d.GrLivArea); });


// define Remodeled year line
var valueline4 = d3.line()
    .x(function(d) { return x(d.SalePrice); })
    .y(function(d) { return y(d.YearRemodAdd); });

// define Room line
var valueline5 = d3.line()
    .x(function(d) { return x(d.SalePrice); })
    .y(function(d) { return y(d.TotRmsAbvGrd); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#svg3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var keys = ["Square Feet","Garage Area"," Living Area"," Remodeled Year","Room"]
var color = ["blue","green","gray","purple","red"]

svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", 250)
    .attr("cy", function(d,i){ return 300 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d,i){ return color[i];})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 270)
    .attr("y", function(d,i){ return 300 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d,i){ return color[i];})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .attr("class","p")
    .style("alignment-baseline", "middle")




// Get the data
d3.csv("/smooth.csv", function(error, data) {


  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke","blue")
      .style("fill","none")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "green")
      .style("fill","none")
      .attr("d", valueline2);


  // Add the valueline3 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "gray")
      .style("fill","none")
      .attr("d", valueline3);

  // Add the valueline4 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "purple")
      .style("fill","none")
      .attr("d", valueline4);

   // Add the valueline5 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .style("fill","none")
      .attr("d", valueline5);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Normalized Value");

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Normalized Sold Price"); 

  })
}