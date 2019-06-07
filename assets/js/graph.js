queue()
    .defer(d3.csv, "data/gamesalesData.csv")
    .await(makeGraphs);
    
function makeGraphs(error, gamesalesData) {
    var ndx = crossfilter(gamesalesData)
    gamesalesData.forEach(function(d){
        d.north_america = parseInt(d["north_america"]);
        d.europe = parseInt(d["europe"]);
        d.rest_of_world = parseInt(d["rest_of_world"]);
        d.global = parseInt(d["global"]);
    });

    /* ----- Video Game Selector -----*/
    game_selector(ndx);

    /* ----- Games per Console & Console Selector -----*/
    // TODO LOOK OVER THE BELOW CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
    // number_of_ps4_games_available(ndx);
    // number_of_xboxone_games_available(ndx);
    // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
    console_selector(ndx);

    /* ----- Games Sold Per Console -----*/
    per_console_games_sales_comparison(ndx);

    /* ----- Total Games Sold Per Genre/Publisher -----*/
    global_genre_sales(ndx);
    global_publisher_sales(ndx);

    /* ----- Game Sales Per Genre Per Region -----*/
    north_america_genre_sales(ndx);
    europe_genre_sales(ndx);
    rest_of_world_genre_sales(ndx);

    /* ----- Genres in Top 100 -----*/
    genre_comparison(ndx);
    genre_selector(ndx);

    /* ----- Publishers in Top 100 -----*/
    publisher_comparison(ndx);
    publisher_selector(ndx);

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


/*----- Games Belonging to Each Console -----*/
// TODO LOOK OVER THE BELOW CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
// TODO LOOK OVER THE BELOW CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
/*
function number_of_ps4_games_available(ndx) {
    var numberOfPs4GamesAvailable = ndx.groupAll().reduce(
        function(p, v) {
            if (v.game === "") {
                p.count++;
                if (v.console === "PS4") {
                    p.are_ps4++;
                }
            }
            return p;
        },
                function(p, v) {
            if (v.game === "") {
                p.count--;
                if (v.console === "PS4") {
                    p.are_ps4--;
                }
            }
            return p;
        },
        function() {
            return {count: 0, are_ps4: 0};
        }
    );

    dc.numberDisplay("#number_of_ps4_games_available")
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function (d) {
            if (d.count == 0) {
                return 0;
            } else {
                return (d.are_ps4 / d.count);
            }
        })
        .group(numberOfPs4GamesAvailable);
};
*/
/*
function number_of_xboxone_games_available(ndx) {
    var numberOfXboxoneGamesAvailable = ndx.groupAll().reduce(
        function(p, v) {
            if (v.game === "") {
                p.count++;
                if (v.console === "XBOX ONE") {
                    p.are_xboxone++;
                }
            }
            return p;
        },
        function(p, v) {
            if (v.game === "") {
                p.count--;
                if (v.console === "XBOX ONE") {
                    p.are_xboxone--;
                }
            }
            return p;
        },
        function() {
            return {count: 0, are_xboxone: 0};
        }
    );

    dc.numberDisplay("#number_of_xboxone_games_available")
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function (d) {
            if (d.count == 0) {
                return 0;
            } else {
                return (d.are_xboxone / d.count);
            }
        })
        .group(numberOfXboxoneGamesAvailable);
};
*/
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING

/*----- Console Selector -----*/

function console_selector(ndx) {
    var consoleDim = ndx.dimension(dc.pluck("console"));
    var consoleGroup = consoleDim.group();

    dc.selectMenu("#console-selector")
        .dimension(consoleDim)
        .group(consoleGroup);
}

/* ----- Units Sold Per Console -----*/
function per_console_games_sales_comparison(ndx) {
    var console_name_dim = ndx.dimension(dc.pluck("console"));
    var per_console_game_sales_comparison_group = console_name_dim.group().reduceSum(dc.pluck("global"));

    dc.pieChart("#games-sold-comparison")
        .height(330)
        .radius(90)
        .transitionDuration(1500)
        .dimension(console_name_dim)
        .group(per_console_game_sales_comparison_group)
        // TODO LOOK OVER THE BELOW CODE TO TRY AND GET TITLE WORKING
        // TODO LOOK OVER THE BELOW CODE TO TRY AND GET TITLE WORKING
        // .title(function(d) {
        //     return console_name_dim + "made" + [global] + "Million total game sales."
        // });
        // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
        // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL TITLE WORKING
}

/* ----- Total Games Sold Per Genre Globally -----*/
 function global_genre_sales(ndx) {
     var global_genre_sales_dimension = ndx.dimension(dc.pluck("genre"));
     var global_genre_sales_group = global_genre_sales_dimension.group().reduceSum(dc.pluck("global"));

     dc.barChart("#genre-global-sales")
         .width(650)
         .height(400)
         .margins({top: 10, right: 50, bottom: 30, left: 50})
         .dimension(global_genre_sales_dimension)
         .group(global_genre_sales_group)
         .transitionDelay(500)
         .x(d3.scale.ordinal())
         .xUnits(dc.units.ordinal)
         .xAxisLabel("Genre")
         .yAxisLabel("Games sold (in millions)")
         .yAxis().ticks(8);
         // .legend(dc.legend().x(550).y(0).itemHeight(15).gap(5));
}
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET LEGEND AND RESIZING WORKING

/* ----- Total Games Sold Per Publisher -----*/
function global_publisher_sales(ndx) {
    var global_publisher_dimension = ndx.dimension(dc.pluck("publisher"));
    var publisher_north_america_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("north_america"));
    var publisher_europe_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("europe"));
    var publisher_rest_of_world_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("rest_of_world"));

    dc.barChart("#publisher-global-sales") //THIS BAR CHART WILL BE A STACKED BAR CHART
        .width(650)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(global_publisher_dimension)
        .group(publisher_north_america_sales_group, "North America")
        .stack(publisher_europe_sales_group, "Europe")
        .stack(publisher_rest_of_world_sales_group, "Rest of World")
        .transitionDelay(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Publisher")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
        // .legend(dc.legend().x(550).y(0).itemHeight(15).gap(5));
}
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET LEGEND AND RESIZING WORKING


/* ----- Total Games Sold Per Genre in North America -----*/
function north_america_genre_sales(ndx) {
    var north_america_genre_dimension = ndx.dimension(dc.pluck("genre"));
    var north_america_genre_sales_group = north_america_genre_dimension.group().reduceSum(dc.pluck("north_america"));

    dc.barChart("#north-america-genre-sales")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(north_america_genre_dimension)
        .group(north_america_genre_sales_group)
        .transitionDelay(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
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

    dc.barChart("#europe-genre-sales")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(europe_genre_dimension)
        .group(europe_genre_sales_group)
        .transitionDelay(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
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

    dc.barChart("#rest-of-world-genre-sales")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(rest_of_world_genre_dimension)
        .group(rest_of_world_genre_sales_group)
        .transitionDelay(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Genre")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
    // .legend(dc.legend().x(550).y(0).itemHeight(15).gap(5));
}
// TODO LOOK OVER THE ABOVE CODE TO TRY AND GET LEGEND AND RESIZING WORKING

