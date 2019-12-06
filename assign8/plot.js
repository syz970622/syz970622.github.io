// set the dimensions and margins of the graph
var margin = {
	top: 40, 
	right: 40, 
	bottom: 30, 
	left: 100
},
pageWidth = 1300, 								// size of the rectangle box that contains the graph
pageHeight = 700,
width = 1300 - margin.left - margin.right,		// size of the graph
height = 600 - margin.top - margin.bottom;

var minX = "1800", 								
	maxX = "2020", 
	minY = 0, 
	maxY = 50, 
	radius = 3.5
	strokeWidth = 5;

var dataList = ["allData_UnitedStates.csv", "allData_UnitedKingdom.csv"]
var colorList = [d3.rgb(255, 0, 0), d3.rgb(0, 255, 0)]




function plot() {

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin

	var svg = d3.select(".svg-container")
	.append("svg")
	.attr("viewBox", "0 0 " + pageWidth.toString() + " " + pageHeight.toString())
	.attr("preserveAspectRatio", "xMinYMin meet")
	
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    })).append("g");
 
	var xScale = d3.scaleTime().range([0, width]).domain([minX, maxX]);
	var yScale = d3.scaleLinear().range([height, 0]).domain([minY, maxY]);



	var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format(".0f"));
	var yAxis = d3.axisLeft().scale(yScale);
			


	drawAxes(svg, xAxis, yAxis)



	// Get the data
	drawLine("allData_UnitedStates.csv", svg, xScale, yScale, d3.rgb(255, 0, 0))			//red
	drawLine("allData_UnitedKingdom.csv", svg, xScale, yScale, d3.rgb(0, 255, 0))
	drawCircle("events_UnitedStates.csv", svg, xScale, yScale, d3.rgb(255, 0, 0))
	drawCircle("events_UnitedKingdom.csv", svg, xScale, yScale, d3.rgb(0, 255, 0))




}


function drawAxes(svg, xAxis, yAxis) {
	// Add x-axis
	svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

	// Add y-Axis
	svg.append("g")
	.call(yAxis);

	svg.append('text')
	.attr('class', 'label')
	.attr('x', -275)
	.attr('y', -45)
	.attr('transform', 'rotate(-90)')
	.attr('text-anchor', 'middle')
	.text('Percentage of total GDP (%)')

	svg.append('text')
	.attr('class', 'label')
	.attr('x', width/2)
	.attr('y', 575)
	.attr('text-anchor', 'middle')
	.text('Years')


}




function drawLine (allDataFile, svg, x, y, color) {
	var id = filenameToId(allDataFile)
	console.log(id);


    var area = d3.area()
    .x(function(d) { return x(d.Year); })
    .y0(height)
    .y1(function(d) { return y(d.MilitaryExpenditure); });

    var line = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.MilitaryExpenditure); });

    

	d3.csv(allDataFile).then(function(data) {
		// format the data
		

		data.forEach(function(d) {
			d.Year = d.Year;
			d.MilitaryExpenditure = +d.MilitaryExpenditure;
		});


		// Scale the range of the data

		// Add the valueline path.
		
		
		var path = svg.append("path")
		.data([data])
		.attr("class", "line")
		.attr("id", "line" + id)
		//.attr("class", "line" + allDataFile)
		.attr("stroke", color)
		.attr("stroke-width", 0)
		.attr("d", line)
		.on("mouseover", function() {
			for (i = 0; i < dataList.length; i++) {
				if (dataList[i] != allDataFile) {
					turnOff(filenameToId(dataList[i]));

				}
			}
		})
		.on("mouseout", function() {
			for (i = 0; i < dataList.length; i++) {
				var id = filenameToId(dataList[i]);
				if (dataList[i] != allDataFile) {
					turnOn(filenameToId(dataList[i]), colorList[i]);

				}
			}
		});
		


		svg.append("path")
		.data([data])
		.attr("class", "area")
		.attr("id", "area" + id)
		.attr("fill", color)
		.attr("opacity", 0.3)
		.attr("d", area)
		.on("mouseover", function() {
			for (i = 0; i < dataList.length; i++) {
				if (dataList[i] != allDataFile) {
					turnOff(filenameToId(dataList[i]));

				}
			}
		})
		.on("mouseout", function() {
			for (i = 0; i < dataList.length; i++) {
				var id = filenameToId(dataList[i]);
				if (dataList[i] != allDataFile) {
					turnOn(filenameToId(dataList[i]), colorList[i]);

				}
			}
		});

	

		/*if (drawAxes == true) {
			// Add the X Axis
			initPlot(svg, xAxis, yAxis);

		}*/

		animateLine(path)
		

	});
}

function turnOff(id) {
	d3.select("#line" + id).attr("stroke", "grey").attr("opacity", 0.2)
	d3.select("#circle" + id).attr("fill", "grey").attr("opacity", 0.2)
	d3.select("#area" + id).attr("fill", "grey").attr("opacity", 0.1)
}

function turnOn(id, color) {
	d3.select("#line" + id).attr("stroke", color).attr("opacity", 1)
	d3.select("#circle" + id).attr("fill", color).attr("opacity", 1)
	d3.select("#area" + id).attr("fill", color).attr("opacity", 0.3)
}



function animateLine(path) {
	//console.log(path.toString());


	var totalLength = path.node().getTotalLength();

	path.attr("stroke-dasharray", totalLength + " " + totalLength)
	.attr("stroke-dashoffset", totalLength)
	.transition()
	.duration(3000)
	.ease(d3.easeLinear)
	.attr("stroke-dashoffset", 0); 
}



function drawCircle(eventsFile, svg, x, y, color) {
	d3.csv(eventsFile).then(function(data) {


		data.forEach(function(d) {
			d.Year = d.Year;
			d.MilitaryExpenditure = +d.MilitaryExpenditure;
		});




		svg.selectAll(".circle " + eventsFile).data(data)
		.enter()
		.append("circle")
		.attr("id", "circle" + filenameToId(eventsFile))
		.attr("r", radius)
		.attr("fill", color)
		.attr("cx", function(d) {
		return x(d.Year)
		})
		.attr("cy", function(d) {
		return y(d.MilitaryExpenditure)
		})
		.attr("xlink:href", "http://en.wikipedia.org/wiki/")
		.on("mouseover", circleMouseOverHandler)
        .on("mouseout", circleMouseOutHandler)
        .on("click", circleClickHandler)

    

	

	});
}



function circleMouseOverHandler() {
	d3.select(this).attr("r", radius*2)


}

function circleMouseOutHandler() {
	d3.select(this).attr("r", radius)

}


function circleClickHandler() {
	window.open("https://www.google.com", "_self", false)
}

function filenameToId(filename) {
	var index1 = filename.indexOf("_");
	var index2 = filename.indexOf(".");
	return filename.slice(index1+1, index2);

}


