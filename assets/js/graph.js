queue()
    .defer(d3.csv, "data/gamesalesData.csv")
    .await(makeGraphs);
    
function makeGraphs(error, gamesalesData) {
    var ndx = crossfilter(gamesalesData);

    /*
    gamesalesData.forEach(function(d){
        d.north_america = parseFloat(d["north_america"]).toFixed(2);
        d.europe = parseFloat(d["europe"]).toFixed(2);
        d.rest_of_world = parseFloat(d["rest_of_world"]).toFixed(2);
        d.global = parseFloat(d["global"]).toFixed(2);
    });
*/
    //TODO  try and get the numbers data converted to 2 decimal places...

    /* ----- Video Game Selector -----*/
    game_selector(ndx);
    /* ----- Console Selector -----*/
    console_selector(ndx);
    /* ----- Genre Selector -----*/
    genre_selector(ndx);
    /* ----- Publisher Selector -----*/
    publisher_selector(ndx);
    /* ----- Games Sold Per Console -----*/
    console_game_sales_comparison(ndx);
    /* ----- Total Games Sold Per Genre -----*/
    global_genre_sales(ndx);
    /* ----- Total Games Sold Per Publisher -----*/
    global_publisher_sales(ndx);
    /* ----- Game Sales Per Genre Per Region -----*/
    north_america_genre_sales(ndx);
    europe_genre_sales(ndx);
    rest_of_world_genre_sales(ndx);
    /* ----- Genres in Top 100 -----*/
    genre_comparison(ndx);
    /* ----- Publishers in Top 100 -----*/
    publisher_comparison(ndx);

    dc.renderAll();
}



/*----- Video Game Selector Function -----*/

function game_selector(ndx) {
    var game_selector_dim = ndx.dimension(dc.pluck("game"));
    var game_selector_group = game_selector_dim.group();

    dc.selectMenu("#game-selector")
        .dimension(game_selector_dim)
        .group(game_selector_group);
}

/*----- Console Selector -----*/

function console_selector(ndx) {
    var console_selector_dim = ndx.dimension(dc.pluck("console"));
    var console_selector_group = console_selector_dim.group();

    dc.selectMenu("#console-selector")
        .dimension(console_selector_dim)
        .group(console_selector_group);
}

/*----- Genre Selector Function -----*/

function genre_selector(ndx) {
    var genre_selector_dim = ndx.dimension(dc.pluck("genre"));
    var genre_selector_group = genre_selector_dim.group();

    dc.selectMenu("#genre-selector")
        .dimension(genre_selector_dim)
        .group(genre_selector_group);
}

/*----- Publisher Selector Function -----*/

function publisher_selector(ndx) {
    var publisher_selector_dim = ndx.dimension(dc.pluck("publisher"));
    var publisher_selector_group = publisher_selector_dim.group();

    dc.selectMenu("#publisher-selector")
        .dimension(publisher_selector_dim)
        .group(publisher_selector_group);
}


/* ----- Units Sold Per Console -----*/
function console_game_sales_comparison(ndx) {
    var console_game_sales_comparison_dim = ndx.dimension(dc.pluck("console"));
    var console_game_sales_comparison_group = console_game_sales_comparison_dim.group().reduceSum(dc.pluck("global"));

    dc.pieChart("#games-sold-comparison")
        .height(300)
        .width(550)
        .radius(100)
        .cx(200)
        .transitionDuration(1500)
        .renderLabel(false)
        .dimension(console_game_sales_comparison_dim)
        .group(console_game_sales_comparison_group)
        .ordinalColors(['#003791', '#107c10'])
        .legend(dc.legend().x(300).y(25).gap(3));
        // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
        // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
}

/* ----- Total Games Sold Per Genre Globally -----*/
 function global_genre_sales(ndx) {
     var global_genre_sales_dimension = ndx.dimension(dc.pluck("genre"));
     var global_genre_sales_group = global_genre_sales_dimension.group().reduceSum(dc.pluck("global"));
     var chart_colors = d3.scale.ordinal()
         .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#ffffff', '#9800ff', '#ffa500']);

     dc.barChart("#genre-global-sales")
         .width(550)
         .height(400)
         .margins({top: 10, right: 50, bottom: 75, left: 40})
         .dimension(global_genre_sales_dimension)
         .group(global_genre_sales_group)
         .transitionDelay(500)
         .colorAccessor(function(d) {
             return d.key;
         })
         .colors(chart_colors)
         .x(d3.scale.ordinal())
         .xUnits(dc.units.ordinal)
         .elasticY(true)
         .xAxisLabel("Genre")
         .yAxisLabel("Games sold (in millions)")
         .yAxis().ticks(8);
}

/* ----- Total Games Sold Per Publisher -----*/
function global_publisher_sales(ndx) {
    var global_publisher_dimension = ndx.dimension(dc.pluck("publisher"));
    var publisher_north_america_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("north_america"));
    var publisher_europe_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("europe"));
    var publisher_rest_of_world_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("rest_of_world"));
    var chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    dc.barChart("#publisher-global-sales") //THIS BAR CHART WILL BE A STACKED BAR CHART
        .width(750)
        .height(400)
        .margins({top: 10, right: 50, bottom: 105, left: 40})
        .dimension(global_publisher_dimension)
        .group(publisher_north_america_sales_group, "North America")
        .stack(publisher_europe_sales_group, "Europe")
        .stack(publisher_rest_of_world_sales_group, "Rest of World")
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Publisher")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8)
}


/* ----- Total Games Sold Per Genre in North America -----*/
function north_america_genre_sales(ndx) {
    var north_america_genre_dimension = ndx.dimension(dc.pluck("genre"));
    var north_america_genre_sales_group = north_america_genre_dimension.group().reduceSum(dc.pluck("north_america"));
    var chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    dc.barChart("#north-america-genre-sales")
        .width(450)
        .height(300)
        .margins({top: 10, right: 50, bottom: 75, left: 40})
        .dimension(north_america_genre_dimension)
        .group(north_america_genre_sales_group)
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .valueAccessor(function(d) {
            return d.value.toFixed(2)
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Genre")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
        // .legend(dc.legend().x(550).y(0).itemHeight(15).gap(5));
}
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET LEGEND AND RESIZING WORKING

/* ----- Total Games Sold Per Genre in Europe -----*/
function europe_genre_sales(ndx) {
    var europe_genre_dimension = ndx.dimension(dc.pluck("genre"));
    var europe_genre_sales_group = europe_genre_dimension.group().reduceSum(dc.pluck("europe"));
    var chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    dc.barChart("#europe-genre-sales")
        .width(450)
        .height(300)
        .margins({top: 10, right: 50, bottom: 75, left: 40})
        .dimension(europe_genre_dimension)
        .group(europe_genre_sales_group)
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .valueAccessor(function(d) {
            return d.value.toFixed(2)
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Genre")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
    // .legend(dc.legend().x(550).y(0).itemHeight(15).gap(5));
}
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET LEGEND AND RESIZING WORKING

/* ----- Total Games Sold Per Genre in the Rest of World -----*/
function rest_of_world_genre_sales(ndx) {
    var rest_of_world_genre_dimension = ndx.dimension(dc.pluck("genre"));
    var rest_of_world_genre_sales_group = rest_of_world_genre_dimension.group().reduceSum(dc.pluck("rest_of_world"));
    var chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    dc.barChart("#rest-of-world-genre-sales")
        .width(450)
        .height(300)
        .margins({top: 10, right: 50, bottom: 75, left: 40})
        .dimension(rest_of_world_genre_dimension)
        .group(rest_of_world_genre_sales_group)
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .valueAccessor(function(d) {
            return d.value.toFixed(2)
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Genre")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8)
        // .legend(dc.legend().x(550).y(0).itemHeight(15).gap(5));
}
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET LEGEND AND RESIZING WORKING

/*----- Comparison of Genres in Top 100 -----*/

function genre_comparison(ndx) {
    var genre_comparison_dim = ndx.dimension(dc.pluck("genre"));
    var genre_comparison_group = genre_comparison_dim.group();
    var chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#4f9eff', '#ffa500']);

    dc.pieChart("#genre-comparison")
        .height(330)
        .width(650)
        .radius(150)
        .cx(275)
        .transitionDuration(1500)
        .dimension(genre_comparison_dim)
        .group(genre_comparison_group)
        .slicesCap(7)
        .renderLabel(false)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .legend(dc.legend().x(450).y(25).gap(3));
    // TODO LOOK OVER THE BELOW CODE TO TRY AND GET TITLE WORKING
    // TODO LOOK OVER THE BELOW CODE TO TRY AND GET TITLE WORKING
    // .title(function(d) {
    //     return console_name_dim + "made" + [global] + "Million total game sales."
    // });
    // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
    // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
}

/*----- Comparison of Publishers in Top 100 -----*/

function publisher_comparison(ndx) {
    var publisher_comparison_dim = ndx.dimension(dc.pluck("publisher"));
    var publisher_comparison_group = publisher_comparison_dim.group();
    var chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#4f9eff', '#ffa500']);

    dc.pieChart("#publisher-comparison")
        .height(330)
        .width(650)
        .radius(150)
        .cx(275)
        .transitionDuration(1500)
        .dimension(publisher_comparison_dim)
        .group(publisher_comparison_group)
        .slicesCap(7)
        .renderLabel(false)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .legend(dc.legend().x(450).y(25).gap(3));
    // TODO LOOK OVER THE BELOW CODE TO TRY AND GET TITLE WORKING
    // TODO LOOK OVER THE BELOW CODE TO TRY AND GET TITLE WORKING
    // .title(function(d) {
    //     return console_name_dim + "made" + [global] + "Million total game sales."
    // });
    // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
    // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
}


