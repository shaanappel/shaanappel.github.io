var myName = "404";

var w = window,
	d = document,
	e = d.documentElement,
	g = d.getElementsByTagName('body')[0],
	x = w.innerWidth || e.clientWidth || g.clientWidth,
	y = w.innerHeight|| e.clientHeight|| g.clientHeight;

//960
//400

var width = Math.min(x - 15, 800),
height = Math.min(x / 2, 400);
color = d3.scale.category10();

nodes = getNameNodes(myName, width, height);

nodes.unshift({x:-1000, y:-1000, r: 0});
root = nodes[0];
root.fixed = true;

var dataLinks = [];
for (var i = 1; i < nodes.length; i++) {
    if (i % 2 == 1) {
        var link = {
            source: i+1,
            target: i
        }
        dataLinks.push(link);
    }
}

var force = d3.layout.force()
  .gravity(0.01)
  .charge(charge)
  .nodes(nodes)
  .size([width, height])
  .links(dataLinks);

force.friction(0.7);
force.linkDistance(0);
force.linkStrength(function(link) {
    return 2;
});

force.start();

var drag = d3.behavior.drag()
  .on("drag", dragged);

var svg = d3.select("#bubbles")
  .append("svg")
  	.on("touchstart", touch)
    .on("touchmove", touch)
    .attr("width", width)
    .attr("height", height)
    .call(drag);

svg.selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", function(d) { return d.r; })
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .style("fill", function(d, i) { return color(i % 3); });

force.on("tick", function(e) {
    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
});


function dragged() {
  root.x = d3.event.x;
  root.y = d3.event.y;
  force.resume();
}


function touch() {
  d3.event.preventDefault();
} 

svg.on("mousemove", function() {
    var p1 = d3.mouse(this);
    root.px = p1[0];
    root.py = p1[1];
    console.log(p1)
    force.resume();
});

function charge(d, i) {
    if (i==0) {
      return -4000;
    } else {
      return 0;
    }
}