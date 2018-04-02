function dailyChart(daily_avg_market_price_data, daily_max_quantity_data) {
    //console.log(hourly_data_quantity.toString());
    Highcharts.chart('daily-chart', {
      chart: {
        zoomType: 'x'
      },
      rangeSelector: {
        enabled: true,
        inputEnabled: false,
        allButtonsEnabled: true,
        buttons: [{
          type: 'week',
          count: 1,
          text: '1w'
        },{
          type: 'month',
          count: 1,
          text: '1m'
        },{
          type: 'month',
          count: 3,
          text: '3m'
        },{
          type: 'ytd',
          count: 1,
          text: 'YTD'
      },{
          type: 'year',
          count: 1,
          text: '1y'
      }],
        buttonTheme: {
          width: 60
        },
        selected: 1
      },
      title: {
        text: 'Daily chart data'
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
          text: 'Max quantity'
        },
        min: 0,
        //gridLineWidth: 1,
        allowDecimals: false,
        opposite: true
      }, {
        gridLineWidth: 0,
        title: {
          text: 'Avg market price'
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
        name: 'Avg market price',
        yAxis: 1,
        data: daily_avg_market_price_data
      },{
        type: 'line',
        name: 'Max quantity',
        yAxis: 0,
        data: daily_max_quantity_data
      }]
    });
    $('#daily-chart').show();
  }