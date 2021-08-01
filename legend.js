function legend(svg, colorstart, colorend, str, m, M) {
  console.log("here")
   var defs = svg.append('defs');

   // append a linearGradient element to the defs and give it a unique id
   var linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient');

   // horizontal gradient
   linearGradient
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

   // append multiple color stops by using D3's data/enter step
   var colors = [colorstart, colorend];
   linearGradient.selectAll("stop")
   .data(colors)
  .enter()
  .append('stop')
  .style('stop-color', function(d){ return d; })
  .attr('offset', function(d,i){
    return 100 * (i / (colors.length - 1)) + '%';
  })
   /*
      .data([
         {offset: "0%", color: colorstart},
         {offset: "100%", color: colorend}
      ])
      .enter().append("stop")
      .attr("offset", function(d) { 
         return d.offset; 
      })
      .attr("stop-color", function(d) { 
         return d.color; 
      });
      */

   // append title
   svg.append("text")
      .attr("class", "legendTitle")
      .attr("x", 10)
      .attr("y", 20)
      .style("text-anchor", "left")
      .text(str);

   // draw the rectangle and fill with gradient
   svg.append("rect")
      .attr("x", 10)
      .attr("y", 30)
      .attr("width", 400)
      .attr("height", 15)
      .style("fill", "url(#linear-gradient)");

   //create tick marks
   var xLeg = d3.scaleLinear()
      .domain([m, M])
      .range([0, 400]);

   var axisLeg = d3.axisBottom(xLeg);

   svg
      .attr("class", "axis")
      .append("g")
      .attr("transform", "translate(10, 40)")
      .call(axisLeg);
}