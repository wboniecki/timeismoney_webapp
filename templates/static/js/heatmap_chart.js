function heatmapChart(market_price_data, div_id, title, color) {
    Highcharts.chart(div_id, {
        
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },
            
        
            title: {
                text: title
            },
        
            xAxis: {
                title: {
                    text: null
                },
                labels: {
                    format: '{value}:00'
                },
                minPadding: 0,
                maxPadding: 0,
                startOnTick: false,
                endOnTick: false,
                tickPositions: [0, 6, 12, 18, 24],
                tickWidth: 1,
                min: 0,
                max: 23
            },
        
            yAxis: {
                title: {
                    text: null
                },
                tickInterval: 1,
                labels: {
                    formatter: function() {
                        label = this.axis.defaultLabelFormatter.call(this);
                        today = new Date(Date.now());
                        today = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
                        one_day_in_ms = 24 * 3600 * 1000;
                        return Highcharts.dateFormat('%e-%b', today - parseInt(label) * one_day_in_ms);
                    }
                }
            },
        
            colorAxis: {
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[color]
            },
        
            // legend: {
            //     align: 'bottom',
            //     layout: 'horizontal',
            //     margin: 0,
            //     verticalAlign: 'top',
            //     y: 25,
            //     symbolHeight: 280
            // },
        
            tooltip: {
                formatter: function () {
                    today = new Date(Date.now());
                    today = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
                    one_day_in_ms = 24 * 3600 * 1000;
                    return Highcharts.dateFormat('%a, %b %e, %Y', today - this.point.y * one_day_in_ms) + ' ' + this.point.x +':00<br/>' + this.point.value;
                }
            },
        
            series: [{
                name: title,
                borderWidth: 0,
                data: market_price_data,
                dataLabels: {
                    enabled: true,
                    color: '#000000'
                }
            }],      
        });
    $('#'+div_id).show();
}