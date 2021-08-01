function chart_1(){
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
      .attr("transform", "rotate(-65)");


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
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(parseDate(d.DateSold)); } )
      .attr("cy", function (d) { return y(d.SalePrice); } )
      .attr("r", 3)
      .style("fill", "#333")

})  


drawAnnotation()

function drawAnnotation() {
  var annotation = svg.append('g');
   annotation.append('rect')
    .attr('id','myrect')
    .attr('x', 20)
    .attr('y', 200)
    .attr('width', 35)
    .attr('height', 120)
    .classed('annotation', true)
    .transition().duration(4000).attr('y',300);
   annotation.append('rect')
    .attr('id','myrect')
    .attr('x', 90)
    .attr('y', 200)
    .attr('width', 35)
    .attr('height', 120)
    .classed('annotation', true)
    .transition().duration(4000).attr('y',300);

   annotation.append('rect')
    .attr('id','myrect')
    .attr('x', 160)
    .attr('y', 200)
    .attr('width', 35)
    .attr('height', 120)
    .classed('annotation', true)
    .transition().duration(4000).attr('y',300);

   annotation.append('rect')
    .attr('id','myrect')
    .attr('x', 240)
    .attr('y', 200)
    .attr('width', 35)
    .attr('height', 120)
    .classed('annotation', true)
    .transition().duration(4000).attr('y',300);

   annotation.append('rect')
    .attr('id','myrect')
    .attr('x', 300)
    .attr('y', 200)
    .attr('width', 35)
    .attr('height', 120)
    .classed('annotation', true)
    .transition().duration(4000).attr('y',300);

   annotation.append('line')
    .attr("x1", 37)
    .attr("x2", 250)
    .attr("y1", 200)
    .attr("y2", 0)
    .classed('annotation', true)
    .transition().duration(4000).attr('y2',50).attr('y1',300);

   annotation.append('line')
    .attr("x1", 107)
    .attr("x2", 250)
    .attr("y1", 200)
    .attr("y2", 0)
    .classed('annotation', true)
    .transition().duration(4000).attr('y2',50).attr('y1',300);

   annotation.append('line')
    .attr("x1", 177)
    .attr("x2", 250)
    .attr("y1", 200)
    .attr("y2", 0)
    .classed('annotation', true)
    .transition().duration(4000).attr('y2',50).attr('y1',300);

   annotation.append('line')
    .attr("x1", 257)
    .attr("x2", 250)
    .attr("y1", 200)
    .attr("y2", 0)
    .classed('annotation', true)
    .transition().duration(4000).attr('y2',50).attr('y1',300);

   annotation.append('line')
    .attr("x1", 317)
    .attr("x2", 250)
    .attr("y1", 200)
    .attr("y2", 0)
    .classed('annotation', true)
    .transition().duration(4000).attr('y2',50).attr('y1',300);
   setTimeout(function(){
      annotation.append('text')
    .attr('x', 230)
    .attr('y', 40)
    .classed('annotation', true)
    .text('Spring to Summer sales')
    .transition().duration(4000).attr('y2',50).attr('y1',300);
      annotation.append('text')
    .attr('x', 270)
    .attr('y', 60)
    .classed('annotation', true)
    .text('more houses.')
      }, 4000)

}


}





