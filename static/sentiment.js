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
var config;

function doSomethingWithData() {
  console.log(sentiment_pos);
  console.log(sentiment_neg);
}

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
  doSomethingWithData();


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

var dataset1_full = {
            label: "Positive Sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(174, 143, 64)',
            borderWidth: 0,
            data: sentiment_pos,
        };

var dataset2_full = {
            label: "Negative Sentiment",
            backgroundColor: 'rgb(12, 35, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 0,
            data: sentiment_neg,
        };

var dataset_harry = {
            label: "Harry's cumulative sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Harry,
        };

var dataset_ron = {
            label: "Ron's cumulative sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Ron,
        };

var dataset_hermione = {
            label: "Hermione's cumulative sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Hermione,
        };

var dataset_dumbledore = {
            label: "Dumbledore's cumulative sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Dumbledore,
        };

var dataset_voldemort = {
            label: "Voldemort's cumulative sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Voldemort,
        };

var dataset_snape = {
            label: "Snape's cumulative sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(12, 35, 64)',
            borderWidth: 1.5,
            data: Snape,
        };

var ctx = document.getElementById('myChart').getContext('2d');
var config_default = {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: pages_overall,
        datasets: [{
            label: "Positive Sentiment",
            backgroundColor: 'rgb(174, 143, 64)',
            borderColor: 'rgb(174, 143, 64)',
            borderWidth: 0,
            data: sentiment_pos,
        },
        {
            label: "Negative Sentiment",
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
        }
    }
};

var config = config_default;
var sentimentChart = new Chart(ctx, config);

document.getElementById('books').addEventListener('click', function() {
    var elements = document.getElementsByClassName('btn');
    Array.prototype.forEach.call(elements, function(x) {
        x.classList.remove("btn-primary");
        x.classList.add("btn-default");
    })
    var element = document.getElementById('books');
    element.classList.remove("btn-default");
    element.classList.add("btn-primary");
    config.data.datasets.splice(0,2)
    config.data.datasets.push(dataset1_full);
    config.data.datasets.push(dataset2_full);
    config.options.title.text = 'Harry Potter Sentiment Analysis (100-page moving average)';
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
    config.data.datasets.splice(0,2)
    config.data.datasets.push(dataset_harry);
    config.options.title.text = 'Cumulative Sentiment (for pages Harry appears on)';
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
    config.data.datasets.splice(0,2)
    config.data.datasets.push(dataset_ron);
    config.options.title.text = 'Cumulative Sentiment (for pages Ron appears on)';
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
    config.data.datasets.splice(0,2)
    config.data.datasets.push(dataset_hermione);
    config.options.title.text = 'Cumulative Sentiment (for pages Hermione appears on)';
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
    config.data.datasets.splice(0,2)
    config.data.datasets.push(dataset_dumbledore);
    config.options.title.text = 'Cumulative Sentiment (for pages Dumbledore appears on)';
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
    config.data.datasets.splice(0,2)
    config.data.datasets.push(dataset_voldemort);
    config.options.title.text = 'Cumulative Sentiment (for pages Voldemort appears on)';
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
    config.data.datasets.splice(0,2)
    config.data.datasets.push(dataset_snape);
    config.options.title.text = 'Cumulative Sentiment (for pages Snape appears on)';
    sentimentChart.update();
    console.log(config);
});

})