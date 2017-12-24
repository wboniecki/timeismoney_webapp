function chart_loader(itemId, realmSlug) {
    console.log(itemId);
    console.log(realmSlug);
    hourly_chart = false;
    daily_chart = false;
    daily_details_chart = false;


    // //Hourly chart
    // hourly_data_market_price = new Array();
    // hourly_data_quantity = new Array();
    // $.ajax({
    //   // load raw data from url
    //   url: '/chart-data/'+realmSlug+'/hourly/'+itemId,
    //   dataType: 'json',
    //   success: function (result) {
    //     //console.log(JSON.stringify(result));
    //     for (i = 0; i < result.length; i++) {
    //       dateUTC = Date.parse(result[i].datetime);
    //       hourly_data_market_price.push([dateUTC, parseFloat(result[i].market_price)]);
    //       hourly_data_quantity.push([dateUTC, result[i].quantity])
    //     }
    //     //console.log(hourly_data.toString());
    //     hourly_chart = true;
    //     //hourlyChart(hourly_data_market_price, hourly_data_quantity);
    //   },
    //   error: function () {
    //     console.log('Error loading hourly time series data.');
    //     hourly_chart = false;
    //   }
    // });

    // //Daily max quantity and avg market price
    // daily_data_avg_market_price = new Array();
    // daily_data_max_quantity = new Array();
    // $.ajax({
    //     url: '/chart-data/'+realmSlug+'/daily/'+itemId,
    //     dataType: 'json',
    //     success: function (result) {
    //         //console.log(JSON.stringify(result));
    //         for(i = 0; i < result.length; i++) {
    //             dateUTC = Date.parse(result[i].date);
    //             daily_data_avg_market_price.push([dateUTC, parseFloat(result[i].avg_market_price)]);
    //             daily_data_max_quantity.push([dateUTC, result[i].max_quantity]);
    //         }
    //         daily_chart = true;
    //         //dailyChart(daily_data_avg_market_price, daily_data_max_quantity);
    //         //console.log(daily_data_avg_market_price.toString());
    //     },
    //     error: function () {
    //         daily_chart = false;
    //         console.log('Error loading daily time series data.')
    //     }
    // });

    // // Daily item details for realm
    // daily_details_market_price = new Array();
    // daily_details_quantity = new Array();
    // $.ajax({
    //     url: '/chart-data/'+realmSlug+'/daily-details/'+itemId,
    //     dataType: 'json',
    //     success: function (result) {
    //         //console.log(JSON.stringify(result));
    //         for(i = 0; i < result.length; i++) {
    //             dateUTC = Date.parse(result[i].date);
    //             // Market price pattern: [date, [min_market_price, open_market_price, end_market_price, max_market_price]]
    //             daily_details_market_price.push([
    //                 dateUTC,              
    //                 parseFloat(result[i].open_market_price),
    //                 parseFloat(result[i].max_market_price),
    //                 parseFloat(result[i].min_market_price),
    //                 parseFloat(result[i].end_market_price),
                    
    //             ]);
    //         }
    //         daily_details_chart = true;
    //         console.log(daily_details_market_price.toString());
    //         //dailyDetailsChart(daily_details_market_price, daily_data_avg_market_price);
    //     },
    //     error: function () {
    //         daily_details_chart = false;
    //         console.log('Error loading daily details time series data.')
    //     }
    // });

    // console.log(hourly_chart);
    // if (hourly_chart) {
    //     hourlyChart(hourly_data_market_price, hourly_data_quantity);
    // }
    // if (daily_chart && daily_details_chart) {
    //     dailyChart(daily_data_avg_market_price, daily_data_max_quantity);
    //     dailyDetailsChart(daily_details_market_price, daily_data_avg_market_price);
    // }
    
    hourly_url = '/chart-data/'+realmSlug+'/hourly/'+itemId;
    //daily_url = '/chart-data/'+realmSlug+'/daily/'+itemId; <-- nie potrzeba, link ponizej robi robote
    daily_details_url = '/chart-data/'+realmSlug+'/daily-details/'+itemId;

    hourly_chart = ajaxLoader(hourly_url, "#container");
    hourly_chart.done(function(result) {
        hourly_data_market_price = new Array();
        hourly_data_quantity = new Array();
        for (i = 0; i < result.length; i++) {
            dateUTC = Date.parse(result[i].datetime);
            hourly_data_market_price.push([dateUTC, parseFloat(result[i].market_price)]);
            hourly_data_quantity.push([dateUTC, result[i].quantity])
        }
        hourlyChart(hourly_data_market_price, hourly_data_quantity);
    });

    daily_chart = ajaxLoader(daily_details_url, "#daily-charts").done(function(result){
        daily_details_market_price = new Array();
        daily_details_quantity = new Array();
        daily_data_avg_market_price = new Array();
        daily_data_max_quantity = new Array();
        for(i = 0; i < result.length; i++) {
            dateUTC = Date.parse(result[i].date);
            // Market price pattern: [date, [min_market_price, open_market_price, end_market_price, max_market_price]]
            daily_details_market_price.push([
                dateUTC,              
                parseFloat(result[i].open_market_price),
                parseFloat(result[i].max_market_price),
                parseFloat(result[i].min_market_price),
                parseFloat(result[i].end_market_price),
                
            ]);
            daily_data_avg_market_price.push([dateUTC, parseFloat(result[i].avg_market_price)]);
            daily_data_max_quantity.push([dateUTC, result[i].max_quantity]);
        }
        dailyChart(daily_data_avg_market_price, daily_data_max_quantity);
        dailyDetailsChart(daily_details_market_price, daily_data_avg_market_price);
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
            $(div_id).hide();
        }
    });
}
