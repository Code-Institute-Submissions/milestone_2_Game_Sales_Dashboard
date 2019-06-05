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


    dc.renderAll();
}




/*----- Video Game Selector Function -----*/

function game_selector(ndx) {
    var gameDim = ndx.dimension(dc.pluck("game"));
    var gameGroup = gameDim.group();

    dc.selectMenu("#game-selector")
        .dimension(gameDim)
        .group(gameGroup);
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
        // TODO LOOK OVER THE BELOW CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
        // TODO LOOK OVER THE BELOW CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
        // .title(function(d) {
        //     return console_name_dim + "made" + [global] + "Million total game sales."
        // });
        // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
        // TODO LOOK OVER THE ABOVE CODE TO TRY AND GET INDIVIDUAL NUMBER DISPLAYS WORKING
}