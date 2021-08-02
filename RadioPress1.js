function RadioPress1(value){
   d3.selectAll("g").remove()

   var margin = {top: 10, right: 60, bottom: 70, left: 80},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    //Create SVG element
    var svg = d3.select("#svg1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


    var parseDate = d3.timeParse("%m//%Y");

   d3.csv("PreSelection3.csv", function(data) {
  // Add X axis
   var mindate = parseDate("01//2006"),
       maxdate = parseDate("12//2010");
   var x = d3.scaleTime()
  .domain([mindate, maxdate])
  .range([0, width]);


  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")

      svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 50) + ")")
      .style("text-anchor", "middle")
      .text("Time");
  


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1000000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));



  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Sold Price (USD)"); 
  // Add dots
  svg.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(parseDate(d.DateSold)); } )
      .attr("cy", function (d) { return y(d.SalePrice); } )
      .attr("r", 3)
      .style("fill", function (d) {
        if (value == 1) {
          var color = d3.scaleOrdinal()
          .domain([1,2,3,4,5,6,7,8])
          .range(d3.schemeBlues[8]);
          return color(d.index_TotalSF)
        }
        else if (value == 2) {
          var color = d3.scaleOrdinal()
          .domain([1,2,3,4,5,6,7,8])
          .range(d3.schemeGreens[8]);
          return color(d.index_GarageArea)
        }
        else if (value == 3) {
          var color = d3.scaleOrdinal()
          .domain([1,2,3,4,5,6,7,8])
          .range(d3.schemeGreys[8]);
          return color(d.index_GrLivArea)
        }
        else if (value == 4) {
          var color = d3.scaleOrdinal()
          .domain([1,2,3,4,5,6,7,8])
          .range(d3.schemePurples[8]);
          return color(d.index_YearRemodAdd)
        }
        else {
          var color = d3.scaleOrdinal()
          .domain([1,2,3,4,5,6,7,8])
          .range(d3.schemeReds[8]);
          return color(d.index_Room)
  }
        })


  if (value == 1) {
    legend(svg, d3.schemeBlues[8][1], d3.schemeBlues[8][7], "Square Feet", 334, 11752) 
    annotation("Price goes up as Square Feet goes up.")
    chart_2()
    chart_3()
    chart_4()
    
  }
  else if (value == 2) {
    legend(svg, d3.schemeGreens[8][1], d3.schemeGreens[8][7], "Garage Area", 0, 1418) 
    annotation("Price goes up as Garage Area goes up.")
    chart_2()
    chart_3()
    chart_4()
  }
  else if (value == 3) {
    legend(svg, d3.schemeGreys[8][1], d3.schemeGreys[8][7], "Living Area", 334, 5642) 
    annotation("Price goes up as Living Area goes up.")
    chart_2()
    chart_3()
    chart_4()
  }
  else if (value == 4) {
    legend(svg, d3.schemePurples[8][1], d3.schemePurples[8][7], "Remodeled Year", 1950, 2010) 
    annotation("Price goes up as the Remodeld Year is more recently.")
    chart_2()
    chart_3()
    chart_4()
  }
  else if (value == 5) {
    legend(svg, d3.schemeReds[8][1], d3.schemeReds[8][7], "Room", 2, 14) 
    annotation("Price goes up as the number of Rooms increase.")
    chart_2()
    chart_3()
    chart_4()
  }


  })


function annotation(text) {
  const annotations = [
  {
    note: {
      title: text
    },
    color: "#ff5f45",
    x: 100,
    y: 400,
    dy: -150,
    dx: 200
  }
]

// Add annotation to the chart
const makeAnnotations = d3.annotation()
  .annotations(annotations)
d3.select("#svg1")
  .append("g")
  .classed('annotation', true)
  .call(makeAnnotations)

}



}





