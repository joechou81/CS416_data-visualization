function chart_4() {

    var TranslateX = 50,
        TranslateY = 50;
        level = 5;


    var color = d3.scaleOrdinal().range(["#6495ED","#00008B"])
    d3.json("RadarChart.json", function (data) {

    var allAxis = (data[0].map(function(i, j){return i.area}));
    var total = 5;//allAxis.length;
    var radius = Math.min(200, 200);
    var Format = d3.format('%');

    var g = d3.select("#svg4")
        .attr("width", 500)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(" + TranslateX + "," + TranslateY + ")");

		var tooltip;
	   

    //Circular segments
    for(var j=0; j<5; j++){
      var levelFactor = radius*((j+1)/level);
      g.selectAll(".levels")
       .data(allAxis)
       .enter()
       .append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-Math.sin(i*2*Math.PI/total));})
       .attr("y1", function(d, i){return levelFactor*(1-Math.cos(i*2*Math.PI/total));})
       .attr("x2", function(d, i){return levelFactor*(1-Math.sin((i+1)*2*Math.PI/total));})
       .attr("y2", function(d, i){return levelFactor*(1-Math.cos((i+1)*2*Math.PI/total));})
       .attr("class", "line")
       .style("stroke", "grey")
       .style("stroke-opacity", "0.75")
       .style("stroke-width", "0.3px")
       .attr("transform", "translate(" + (200-levelFactor) + ", " + (200-levelFactor) + ")");
    }

    //Text indicating at what % each level is
    for(var j=0; j<5; j++){
      var levelFactor = radius*((j+1)/level);
      g.selectAll(".levels")
       .data([1]) //dummy data
       .enter()
       .append("svg:text")
       .attr("x", function(d){return levelFactor*1;})
       .attr("y", function(d){return levelFactor*0;})
       .attr("class", "legend")
       .style("font-family", "sans-serif")
       .style("font-size", "10px")
       .attr("transform", "translate(" + (200-levelFactor + 5) + ", " + (200-levelFactor) + ")")
       .attr("fill", "#737373")
       .text((j+1)*20);
    }

    series = 0;
    var color2 = ["blue","green","gray","purple","red"]

    var axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
      .attr("x1", 200)
      .attr("y1", 200)
      .attr("x2", function(d, i){return 200*(1-Math.sin(i*2*Math.PI/total));})
      .attr("y2", function(d, i){return 200*(1-Math.cos(i*2*Math.PI/total));})
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    axis.append("text")
      .attr("class", "legend")
      .text(function(d){return d})
      .style("font-family", "sans-serif")
      .style("font-size", "15px")
      .style("fill", function(d,i){return color2[i];})
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function(d, i){return "translate(0, -10)"})
      .attr("x", function(d, i){return 200*(1-0.8*Math.sin(i*2*Math.PI/total))-60*Math.sin(i*2*Math.PI/total);})
      .attr("y", function(d, i){return 200*(1-Math.cos(i*2*Math.PI/total))-30*Math.cos(i*2*Math.PI/total);});

 
    data.forEach(function(y, x){
      dataValues = [];
      g.selectAll(".nodes")
      .data(y, function(j, i){
        dataValues.push([
        200*(1-(parseFloat(Math.max(j.value, 0))/100)*Math.sin(i*2*Math.PI/total)), 
        200*(1-(parseFloat(Math.max(j.value, 0))/100)*Math.cos(i*2*Math.PI/total))
        ]);
      });

      dataValues.push(dataValues[0]);
      g.selectAll(".area")
             .data([dataValues])
             .enter()
             .append("polygon")
             .attr("class", "radar-chart-serie"+series)
             .style("stroke-width", "2px")
             .style("stroke", color(series))
             .attr("points",function(d) {
               var str="";
               for(var pti=0;pti<d.length;pti++){
                 str=str+d[pti][0]+","+d[pti][1]+" ";
               }
               return str;
              })
             .style("fill", function(j, i){return color(series)})
             .style("fill-opacity", 0.5)
             .on('mouseover', function (d){
                      z = "polygon."+d3.select(this).attr("class");
                      g.selectAll("polygon")
                       .transition(200)
                       .style("fill-opacity", 0.1); 
                      g.selectAll(z)
                       .transition(200)
                       .style("fill-opacity", .7);
                      })
             .on('mouseout', function(){
                      g.selectAll("polygon")
                       .transition(200)
                       .style("fill-opacity", 0.5);
             });
      series++;
    });
    series=0;

var annotation = d3.selectAll("#svg4").append('g');
annotation.append('rect')
    .attr('id','myrect')
    .attr('x', 220)
    .attr('y', 130)
    .attr('width', 50)
    .attr('height', 50)
    .classed('annotation', true);
    annotation.append('text')
    .attr('x', 220)
    .attr('y', 110)
    .classed('annotation', true)
    .text('Affects the house price the most!')


var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    data.forEach(function(y, x){
      g.selectAll(".nodes")
      .data(y).enter()
      .append("svg:circle")
      .attr("class", "radar-chart-serie"+series)
      .attr('r', 5) // radius
      .attr("alt", function(j){return Math.max(j.value, 0)})
      .attr("cx", function(j, i){
        dataValues.push([
        200*(1-(parseFloat(Math.max(j.value, 0))/100)*Math.sin(i*2*Math.PI/total)), 
        200*(1-(parseFloat(Math.max(j.value, 0))/100)*Math.cos(i*2*Math.PI/total))
      ]);
      return 200*(1-(Math.max(j.value, 0)/100)*Math.sin(i*2*Math.PI/total));
      })
      .attr("cy", function(j, i){
        return 200*(1-(Math.max(j.value, 0)/100)*Math.cos(i*2*Math.PI/total));
      })
      .attr("data-id", function(j){return j.area})
      .style("fill", "#fff")
      .style("stroke-width", "2px")
      .style("stroke", color(series)).style("fill-opacity", .9)
      .on('mouseover', function (d){
        console.log(d.area)
            tooltip
              .style("left", d3.event.pageX - 10 + "px")
              .style("top", d3.event.pageY - 80 + "px")
              .style("display", "inline-block")
      				.html((d.area) + "<br><span>" + (d.value) + "</span>");
            })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
      series++;
    });
    })

}
