var width = 1750;
var height = 7750;

// Define the margins of the chart
var margin = { top: 185, right: 50, bottom: 50, left: 75 };

// Calculate the dimensions of the chart by subtracting the margin on either side from the width and height of the SVG container
var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;



// d3.json("/full", bars(data))

// designate categories for filter
var initial = ["Harry Potter", "Ronald Weasley", "Hermione Granger", "Albus Dumbledore", "Voldemort", "Severus Snape", "Sirius Black", "Rubeus Hagrid"]
var gryffindor = ["Harry Potter", "Ronald Weasley", "Hermione Granger", "George Weasley", "Fred Weasley", "Ginny Weasley", "Lavender Brown", "Parvati Patil", "Seamus Finnegan", "Neville Longbottom", "Dean Thomas",
                "Cormac McLaggen", "Katie Bell", "Lee Jordan", "Angelina Johnson", "Alicia Spinnet", "Percy Weasley", "Oliver Wood", "Dennis Creevey", "Colin Creevey", "Romilda Vane"]
var slytherin = ["Draco Malfoy", "Vincent Crabbe", "Gregory Goyle", "Pansy Parkinson", "Blaise Zabini", "Marcus Flint"]
var ravenclaw = ["Padma Patil", "Michael Corner", "Anthony Goldstein", "Terry Boot", "Cho Chang", "Penelope Clearwater", "Luna Lovegood", "Roger Davies"]
var hufflepuff = ["Cedric Diggory", "Hannah Abbott", "Susan Bones", "Ernie Macmillan", "Zacharias Smith",  "Justin Finch-Fletchley"]
var staff = ["Albus Dumbledore", "Minerva McGonagall", "Rubeus Hagrid", "Severus Snape", "Remus Lupin", "Dolores Umbridge", "Cuthbert Binns", "Pomona Sprout", "Filius Flitwick", "Sybill Trelawney", "Quirinus Quirrell",
            "Gilderoy Lockhart", "Poppy Pomfrey", "Rolanda Hooch", "Wilhelmina Grubby-Plank", "Horace Slughorn", "Argus Filch"]
var ootp = ["Alastor Moody", "Charlie Weasley", "Bill Weasley", "Nymphadora Tonks", "Molly Weasley", "Arthur Weasley", "Kingsley Shacklebolt", "Aberforth Dumbledore", "Elphias Doge", "Olympe Maxime", "Fleur Delacour",
            "Arabella Figg", "Ted Tonks", "Andromeda Tonks", "Dedalus Diggle"]
var characterSearch = []
var ministry = ["Barty Crouch Sr.", "Rufus Scrimgeour", "Cornelius Fudge", "Ludo Bagman", "Pius Thicknesse", "Amelia Bones"]
var othermag = ["Dobby", "Firenze", "Bane", "Aragog", "Kreacher", "Winky"]
var nomag = ["Vernon Dursley", "Petunia Dursley", "Dudley Dursley"]
var deatheaters = ["Voldemort", "Barty Croach Jr.", "Lucius Malfoy", "Bellatrix Lestrange", "Peter Pettigrew", "Theodore Nott", "Antonin Dolohov", "Fenrir Greyback", "Augustus Rookwood", "Igor Karkaroff"]

var category = "Initial"

var lines = [1, 17, 35, 57, 94, 132, 161, 199]

var sslines = []
var coslines = []
var poalines = []
var goflines = []
var ootplines = []
var hbplines = []
var dhlines = []

var data;

// function doSomethingWithData() {
//   console.log(data)
//   init(data);
// }

d3.json("/full", function(jsondata) {
  data = jsondata;
  init(data);
//   doSomethingWithData();
})

function bars(data, category)
{     


    max = 199

    var barsLength = data.length
    
    console.log(barsLength)

    //scales
    scale = d3.scale.linear()
        .domain([0, 199])
        .range([0, chartWidth]);

    y = d3.scale.ordinal()
        .domain(data.map(function(d){
            return d.character;
        }))
        .rangeBands([0, chartHeight], .2)

    var div = d3.select("body").append("div").attr("class", "toolTip");

    var borderRadiusX = 10;
    
    var borderRadiusY = (10);

    var svg = d3.select("svg")
    // var chartWidth = width - margin.left - margin.right;
    // var chartHeight = ((data.length)*75) - margin.top - margin.bottom;
    //drawing grid lines
    // var bar_height = h - padding;
    svg.append("svg:g")
        .attr("class", "lines")
        .selectAll("line")
        //.data(xScale.ticks(15))//FIXME
        //use your specified lines as data
        .data(lines)
        .enter().append("line")
        .attr("x1", function(d) { return scale(d) + 75; })
        .attr("x2", function(d) { return scale(d) + 75; })
        .attr("y1", 5)
        // .attr("y2", 7750);
        // next line variable on margin + number of bars
        .attr("y2", function() { return (barsLength * 75) + 150});
        

    var vis = d3.select("#barchart")

    var bars = vis.selectAll("rect.bar")
        .data(data)

    var avatars = vis.selectAll("image.avatar")
        .data(data)

    var avatarBorders = vis.selectAll("circle")
        .data(data)

    var grid = vis.select("grid")
        .data(data)
 
    //update
    bars
        .attr("fill", function(d){
            if (category == 'Gryffindor') { 
                return "gold";
            }
            if (category == 'Slytherin') { 
                return "green";
            }
            if (category == 'Ravenclaw') { 
                return "rgb(25,25,112)";
            }
            if (category == 'Hufflepuff') { 
                return "black";
            }
            if (category == 'Staff') { 
                return "maroon";
            }
            if (category == 'DeathEaters') { 
                return "rgb(0,100,0)";
            }
            if (category == 'Order') { 
                return "rgb(255,69,0)";
            }
            if (category == 'Ministry') { 
                return "rgb(210,180,140)";
            }
            if (category == 'NoMag') { 
                return "white";
            }
            if (category == 'OtherMag') { 
                return "rgb(135,206,250)";
            }
            if (category == 'Initial') { 
                return "rgb(12, 35, 64)";
            }
            else {
                return "rgb(12, 35, 64)";
            }
        })
        .attr("stroke", function(d){
            if (category == 'Gryffindor') { 
                return "maroon";
            }
            if (category == 'Slytherin') { 
                return "black";
            }
            if (category == 'Ravenclaw') { 
                return "rgb(218,165,32)";
            }
            if (category == 'Hufflepuff') { 
                return "yellow";
            }
            if (category == 'Staff') { 
                return "white";
            }
            if (category == 'DeathEaters') { 
                return "black";
            }
            if (category == 'Order') { 
                return "rgb(255,215,0)";
            }
            if (category == 'Ministry') { 
                return "rgb(127,255,212)";
            }
            if (category == 'NoMag') { 
                return "black";
            }
            if (category == 'OtherMag') { 
                return "rgb(0,0,128)";
            }
            if (category == 'Initial') { 
                return "rgb(174, 143, 64)";
            }
            else {
                return "rgb(174, 143, 64)";
            }
        })
        .style("width", function (d) {
            return scale(d.last_appearance - d.first_appearance);}
        )
        .attr({ry : borderRadiusX, rx : borderRadiusY })
        // tooltips (moved to avatars)
        
    avatars
        
    avatarBorders

    //enter
    bars.enter()
        .append("svg:rect")
        .attr("class", "bar")
        //first appearance of bars no matter what, why the first click is currently outputting here
        .attr("fill", function(d){
            if (category == 'Gryffindor') { 
                return "gold";
            }
            if (category == 'Slytherin') { 
                return "green";
            }
            if (category == 'Ravenclaw') { 
                return "rgb(25,25,112)";
            }
            if (category == 'Hufflepuff') { 
                return "black";
            }
            if (category == 'Staff') { 
                return "maroon";
            }
            if (category == 'DeathEaters') { 
                return "rgb(0,100,0)";
            }
            if (category == 'Order') { 
                return "rgb(255,69,0)";
            }
            if (category == 'Ministry') { 
                return "rgb(210,180,140)";
            }
            if (category == 'NoMag') { 
                return "white";
            }
            if (category == 'OtherMag') { 
                return "rgb(135,206,250)";
            }
            if (category == 'Initial') { 
                return "rgb(12, 35, 64)";
            }
            else {
                return "rgb(12, 35, 64)";
            }
        })
        .attr("stroke", function(d){
            if (category == 'Gryffindor') { 
                return "maroon";
            }
            if (category == 'Slytherin') { 
                return "black";
            }
            if (category == 'Ravenclaw') { 
                return "rgb(218,165,32)";
            }
            if (category == 'Hufflepuff') { 
                return "yellow";
            }
            if (category == 'Staff') { 
                return "white";
            }
            if (category == 'DeathEaters') { 
                return "black";
            }
            if (category == 'Order') { 
                return "rgb(255,215,0)";
            }
            if (category == 'Ministry') { 
                return "rgb(127,255,212)";
            }
            if (category == 'NoMag') { 
                return "black";
            }
            if (category == 'OtherMag') { 
                return "rgb(0,0,128)";
            }
            if (category == 'Initial') { 
                return "rgb(174, 143, 64)";
            }
            else {
                return "rgb(174, 143, 64)";
            }
        })
        .style("width", function (d) {
            return scale(d.last_appearance - d.first_appearance);}
        )
        .attr({ry : borderRadiusX, rx : borderRadiusY })
        // tooltips
        // .on("mousemove", function(d){
        //     div.style("left", d3.event.pageX+10+"px");
        //     div.style("top", d3.event.pageY-25+"px");
        //     div.style("display", "inline-block");
        //     div.html("<img src=../static/images/avatar/albusdumbledore.png id='avatar' style='width: 100px;' style='border-right: solid 1px #000;'> <h4 id='tooltip-header'>" + (d.character) + "</h4>"+"<hr>"+(d.house));
        // })
        // .on("mouseout", function(d){
        //     div.style("display", "none");
        // })

    avatars.enter()
        .append("svg:image")
        .attr('class', 'avatar')
        .attr("transform", function(data,i) {
            return "translate(" + [scale(data.first_appearance), (i*70) - 15] + ")"
        })
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html("<h4>" + d.full_name.toUpperCase() + "</h4><hr><p>First Appearance: " + (d.first_appearance) + "</p><p>Last Appearance: " + (d.last_appearance) + "</p><hr><p>House: " + (d.house) + "</p><p>Blood Status: " + (d.blood_status) + "</p><p>Species: " + (d.species) + "</p>");
        })
        .on("mouseout", function(d){
            div.style("display", "none");
        });

    avatarBorders.enter()
        .append("svg:circle")
        .attr("class", "avatar-border")
        .attr("transform", function(data,i) {
            return "translate(" + [scale(data.first_appearance), (i*70) - 15] + ")"
        })

    //exit 
    bars.exit()
        //this just changes where the bars enter from
        //.attr("transform", function(d) {
        //    return "translate(" + (d.value1) + ",0)";
        //})
        .attr("transform", "translate(0, 0)")
        .transition()
        .duration(100)
        .ease("exp")
        .attr("width", 0)
        .remove()

    avatars.exit()
        .attr("transform", "translate(1750, 0)")
        .transition()
        .duration(300)
        .ease("exp")
        .attr("width", 0)
        .remove()

    avatarBorders.exit()
        .attr("transform", "translate(1750, 0)")
        .transition()
        .duration(300)
        .ease("exp")
        .attr("width", 0)
        .remove()

    //overall bar attributes 
    bars
        .attr("stroke-width", 4)
        .attr("transform", "translate(0, 0)")
        .transition()
        .duration(300)
        .ease("quad")
        .attr("height", 20)
        .attr("transform", function(d,i) {
            console.log(d)
            return "translate(" + [scale(d.first_appearance), (i*70)] + ")"
        })
        // .attr("transform", function(d,i) {
            // return "translate(" + [d.value1, ((40*i)+50)] + ")"
        // })

    avatars
        .attr("xlink:href", function(d) {
            return d.image_url
        })
        // function(d) {
        // console.log(data)
        // return (d.image_url)})
        .attr("transform", "translate(0, 0)")
        .transition()
        .duration(300)
        .ease("quad")
        .attr('height', '50')
        .attr('width', '50')
        .attr("x", 0)
        .attr("y", 0)
        .attr('background', 'red')
        .attr("transform", function(data,i) {
            return "translate(" + [scale(data.first_appearance), (i*70) - 15] + ")"
        })
        console.log(data)

    avatarBorders
        .attr("stroke",  "black")
        .attr("stroke-width", "3px")
        .attr("transform", "translate(0, 0)")
        .transition()
        .duration(300)
        .ease("quad")
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 25)
        .attr("fill", "none")
        .attr("transform", function(d,i) {
            return "translate(" + [scale(d.first_appearance), (i*70) - 15] + ")"
        })
    }

//add other paths
function select(category) {
    bars(data.filter(function(d){
        if (category == 'Initial') {
            // d3.select("g.lines").remove() 
            characterSearch = []     
            return initial.indexOf(d.character) !== -1;
        }
        if (category == 'Gryffindor') {
            characterSearch = []     
            return gryffindor.indexOf(d.character) !== -1;
        }
        if (category == 'Slytherin') {
            characterSearch = []
            return slytherin.indexOf(d.character) !== -1;
        }
        if (category == 'Hufflepuff') {
            characterSearch = []
            return hufflepuff.indexOf(d.character) !== -1;
        }
        if (category == 'Ravenclaw') {
            characterSearch = []
            return ravenclaw.indexOf(d.character) !== -1;
        }
        if (category == 'Staff') {
            characterSearch = []
            return staff.indexOf(d.character) !== -1;
        }
        if (category == 'DeathEaters') {
            characterSearch = []
            return deatheaters.indexOf(d.character) !== -1;
        }
        if (category == 'Order') {
            characterSearch = []
            return ootp.indexOf(d.character) !== -1;
        }
        if (category == 'Ministry') {
            characterSearch = []
            return ministry.indexOf(d.character) !== -1;
        }
        if (category == 'NoMag') {
            characterSearch = []
            return nomag.indexOf(d.character) !== -1;
        }
        if (category == 'OtherMag') {
            characterSearch = []
            return othermag.indexOf(d.character) !== -1;
        }
        else {
            characterSearch = []
            return initial.indexOf(d.character) !== -1;
        }
    }), category);  
}

function init(data) {

    // var data;
    
    // function doSomethingWithData() {
    //   console.log(data);
    // }
    
    // d3.json("/full", function(jsondata) {
    //   data = jsondata;
    //   doSomethingWithData();
    // })

    var xScale = d3.scale.linear()
        .domain([0, 199])
        .range([0, chartWidth]);

    // The axis uses the above scale and the same domain:
     var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        //change to book images
        .tickValues(lines)
        .tickFormat(d3.format("s"));

    //setup the svg
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("svg:rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "none")
        .attr("transform", "translate(100,0)");

    svg.append("svg:g")
        .attr("height", chartHeight)
        .attr("width", chartWidth)
        .attr("id", "barchart")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //Create X axis
    svg.append("svg:g")
        .attr("class", "axis-x")
        .attr("transform", "translate(75,500)")
        //following draws the axis, just want the gridlines
        //.call(xAxis)

    svg.append("svg:image")
        .attr("class", "book-image")
        .attr("id", "ss_switch")
        .attr("title", "Harry Potter and the Sorceror's Stone")
        .attr("xlink:href",  "../static/images/ssgif.png")
        .attr("x", 95)
        .attr("y", 5)
        .attr("height", 150)

    svg.append("svg:image")
        .attr("class", "book-image")
        .attr("id", "cos_switch")
        .attr("title", "Harry Potter and the Chamber of Secrets")
        .attr("xlink:href",  "../static/images/cos.gif")
        .attr("x", 235)
        .attr("y", 5)
        .attr("height", 150)

    svg.append("svg:image")
        .attr("class", "book-image")
        .attr("id", "poa_switch")
        .attr("title", "Harry Potter and the Prisoner of Azkaban")
        .attr("xlink:href",  "../static/images/poa.gif")
        .attr("x", 400)
        .attr("y", 5)
        .attr("height", 150)

    svg.append("svg:image")
        .attr("class", "book-image")
        .attr("id", "gof_switch")
        .attr("title", "Harry Potter and the Goblet of Fire")
        .attr("xlink:href",  "../static/images/gof.gif")
        .attr("x", 635)
        .attr("y", 5)
        .attr("height", 150)

    svg.append("svg:image")
        .attr("class", "thumbnail book-image")
        .attr("id", "ootp_switch")
        .attr("title", "Harry Potter and the Order of the Phoenix")
        .attr("xlink:href",  "../static/images/ootp.gif")
        .attr("x", 950)
        .attr("y", 5)
        .attr("height", 150)

    svg.append("svg:image")
        .attr("class", "book-image")
        .attr("id", "hbp_switch")
        .attr("title", "Harry Potter and the Half-Blood Prince")
        .attr("xlink:href",  "../static/images/hbp.gif")
        .attr("x", 1220)
        .attr("y", 5)
        .attr("height", 150)

    svg.append("svg:image")
        .attr("class", "book-image")
        .attr("id", "dh_switch")
        .attr("title", "Harry Potter and the Deathly Hallows")
        .attr("xlink:href",  "../static/images/dh.gif")
        .attr("x", 1495)
        .attr("y", 5)
        .attr("height", 150)
    
       //setup our ui
    d3.select("#gryffindor")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Gryffindor')
        })   
    d3.select("#slytherin")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Slytherin')
        })   
    d3.select("#ravenclaw")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Ravenclaw')
        })
    d3.select("#hufflepuff")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Hufflepuff')
        })
    d3.select("#staff")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Staff')
        }) 
    d3.select("#order")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Order')
        }) 
    d3.select("#ministry")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Ministry')
        })
    d3.select("#nomag")
        .on("click", function() {
            d3.select('.lines').remove()
            select('NoMag')
        }) 
    d3.select("#othermag")
        .on("click", function() {
            d3.select('.lines').remove()
            select('OtherMag')
        }) 
    d3.select("#deatheaters")
        .on("click", function() {
            d3.select('.lines').remove()
            select('DeathEaters')
        })      
    d3.select("#main")
        .on("click", function() {
            d3.select('.lines').remove()
            select('Initial')
        })
    // d3.select('#ss_switch') 
    //     .on("click", function() {
    //         // bookSwitch()
    //         select('Initial')
    //     })
    // d3.select('#cos_switch') 
    //     .on("click", function() {
    //         // bookSwitch()
    //         select('Initial')
    //     })
    // d3.select('#poa_switch') 
    //     .on("click", function() {
    //         // bookSwitch()
    //         select('Initial')
    //     })
    // d3.select('#gof_switch') 
    //     .on("click", function() {
    //         // bookSwitch()
    //         select('Initial')
    //     })
    // d3.select('#ootp_switch') 
    //     .on("click", function() {
    //         // bookSwitch()
    //         select('Initial')
    //     })
    // d3.select('#hbp_switch') 
    //     .on("click", function() {
    //         // bookSwitch()
    //         select('Initial')
    //     })
    // d3.select('#dh_switch') 
    //     .on("click", function() {
    //         // bookSwitch()
    //         select('Initial')
    //     })
    d3.select('.add_character')
        .on("click", function() {
            d3.select('.lines').remove()
            input = document.getElementById('searchBar').value.toUpperCase();
            // filter = input.value.toUpperCase();
            console.log(input)
            addCharacter(input)
        })

    //make the bars
    //investigate 
    console.log(data)
    // if (data === undefined) {
    //     console.log("here")
    //     window.location.reload(true);
    // }
    // else {
    bars(data.sort(function (a, b) {
        return ((b.last_appearance - b.first_appearance)- (a.last_appearance - a.first_appearance));
      }))
}

function addCharacter(input) {
    characterSearch.push(input)
    console.log(characterSearch)
    console.log(gryffindor)
    category = 'Initial'
    bars(data.filter(function(d) {     
        return characterSearch.indexOf(d.character.toUpperCase()) !== -1;}), category)
    // this is sending an array of arrays
    // at end send updated data and "initial" coloring
    // reset data when another button is clicked?
}

function bookSwitch(book) {
    //remove buttons
    //add button that uses init() (probably direct to the initial timeline page actually since I didnt add the button using d3)
    //conditional routing
        //remove other book images, move book to middle
        //pull from right api route
        //send to new bar function
    //create bars, lines for chapters, circles, tooltips, etc. 

}