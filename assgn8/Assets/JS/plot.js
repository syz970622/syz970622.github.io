// using d3.js learned from https://github.com/d3/d3/blob/master/API.md
// set the dimensions and margins of the graph
var margin = {
    top: 40,
    right: 40,
    bottom: 30,
    left: 100
};

var pageWidth = 1400;           // size of the rectangle box that contains the graph
var pageHeight = 700;
var width = 1300 - margin.left - margin.right;          // size of the graph
var height = 600 - margin.top - margin.bottom;

// dimensions of the graph
var minX = "1827";
var maxX = "2020";
var minY = 0;
var maxY = 150;
var radius = 3.5;
var strokeWidth = 5;


// linking all csv files
var allDataFileList = [
    "Assets/CSV/allData_UnitedStates.csv",
    "Assets/CSV/allData_UnitedKingdom.csv",
    "Assets/CSV/allData_China.csv",
    "Assets/CSV/allData_Japan.csv",
    "Assets/CSV/allData_Canada.csv",
    "Assets/CSV/allData_Germany.csv",
    "Assets/CSV/allData_France.csv",
    "Assets/CSV/allData_Russia.csv"
    ]

var eventsFileList = [
    "Assets/CSV/events_UnitedStates.csv",
    "Assets/CSV/events_UnitedKingdom.csv",
    "Assets/CSV/events_China.csv",
    "Assets/CSV/events_Japan.csv",
    "Assets/CSV/events_Canada.csv",
    "Assets/CSV/events_Germany.csv",
    "Assets/CSV/events_France.csv",
    "Assets/CSV/events_Russia.csv"
    ]

// description of historical events
var descriptionMap = new Map([
    ["Canada1936", ["Spanish Civil War", "The Mackenzie®CPapineau Battalion (a volunteer unit not authorized or supported by the Canadian government) fought on the Republican side in the Spanish Civil War (1936®C1939)"]],
    ["China1911", ["Battle of Yangxia", "Qing and Revolutionary Armies vie for control of Wuhan."]],
    ["China1932", ["Nanchang Uprising", "The Nanchang Uprising was the first major Nationalist Party of China CCommunist Party of China engagement of the Chinese Civil War, begun by the Chinese Communists to counter the Shanghai massacre of 1927 by the Kuomintang."]],
    ["China1936", ["Second Sino-Japanese War", "The Second Sino-Japanese War was a military conflict fought primarily between the Republic of China and the Empire of Japan from July 7, 1937, to September 2, 1945. It began with the Marco Polo Bridge Incident in 1937 in which a dispute between Japanese and Chinese troops escalated into a battle."]],
    ["China1949", ["Chinese Civil War", "The Chinese Civil War was a civil war in China fought between the Kuomintang (KMT)-led government of the Republic of China (ROC) and the Communist Party of China (CPC) lasting intermittently between 1927 and 1949. "]],
    ["China1951", ["Korean War", "The Korean War was a war between North Korea (with the support of China and the Soviet Union) and South Korea (with the support of the United Nations, principally from the United States). The war began on 25 June 1950 when North Korea invaded South Korea following a series of clashes along the border."]],
    ["China1989", ["Tiananmen Square protests", "The Tiananmen Square protests, commonly known in mainland China as the June Fourth Incident , were student-led demonstrations held in Tiananmen Square in Beijing during 1989. "]],
    ["Germany1914", ["First World War", "The German Schlieffen plan to deal with the Franco-Russian alliance involved delivering a knock-out blow to the French and then turning to deal with the more slowly mobilised Russian army. At the start of the First World War, Germany attacked France through Belgium to avoid French defenses on the French-German border."]],
    ["Germany1918", ["Weimar Republic and the Third Reich", "The treaty of Versailles imposed severe restrictions on Germany's military strength. The army was limited to one hundred thousand men with an additional fifteen thousand in the navy. The fleet was to consist of at most six battleships, six cruisers, and twelve destroyers, and the Washington Naval Treaty established severe tonnage restrictions for German warships. Tanks and heavy artillery were forbidden and the air force was dissolved."]],
    ["Germany1939", ["Second World War ", "At first Germany's military moves were brilliantly successful, as in the \'blitzkrieg\' invasions of Poland (1939), Norway and Denmark (1940), the Low Countries (1940), and above all the stunningly successful invasion and quick conquest of France in 1940. "]],
    ["Russia1925", ["Interwar period", "Following the death of Lenin, the Soviet Union was enmeshed in a struggle for succession that pitted Trotsky and his policy of \'world revolution\' against Stalin and his policy of \'socialism in one country.\'"]],
    ["Russia1939", ["World War II", "World War II"]],
    ["Russia1947", ["Cold War", "The Molotov®CRibbentrop Pact of August 1939 established a non-aggression treaty between Nazi Germany and the Soviet Union with a secret protocol describing how Poland and the Baltic countries would be divided between them. In the invasion of Poland of 1939 the two powers invaded and partitioned Poland, and in June 1940 the Soviet Union also occupied Estonia, Latvia and Lithuania."]],
    ["Russia1992", ["Collapse of the Soviet Union", "On December 25, 1991, the Soviet hammer and sickle flag lowered for the last time over the Kremlin, thereafter replaced by the Russian tricolor. Earlier in the day, Mikhail Gorbachev resigned his post as president of the Soviet Union, leaving Boris Yeltsin as president of the newly independent Russian state."]],
    ["UnitedKingdom1839", ["Egyptian COttoman War", "In 1839, the Ottoman Empire moved to reoccupy lands lost to Muhammad Ali in the First Turko-Egyptian War. The Ottoman Empire invaded Syria, but after suffering a defeat at the Battle of Nezib appeared on the verge of collapse."]],
    ["UnitedKingdom1840", ["First Opium War", "The First Opium War, also known as the Opium War or the Anglo-Chinese War, was a series of military engagements fought between Great Britain and the Qing dynasty of China. Chinese officials clamped down on the banned opium trade, and threatened the death penalty to future offenders, causing offence toward the British government."]],
    ["UnitedKingdom1843", ["New Zealand Wars", "The New Zealand Wars were a series of armed conflicts that took place in New Zealand from 1845 to 1872 between the Colonial government and allied M  ori on one side and M  ori and M  ori-allied settlers on the other. They were previously commonly referred to as the Land Wars or the M  ori Wars[2] while M  ori language names for the conflicts included Ng   pakanga o Aotearoa (\'eat New Zealand wars\') and Te riri P  keh   (\'e white man's anger\').     2"]],
    ["UnitedKingdom1857", ["Indian Rebellion", "The Indian Rebellion of 1857 was a major, but ultimately unsuccessful, uprising in India in 1857 C58 against the rule of the British East India Company, which functioned as a sovereign power on behalf of the British Crown"]],
    ["UnitedKingdom1899", ["Boxer Rebellion", "The Boxer Rebellion, Boxer Uprising, or Yihetuan Movement was an anti-imperialist, anti-foreign, and anti-Christian uprising that took place in China between 1899 and 1901, toward the end of the Qing dynasty."]],
    ["UnitedKingdom1914", ["World War I", "World War I (often abbreviated as WWI or WW1), also known as the First World War, the Great War, the Seminal Catastrophe, and initially in North America as the European War, was a global war originating in Europe that lasted from 28 July 1914 to 11 November 1918. "]],
    ["UnitedKingdom1939", ["World War II", "World War II (often abbreviated to WWII or WW2), also known as the Second World War, was a global war that lasted from 1939 to 1945. The vast majority of the world's countries  including all the great powers  eventually formed two opposing military alliances: the Allies and the Axis. A state of total war emerged, directly involving more than 100 million people from more than 30 countries. "]],
    ["UnitedKingdom1998", ["Kosovo War", "The Kosovo War was an armed conflict in Kosovo that started in late February 1998[50][51] and lasted until 11 June 1999.[52] It was fought by the forces of the Federal Republic of Yugoslavia (i.e. Serbia and Montenegro), which controlled Kosovo before the war, and the Kosovo Albanian rebel group known as the Kosovo Liberation Army (KLA), with air support from the North Atlantic Treaty Organisation (NATO) from 24 March 1999, and ground support from the Albanian army."]],
    ["UnitedStates1846", ["Mexican-American War", "In the Mexican CAmerican War 1846 C48, the U.S. Army under Generals Zachary Taylor and Winfield Scott and others, invaded and after a series of victorious battles (and no major defeats) seized New Mexico and California, and also blockaded the coast, invaded northern Mexico, and invaded central Mexico, capturing the national capital. The peace terms involved American purchase of the area from California to New Mexico for $10 million."]],
    ["UnitedStates1861", ["American Civil War", "Long-building tensions between the Northern and Southern States over slavery suddenly reached a climax after the 1860 election of Abraham Lincoln of the new anti-slavery Republican Party as U.S. President. Southern states seceded from the U.S. and formed a separate Confederacy. Within the Confederate states, many U.S. forts with garrisons still loyal to the Union were cut off. Fighting started in 1861 when Fort Sumter was fired upon"]],
    ["UnitedStates1910", ["Border War", "The Mexican Revolution involved a civil war with hundreds of thousands of deaths and large numbers fleeing combat zones. Tens of thousands fled to the U.S. President Wilson sent U.S. forces to occupy the Mexican city of Veracruz for six months in 1914."]],
    ["UnitedStates1917", ["World War I", "The American entry into World War I came in April 1917, after more than two and a half years of efforts by President Woodrow Wilson to keep the United States out of the war."]],
    ["UnitedStates1941", ["World War II", "American involvement in World War II in 1940 C41 was limited to providing war material and financial support to Britain, the Soviet Union, and the Republic of China. The U.S. entered officially on 8 December 1941 following the Japanese attack on Pearl Harbor, Hawaii. Japanese forces soon seized American, Dutch, and British possessions across the Pacific and Southeast Asia, with Hawaii and Australia serving as the main staging points for the eventual liberation of these territories"]],
    ["UnitedStates1950", ["Korean War", "The Korean War was a conflict between the United States and its United Nations allies and the communist powers under influence of the Soviet Union and the People's Republic of China. The principal combatants were North and South Korea."]],
    ["UnitedStates1964", ["Vietnam War", "The Vietnam War was a war fought between 1955 and 1975 on the ground in South Vietnam and bordering areas of Cambodia and Laos (see Secret War) and in the strategic bombing (see Operation Rolling Thunder) of North Vietnam. American advisors came in the late 1950s to help the RVN (Republic of Vietnam) combat Communist insurgents known as \'Viet Cong.\' Major American military involvement began in 1964, after Congress provided President Lyndon B. Johnson with blanket approval for presidential use of force in the Gulf of Tonkin Resolution."]],
    ["UnitedStates1990", ["Persian Gulf War", "The Persian Gulf War was a conflict between Iraq and a coalition force of 34 nations led by the United States. The lead up to the war began with the Iraqi invasion of Kuwait in August 1990 which was met with immediate economic sanctions by the United Nations against Iraq."]],
    ["UnitedStates2014", ["Syrian and Iraqi intervention", "An American-led intervention in Iraq started on 15 June 2014, when President Barack Obama ordered United States forces to be dispatched to the region, in response to offensives in Iraq conducted by the Islamic State of Iraq and the Levant (ISIL). At the invitation of the Iraqi government, American troops went to assess Iraqi forces and the threat posed by ISIL"]]

    ])
// colors
var colorMap = new Map([
    ["UnitedStates", d3.rgb(205,194,211)],
    ["UnitedKingdom", d3.rgb(139,131,157)],
    ["China", d3.rgb(181,197,184)],
    ["Japan", d3.rgb(137,150,167)],
    ["Canada", d3.rgb(199,202,217)],
    ["Germany", d3.rgb(150,165,142)],
    ["France", d3.rgb(183,197,180)],
    ["Russia", d3.rgb(169,122,132)]
    ])

// copy of all data file list
var dynamicFileList = allDataFileList.slice();

// draw graph
function plot() {


    // set a responsive window that can zoom in and out
    // set responsive comes from https://stackoverflow.com/questions/13632169/using-viewbox-to-resize-svg-depending-on-the-window-size
    var svg = d3.select(".svg-container")
    .append("svg")
    .attr("viewBox", "0 0 " + pageWidth.toString() + " " + pageHeight.toString())
    .attr("preserveAspectRatio", "xMinYMin meet")
    // zoom in and out comes from https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(d3.zoom().on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
    .append("g");

    // draw x-axis and y-axis responsive
    var xScale = d3.scaleTime().range([0, width]).domain([minX, maxX]);
    var yScale = d3.scaleLinear().range([height, 0]).domain([minY, maxY]);
    var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format(".0f"));
    var yAxis = d3.axisLeft().scale(yScale);
    //
    drawAxes(svg, xAxis, yAxis)


    //draw lines
    for (i = 0; i < 8; i++) {
        drawLine(i, svg, xScale, yScale)
    }
    //draw circles: historical events
    for (j = 0; j < 8; j++) {
        drawCircle(j, svg, xScale, yScale)
    }
    //draw legends
    for (k = 0; k < 8; k++) {
        drawLegend(k, svg, xScale, yScale)
    }
}

// draw x-axis and y-axis
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
    .text('% of total GDP spent on military purpose')

    svg.append('text')
    .attr('class', 'label')
    .attr('x', width/2)
    .attr('y', 575)
    .attr('text-anchor', 'middle')
    .text('Years')
}

// draw lines
function drawLine (index, svg, x, y) {
    var filename = allDataFileList[index];
    var id = filenameToId(filename);
    var color = colorMap.get(filenameToId(filename));

    // draw color shade below the line
    var area = d3.area()
    .x(function(d) { return x(d.Year); })
    .y0(height)
    .y1(function(d) { return y(d.MilitaryExpenditure); });

    var line = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.MilitaryExpenditure); });



    d3.csv(filename).then(function(data) {
        // format the data

        data.forEach(function(d) {
            d.Year = d.Year;
            d.MilitaryExpenditure = +d.MilitaryExpenditure;
        });


        var path = svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "line" + id)
        .attr("stroke", color)
        .attr("stroke-width", 0)
        .attr("d", line)
        .on("mouseover", lineMouseOverHandler)
        .on("mouseout", lineMouseOutHandler)



        svg.append("path")
        .data([data])
        .attr("class", "area")
        .attr("id", "area" + id)
        .attr("fill", color)
        .attr("opacity", 0.3)
        .attr("d", area)
        .on("mouseover", areaMouseOverHandler)
        .on("mouseout", areaMouseOutHandler)

        animateLine(path)

    });
}

// grey out other lines when hovering over a specific line
function turnOff(id) {
    d3.select("#line" + id).attr("stroke", "grey").attr("opacity", 0.2)
    d3.selectAll(".circle" + id).attr("fill", "grey").attr("opacity", 0.2)
    d3.select("#area" + id).attr("fill", "grey").attr("opacity", 0.1)
}
// undo the grey out
function turnOn(id, color) {
    d3.select("#line" + id).attr("stroke", color).attr("opacity", 1)
    d3.selectAll(".circle" + id).attr("fill", color).attr("opacity", 1)
    d3.select("#area" + id).attr("fill", color).attr("opacity", 0.3)
}
// do the animation
// i copyed this from https://stackoverflow.com/questions/13973267/how-do-i-animate-a-line-using-d3-js
function animateLine(path) {
    var totalLength = path.node().getTotalLength();
    path.attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(3000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
}
// draw historical events
function drawCircle(index, svg, x, y) {
    var eventsFileName = eventsFileList[index];
    var color = colorMap.get(filenameToId(eventsFileName));

    d3.csv(eventsFileName).then(function(data) {
        // format the data
        data.forEach(function(d) {
            d.Year = d.Year;
            d.MilitaryExpenditure = +d.MilitaryExpenditure;
        });
        // draw circle
        svg.selectAll(".circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle" + filenameToId(eventsFileName))
        .attr("id", function(d) {
            return filenameToId(eventsFileName) + d.Year;
        })
        .attr("r", radius)
        .attr("fill", color)
        .attr("cx", function(d) {
            return x(d.Year)
        })
        .attr("cy", function(d) {
            return y(d.MilitaryExpenditure)
        })
        //when hovering over, enlarge the circle
        .on("mouseover", function() {
            d3.select(this).attr("r", radius*2)
        })
        .on("mouseout", function() {
            d3.select(this).attr("r", radius)
        })
        .on("click", circleClickHandler)
    });
}
// pop up window displaying information
function circleClickHandler() {
    var title = descriptionMap.get(this.id)[0]
    var info = descriptionMap.get(this.id)[1]
    alert(title + "\n" + info)
}

// draw legends: turning on and off when clicking
function drawLegend(index, svg, x, y) {
    var filename = allDataFileList[index]
    var color = colorMap.get(filenameToId(filename));
    var eventsFileName = eventsFileList[index];
    var id = filenameToId(eventsFileName)


    svg.append("circle")
    .attr("cx", width)
    .attr("cy", -100 + index * 60)
    .attr("r", 20)
    .attr("id", "legend" + filenameToId(eventsFileName))
    .attr("stroke", color)
    .attr("stroke-width", 8)
    .attr("fill", color)
    .on("click", function() {
        // get opacity
        var opacity = d3.select("#line" + id).attr("opacity")
        // if opacity equals to 1, then means the layer is on
        if (opacity == 1) {
            // turn off layer: line, area, circle
            var i = dynamicFileList.indexOf(IdToAllDataFilename(id))
            dynamicFileList.splice(i, 1);


            d3.select("#legend" + id)
            .attr("fill", "white")

            d3.select("#line" + id)
            .attr("opacity", 0)
            .on('mouseover', null)
            .on('mouseout', null)

            d3.selectAll(".circle" + id)
            .attr("opacity", 0)
            .on('mouseover', null)
            .on('mouseout', null)
            .on('click', null)

            d3.select("#area" + id).attr("opacity", 0)
            .on('mouseover', null)
            .on('mouseout', null)

        } else {
            // turn on
            dynamicFileList.push(IdToAllDataFilename(id))

            d3.select("#legend" + id)
            .attr("fill", color)

            d3.select("#line" + id)
            .attr("opacity", 1)
            .on('mouseover', lineMouseOverHandler)
            .on('mouseout', lineMouseOutHandler)

            d3.selectAll(".circle" + id)
            .attr("opacity", 1)
            .on('mouseover', circleMouseOverHandler)
            .on('mouseout', circleMouseOutHandler)
            .on('click', circleClickHandler)

            d3.select("#area" + id)
            .attr("opacity", 0.3)
            .on('mouseover', areaMouseOverHandler)
            .on('mouseout', areaMouseOutHandler)

        }


    })
    // annotation
    svg.append("text")
    .attr("x", width + 40)
    .attr("y", -90 + index * 60)
    .text(id)
    .style("font-size", "20px")
}

// when hovering over the line, highlight
function lineMouseOverHandler() {
    for (i = 0; i < dynamicFileList.length; i++) {
        var id = filenameToId(dynamicFileList[i]);
        if ("line" + id != this.id) {
            turnOff(filenameToId(dynamicFileList[i]));
        }
    }
}
// when the mouse leaves the line, go back to default
function lineMouseOutHandler() {
    for (i = 0; i < dynamicFileList.length; i++) {
        var id = filenameToId(dynamicFileList[i]);
        if ("line" + id != this.id) {
            turnOn(filenameToId(dynamicFileList[i]), colorMap.get(id));

        }
    }
}

function areaMouseOverHandler() {
    for (i = 0; i < dynamicFileList.length; i++) {
        var id = filenameToId(dynamicFileList[i]);
        if ("area" + id != this.id) {
            turnOff(filenameToId(dynamicFileList[i]));

        }
    }
}

function areaMouseOutHandler() {
    for (i = 0; i < dynamicFileList.length; i++) {
        var id = filenameToId(dynamicFileList[i]);
        if ("area" + id != this.id) {
            turnOn(filenameToId(dynamicFileList[i]), colorMap.get(id));
        }
    }
}

// change file name to country name
function filenameToId(filename) {
    var index1 = filename.indexOf("_");
    var index2 = filename.indexOf(".");
    return filename.slice(index1+1, index2);
}

// change country name to file name
function IdToAllDataFilename(id) {
    return "allData_" + id + ".csv";
}


