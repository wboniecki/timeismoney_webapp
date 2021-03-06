function hourlyChart(daily_data_avg_market_price, daily_data_max_quantity) {
  //console.log(hourly_data_quantity.toString());
  Highcharts.chart('hourly-chart', {
    chart: {
      zoomType: 'x'
    },
    rangeSelector: {
      enabled: true,
      inputEnabled: false,
      allButtonsEnabled: true,
      buttons: [{
        type: 'day',
        count: 1,
        text: 'day',
        dataGrouping: {
            forced: true,
            units: [['day', [1]]]
        }
      },{
        type: 'week',
        count: 1,
        text: '1w',
        dataGrouping: {
            forced: true,
            units: [['week', [1]]]
        }
      },{
        type: 'all',
        count: 2,
        text: 'all'
    }],
      buttonTheme: {
        width: 60
      },
      selected: 2
    },
    title: {
      text: 'Hourly chart data'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%e-%b}'
      },
      tickInterval: 24 * 3600 * 1000,
    },
    yAxis: [{
      title: {
        text: 'Quantity'
      },
      min: 0,
      //gridLineWidth: 1,
      allowDecimals: false,
      opposite: true
    }, {
      gridLineWidth: 0,
      title: {
        text: 'Market price'
      },
      min: 0
    }],
    tooltip: {
      shared: true,
      crosshairs: [true]
    },
    legend: {
      enabled: true
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 0
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      },
      line: {
        marker: {
          radius: 0
        }
      }
    },

    series: [{
      type: 'area',
      name: 'Market price',
      yAxis: 1,
      data: daily_data_avg_market_price
    },{
      type: 'line',
      name: 'Quantity',
      yAxis: 0,
      data: daily_data_max_quantity
    }]
  });
  $('#hourly-chart').show();
}