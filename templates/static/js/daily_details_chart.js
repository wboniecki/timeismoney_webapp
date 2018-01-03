function dailyDetailsChart(daily_market_price_data, daily_avg_market_price, daily_quantity_data, daily_avg_quantity_data) {
    Highcharts.stockChart('daily-details-chart', {
        
            rangeSelector: {
                selected: 1,
                inputEnabled: false
            },

            plotOptions: {
                candlestick: {
                    color: 'rgba(144,238,126,0.3)',
                    lineColor: 'rgba(144,238,126,0.7)',
                    upColor: 'rgba(223, 83, 83, 0.3)',
                    upLineColor: 'rgba(223, 83, 83, 0.7)'
                },
                line: {
                    marker: {
                      radius: 0
                    },
                    color: 'rgba(170,238,238,0.7)'
                  }
            },
            tooltip: {
                formatter: function () {
                    var s = '<b>' + Highcharts.dateFormat('%a, %b %e, %Y', this.x) + '</b>';
                    s += '<br/>'
                    if (this.points[0].point.close > this.points[0].point.open) {
                        s += '<br/><span style="color: rgba(223, 83, 83, 1);">Open: ' + this.points[0].point.open + ' g</span>';
                    } else {
                        s += '<br/><span style="color: rgba(144,238,126,1);">Open: ' + this.points[0].point.open + ' g</span>';
                    }
                    s += '<br/>Max: ' + this.points[0].point.high + ' g';
                    s += '<br/><span style="color: rgba(170,238,238,1);">Avg: ' + this.points[1].point.y + ' g</span>';
                    s += '<br/>Min: ' + this.points[0].point.low + ' g';
                    if (this.points[0].point.close > this.points[0].point.open) {
                        s += '<br/><span style="color: rgba(223, 83, 83, 1);">Close: ' + this.points[0].point.close + ' g</span>';
                    } else {
                        s += '<br/><span style="color: rgba(144,238,126,1);">Close: ' + this.points[0].point.close + ' g</span>';
                    }
                    //s += '<br/>Close: ' + this.points[0].point.close + ' g';
                
                    return s;
                }
            },
        
            series: [{
                type: 'candlestick',
                name: 'USD to EUR',
                data: daily_market_price_data
            },{
                type: 'line',
                data: daily_avg_market_price,
            }],
            xAxis: {
                type: 'datetime',
                labels: {
                format: '{value:%e-%b}'
                },
                tickInterval: 24 * 3600 * 1000,
            },
            yAxis: {
                title: {
                  text: 'Price'
                },
                min: 0,
                allowDecimals: false,
                opposite: false
              },
            title: {
                text: 'Daily details chart data'
              },
            subtitle: {
                text: document.ontouchstart === undefined ?
                  'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
              },
        });
        $('#daily-details-chart').show();

        Highcharts.chart('daily-quantity-details-chart', {
            chart: {
                zoomType: 'x'
            },
    
            title: {
                text: 'Quantity variation by day'
            },
    
            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%e-%b}'
                    },
                tickInterval: 24 * 3600 * 1000,
            },
    
            yAxis: {
                title: {
                    text: 'Quantity'
                }
            },
    
            tooltip: {
                crosshairs: true,
                shared: true,
                //valueSuffix: '°C'
            },
    
            legend: {
                enabled: false
            },

            plotOptions: {
                arearange: {
                    fillColor: 'rgba(43,144,143,0.4)',
                    color: 'rgba(43,144,143,1)',
                    marker: {
                        radius: 0
                    }
                },
                line: {
                    color: 'rgba(43,144,143,1)',
                    marker: {
                        radius: 0
                    }
                }
            },
    
            series: [{
                type: 'arearange',
                name: 'Quantity',
                data: daily_quantity_data
            }, {
                type: 'line',
                name: 'Avg',
                data: daily_avg_quantity_data,
            }]
        });
        $('#daily-quantity-details-chart').show();
  }