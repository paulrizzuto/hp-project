// Initial variables outside of main function
var data;
var pages_overall;
var book_names;
var sentiment_100;
var Dumbledore;
var Snape;
var Harry;
var Voldemort;
var chapter_names;
var sentiment_pos;
var sentiment_neg;
var Ron;
var Hermione;
var trendline;
var config;
var yticks_full;
var yticks_character;

// API request (function holds everything below)
d3.json("/senti", function(jsondata) {
  data = jsondata;
  pages_overall = data[0];
  book_names = data[1];
  sentiment_100 = data[2];
  Dumbledore = data[3];
  Snape = data[4];
  Harry = data[5];
  Voldemort = data[6];
  chapter_names = data[7];
  sentiment_pos = data[8];
  sentiment_neg = data[9];
  Ron = data[10];
  Hermione = data[11];
  trendline = data[12];

// Code for filling chart area under the line
Chart.pluginService.register({
    beforeDraw: function (chart, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;

            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    }
});

// Dataset variables for switching between charts
var dataset1_full = {
            label: "Sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(174, 143, 64)',
            borderWidth: 0,
            data: sentiment_pos,
        };

var dataset2_full = {
            label: "Sentiment",
            backgroundColor: 'rgb(12, 35, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 0,
            data: sentiment_neg,
        };

var dataset_harry = {
            label: "Cumulative Sentiment",
            backgroundColor: 'rgba(174, 143, 64, 0.5)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Harry,
        };

var dataset_ron = {
            label: "Cumulative Sentiment",
            backgroundColor: 'rgba(174, 143, 64, 0.5)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Ron,
        };

var dataset_hermione = {
            label: "Cumulative Sentiment",
            backgroundColor: 'rgba(174, 143, 64, 0.5)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Hermione,
        };

var dataset_dumbledore = {
            label: "Cumulative Sentiment",
            backgroundColor: 'rgba(174, 143, 64, 0.5)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Dumbledore,
        };

var dataset_snape = {
            label: "Cumulative Sentiment",
            backgroundColor: 'rgba(174, 143, 64, 0.5)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Snape,
        };

var dataset_voldemort = {
            label: "Cumulative Sentiment",
            backgroundColor: 'rgba(174, 143, 64, 0.5)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Voldemort,
        };

// Set default chart settings + attach to canvas
var ctx = document.getElementById('myChart').getContext('2d');
var config_default = {

    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: pages_overall,
        datasets: [{
            label: "Sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(174, 143, 64)',
            borderWidth: 0,
            data: sentiment_pos,
        },
        {
            label: "Sentiment",
            backgroundColor: 'rgb(12, 35, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 0,
            data: sentiment_neg,
        }]
    },

    // Configuration options go here
    options: {
        elements: {
            point: {
                radius: 0
            }
        },
        chartArea: {
            backgroundColor: 'transparent'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    max: 4713,
                    min: 1,
                    maxTicksLimit: 12
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Page Number (in full series)',
                    fontSize: 14
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    max: 0.6,
                    min: -0.6,
                    maxTicksLimit: 8
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Sentiment',
                    fontSize: 14
                }
            }]
        },
        title: {
            display: true,
            text: 'Harry Potter Sentiment Analysis (100-page moving average)',
            fontSize: 20
        },
        legend: {
            display: false
        },
        tooltips: {
            bodyFontSize: 14,
            mode: 'nearest',
            intersect: false,
            callbacks: {
                title: function() {
                    return '';
                },
                beforeLabel: function(tooltipItem, data) { 
                    //return formatted date
                    return ["Book: " + book_names[(tooltipItem.xLabel)-1].replace("Harry Potter and the ", ""),
                    "Chapter: " + chapter_names[(tooltipItem.xLabel)-1]];
                }
            }
        }
    }
};

// Initialize chart
var config = config_default;
var sentimentChart = new Chart(ctx, config);
console.log(config);

// Chart switch functions based on button clicks
document.getElementById('books').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('books');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2);
    config.data.datasets.push(dataset1_full);
    config.data.datasets.push(dataset2_full);
    config.options.title.text = 'Harry Potter Sentiment Analysis (100-page moving average)';
    config.options.scales.yAxes[0].ticks.max = 0.6;
    config.options.scales.yAxes[0].ticks.min = -0.6;
    sentimentChart.update();
    console.log(config);
});

document.getElementById('harry').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('harry');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2);
    config.data.datasets.push(dataset_harry);
    config.options.title.text = 'Cumulative Sentiment (for pages Harry appears on)';
    config.options.scales.yAxes[0].ticks.max = 275;
    config.options.scales.yAxes[0].ticks.min = -150;
    sentimentChart.update();
    console.log(config);
});

document.getElementById('ron').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('ron');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2);
    config.data.datasets.push(dataset_ron);
    config.options.title.text = 'Cumulative Sentiment (for pages Ron appears on)';
    config.options.scales.yAxes[0].ticks.max = 275;
    config.options.scales.yAxes[0].ticks.min = -150;
    sentimentChart.update();
    console.log(config);
});

document.getElementById('hermione').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('hermione');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2);
    config.data.datasets.push(dataset_hermione);
    config.options.title.text = 'Cumulative Sentiment (for pages Hermione appears on)';
    config.options.scales.yAxes[0].ticks.max = 275;
    config.options.scales.yAxes[0].ticks.min = -150;
    sentimentChart.update();
    console.log(config);
});

document.getElementById('dumbledore').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('dumbledore');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2);
    config.data.datasets.push(dataset_dumbledore);
    config.options.title.text = 'Cumulative Sentiment (for pages Dumbledore appears on)';
    config.options.scales.yAxes[0].ticks.max = 275;
    config.options.scales.yAxes[0].ticks.min = -150;
    sentimentChart.update();
    console.log(config);
});

document.getElementById('snape').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('snape');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2);
    config.data.datasets.push(dataset_snape);
    config.options.title.text = 'Cumulative Sentiment (for pages Snape appears on)';
    config.options.scales.yAxes[0].ticks.max = 275;
    config.options.scales.yAxes[0].ticks.min = -150;
    sentimentChart.update();
    console.log(config);
});

document.getElementById('voldemort').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('voldemort');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2);
    config.data.datasets.push(dataset_voldemort);
    config.options.title.text = 'Cumulative Sentiment (for pages Voldemort appears on)';
    config.options.scales.yAxes[0].ticks.max = 275;
    config.options.scales.yAxes[0].ticks.min = -150;
    sentimentChart.update();
    console.log(config);
});

})
