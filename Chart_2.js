function chart_2(){
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 85, left: 60},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#svg2")
    .attr("width", 500)
    .attr("height",500)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

console.log("here")
// get the data
d3.csv("/PreSelection3.csv", function(data) {

  // X axis: scale and draw:
  var parseDate = d3.timeParse("%m");

  // Add X axis
   var x = d3.scaleTime()
  .domain([parseDate(1), parseDate(12)])
  .range([0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
//
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 50) + ")")
      .style("text-anchor", "middle")
      .text("Month");
//

  // Y axis: initialization
  var y = d3.scaleLinear()
      .range([height, 0]);
  var yAxis = svg.append("g")

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Sold House"); 



  function update(nBin) {
    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return parseDate(d.MoSold); })   // 
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(nBin)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: update now that we know the domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));

    // Join the rect with the bins data
    var u = svg.selectAll("rect")
        .data(bins)
    // Manage the existing bars and eventually the new ones:
    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#69b3a2")
    u
        .exit()
        .remove()
  }


  // Initialize with 20 bins
  update(12)
  drawAnnotation2()

  // Listen to the button -> update if user change it
  d3.select("#nBin").on("input", function() {
    update(+this.value);
  });



})


function drawAnnotation2() {
  var annotation = svg.append('g');
  annotation.append('rect')
    .attr('id','myrect')
    .attr('x', 110)
    .attr('y', -10)
    .attr('width', 150)
    .attr('height', 420)
    .classed('annotation', true)
  annotation.append('text')
    .attr('x', 270)
    .attr('y', 20)
    .classed('annotation', true)
    .text('More houses are sold')
  annotation.append('text')
    .attr('x', 270)
    .attr('y', 50)
    .classed('annotation', true)
    .text('during Spring')
  annotation.append('text')
    .attr('x', 270)
    .attr('y', 80)
    .classed('annotation', true)
    .text('to Summer.')
  }



}