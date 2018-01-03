function chart_loader(itemId, realmSlug) {
    //hourly_chart = false;
    //daily_chart = false;
    //isSuccess = true;
    time_offset = new Date().getTimezoneOffset();
    Highcharts.setOptions({
        global: {
            timezoneOffset: time_offset
        }
    });
    hourly_url = '/chart-data/'+realmSlug+'/hourly/'+itemId;
    //daily_url = '/chart-data/'+realmSlug+'/daily/'+itemId; <-- nie potrzeba, link ponizej robi robote
    daily_details_url = '/chart-data/'+realmSlug+'/daily-details/'+itemId;

    hourly_chart = ajaxLoader(hourly_url, "#charts");
    hourly_chart.done(function(result) {
        heatmap_market_price = new Array();
        heatmap_quantity = new Array();
        one_day_in_ms = 24 * 3600 * 1000;
        now_date = new Date(Date.now());
        to_date = Date.UTC(now_date.getUTCFullYear(), now_date.getUTCMonth(), now_date.getUTCDate());
        from_date = to_date - 7 * one_day_in_ms;
        hourly_data_market_price = new Array();
        hourly_data_quantity = new Array();
        console.log(new Date(Date.now()));
        console.log(new Date().getTimezoneOffset());
        for (i = 0; i < result.length; i++) {
            utc_datetime = Date.parse(result[i].datetime)
            //console.log(utc_datetime);
            datetime = new Date(utc_datetime);
            hourly_data_market_price.push([datetime.getTime(), parseFloat(result[i].market_price)]);
            hourly_data_quantity.push([datetime.getTime(), result[i].quantity]);
            if (datetime >= from_date && datetime <= to_date) {
                local_date = Date.UTC(datetime.getUTCFullYear(), datetime.getUTCMonth(), datetime.getUTCDate());
                day_num = (to_date-local_date)/one_day_in_ms;
                heatmap_market_price.push([datetime.getUTCHours(), day_num, parseFloat(result[i].market_price)]);
                heatmap_quantity.push([datetime.getUTCHours(), day_num, parseFloat(result[i].quantity)])
            }
        }
        hourlyChart(hourly_data_market_price, hourly_data_quantity);
        heatmapChart(heatmap_market_price, 'heatmap-market-price', 'Market price heatmap', 2);
        heatmapChart(heatmap_quantity, 'heatmap-quantity', 'Quantity heatmap', 1);
    });

    daily_chart = ajaxLoader(daily_details_url, "#charts").done(function(result){
        daily_details_market_price = new Array();
        daily_details_quantity = new Array();
        daily_data_avg_quantity = new Array();
        daily_data_avg_market_price = new Array();
        daily_data_max_quantity = new Array();
        for(i = 0; i < result.length; i++) {
            datetime = Date.parse(result[i].date) + (time_offset/60) * 36e5;
            daily_details_quantity.push([
                datetime,
                result[i].max_quantity,
                result[i].min_quantity
            ]);
            // Market price pattern: [date, [min_market_price, open_market_price, end_market_price, max_market_price]]
            daily_details_market_price.push([
                datetime,              
                parseFloat(result[i].open_market_price),
                parseFloat(result[i].max_market_price),
                parseFloat(result[i].min_market_price),
                parseFloat(result[i].end_market_price),
                
            ]);
            daily_data_avg_market_price.push([datetime, parseFloat(result[i].avg_market_price)]);
            daily_data_max_quantity.push([datetime, result[i].max_quantity]);
            daily_data_avg_quantity.push([datetime, result[i].avg_quantity]);
        }
        dailyChart(daily_data_avg_market_price, daily_data_max_quantity);
        dailyDetailsChart(daily_details_market_price, daily_data_avg_market_price, daily_details_quantity, daily_data_avg_quantity);
    });
    return true;
    // if (hourly_chart.readyState == 1 && daily_chart.readyState == 1) {
    //     console.log("Chart loaded.")
    //     return true;
    // } else {
    //     return false;
    // }
}

function ajaxLoader(url, div_id)
{
    return $.ajax({
        url: url,
        dataType: 'json',
        error: function() {
            console.log("Error when load data to: "+ div_id);
            //$(div_id).hide();
        }
    });
}
