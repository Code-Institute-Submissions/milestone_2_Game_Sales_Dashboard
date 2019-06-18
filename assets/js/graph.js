queue()
    .defer(d3.csv, "data/gamesalesData.csv")
    .await(makeGraphs);
    
function makeGraphs(error, gamesalesData) {
    let ndx = crossfilter(gamesalesData);

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
    let game_selector_dim = ndx.dimension(dc.pluck("game"));
    let game_selector_group = game_selector_dim.group();

    dc.selectMenu("#game-selector")
        .useViewBoxResizing(true)
        .dimension(game_selector_dim)
        .group(game_selector_group);
}

/*----- Console Selector -----*/

function console_selector(ndx) {
    let console_selector_dim = ndx.dimension(dc.pluck("console"));
    let console_selector_group = console_selector_dim.group();

    dc.selectMenu("#console-selector")
        .useViewBoxResizing(true)
        .dimension(console_selector_dim)
        .group(console_selector_group);
}

/*----- Genre Selector Function -----*/

function genre_selector(ndx) {
    let genre_selector_dim = ndx.dimension(dc.pluck("genre"));
    let genre_selector_group = genre_selector_dim.group();

    dc.selectMenu("#genre-selector")
        .useViewBoxResizing(true)
        .dimension(genre_selector_dim)
        .group(genre_selector_group);
}

/*----- Publisher Selector Function -----*/

function publisher_selector(ndx) {
    let publisher_selector_dim = ndx.dimension(dc.pluck("publisher"));
    let publisher_selector_group = publisher_selector_dim.group();

    dc.selectMenu("#publisher-selector")
        .useViewBoxResizing(true)
        .dimension(publisher_selector_dim)
        .group(publisher_selector_group);
}


/* ----- Units Sold Per Console -----*/
function console_game_sales_comparison(ndx) {
    let console_game_sales_comparison_dim = ndx.dimension(dc.pluck("console"));
    let console_game_sales_comparison_group = console_game_sales_comparison_dim.group().reduceSum(dc.pluck("global"));

    function console_game_sales_comparison_title (k, v) {
        // Shows the console and sales on hover
        if (k) {
            return k + " sold " + three_decimal_places(v) + " million games.";
        }
    }

    dc.pieChart("#games-sold-comparison")
        .height(250)
        .radius(80)
        .cx(80)
        .transitionDuration(1500)
        .renderLabel(true)
        .title(function(d) {
            return console_game_sales_comparison_title(d.key, d.value);
        })
        .dimension(console_game_sales_comparison_dim)
        .group(console_game_sales_comparison_group)
        .ordinalColors(['#003791', '#107c10'])
}

/* ----- Total Games Sold Per Genre Globally -----*/
 function global_genre_sales(ndx) {
     let global_genre_sales_dimension = ndx.dimension(dc.pluck("genre"));
     let global_genre_sales_group = global_genre_sales_dimension.group().reduceSum(dc.pluck("global"));
     let chart_colors = d3.scale.ordinal()
         .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#ffffff', '#9800ff', '#ffa500']);

     function global_genre_sales_title (k, v) {
         // Shows the game sales per genre in North America on hover
         if (k){
             return "In the Top 100's, the " + k + " genre has sold " + three_decimal_places(v) + " million games Globally.";
         }
     }

     dc.barChart("#genre-global-sales")
         .height(450)
         .margins({top: 10, right: 20, bottom: 75, left: 40})
         .dimension(global_genre_sales_dimension)
         .group(global_genre_sales_group)
         .transitionDelay(500)
         .colorAccessor(function(d) {
             return d.key;
         })
         .colors(chart_colors)
         .title(function(d) {
             return global_genre_sales_title(d.key, d.value);
         })
         .x(d3.scale.ordinal())
         .xUnits(dc.units.ordinal)
         .elasticY(true)
         .useViewBoxResizing(true)
         .xAxisLabel("Genre")
         .yAxisLabel("Games sold (in millions)")
         .yAxis().ticks(8);
}

/* ----- Total Games Sold Per Publisher -----*/
function global_publisher_sales(ndx) {
    let global_publisher_dimension = ndx.dimension(dc.pluck("publisher"));
    let publisher_north_america_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("north_america"));
    let publisher_europe_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("europe"));
    let publisher_rest_of_world_sales_group = global_publisher_dimension.group().reduceSum(dc.pluck("rest_of_world"));
    let chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    function global_publisher_sales_title (k, v) {
        // Shows the Publisher and the number of games the publisher is accountable for on hover

        if (k){
            return "In the Top 100's, " + k + " have sold " + three_decimal_places(v) + " million games in..."
        }
        console.log(data);
    }

    dc.barChart("#publisher-global-sales") //THIS BAR CHART WILL BE A STACKED BAR CHART
        .height(450)
        .margins({top: 10, right: 20, bottom: 125, left: 40})
        .dimension(global_publisher_dimension)
        .group(publisher_north_america_sales_group, "North America")
        .stack(publisher_europe_sales_group, "Europe")
        .stack(publisher_rest_of_world_sales_group, "Rest of World")
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .title(function(d) {
            return global_publisher_sales_title(d.key, d.value);
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .useViewBoxResizing(true)
        .xAxisLabel("Publisher")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
}


/* ----- Total Games Sold Per Genre in North America -----*/
function north_america_genre_sales(ndx) {
    let north_america_genre_dimension = ndx.dimension(dc.pluck("genre"));
    let north_america_genre_sales_group = north_america_genre_dimension.group().reduceSum(dc.pluck("north_america"));
    let chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    function north_america_genre_sales_title (k, v) {
        if (k){
            return "In the Top 100's, the " + k + " genre has sold " + three_decimal_places(v) + " million games North America.";
        }
    }

    dc.barChart("#north-america-genre-sales")
        .height(300)
        .margins({top: 10, right: 20, bottom: 75, left: 40})
        .dimension(north_america_genre_dimension)
        .group(north_america_genre_sales_group)
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .title(function(d) {
            return north_america_genre_sales_title(d.key, d.value);
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .useViewBoxResizing(true)
        .xAxisLabel("Genre")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
}

/* ----- Total Games Sold Per Genre in Europe -----*/
function europe_genre_sales(ndx) {
    let europe_genre_dimension = ndx.dimension(dc.pluck("genre"));
    let europe_genre_sales_group = europe_genre_dimension.group().reduceSum(dc.pluck("europe"));
    let chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    function europe_genre_sales_title (k, v) {
        // Shows the game sales per genre in Europe on hover
        if (k){
            return "In the Top 100's, the " + k + " genre has sold " + three_decimal_places(v) + " million games in Europe.";
        }
    }

    dc.barChart("#europe-genre-sales")
        .height(300)
        .margins({top: 10, right: 20, bottom: 75, left: 40})
        .dimension(europe_genre_dimension)
        .group(europe_genre_sales_group)
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .title(function(d) {
            return europe_genre_sales_title(d.key, d.value);
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .useViewBoxResizing(true)
        .xAxisLabel("Genre")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
}

/* ----- Total Games Sold Per Genre in the Rest of World -----*/
function rest_of_world_genre_sales(ndx) {
    let rest_of_world_genre_dimension = ndx.dimension(dc.pluck("genre"));
    let rest_of_world_genre_sales_group = rest_of_world_genre_dimension.group().reduceSum(dc.pluck("rest_of_world"));
    let chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#ffa500']);

    function rest_of_world_genre_sales_title (k, v) {
        // Shows the game sales per genre in the Rest of the World on hover
        if (k){
            return "In the Top 100's, the " + k + " genre has sold " + three_decimal_places(v) + " million games in the Rest of the World.";
        }
    }

    dc.barChart("#rest-of-world-genre-sales")
        .height(300)
        .margins({top: 10, right: 20, bottom: 75, left: 40})
        .dimension(rest_of_world_genre_dimension)
        .group(rest_of_world_genre_sales_group)
        .transitionDelay(500)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .title(function(d) {
            return rest_of_world_genre_sales_title(d.key, d.value);
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .useViewBoxResizing(true)
        .xAxisLabel("Genre")
        .yAxisLabel("Games sold (in millions)")
        .yAxis().ticks(8);
}

/*----- Comparison of Genres in Top 100 -----*/

function genre_comparison(ndx) {
    let genre_comparison_dim = ndx.dimension(dc.pluck("genre"));
    let genre_comparison_group = genre_comparison_dim.group();
    let chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#4f9eff', '#ffa500']);

    function genre_comparison_title (k, v) {
        // Shows the Genre and the number of games that fit the genre in the top 100 on hover
        if (k){
            return k + " genre has " + v + " games in the top 100's.";
        }
    }

    dc.pieChart("#genre-comparison")
        .height(250)
        .radius(85)
        .cx(85)
        .transitionDuration(1500)
        .dimension(genre_comparison_dim)
        .group(genre_comparison_group)
        .slicesCap(7)
        .renderLabel(false)
        .title(function(d) {
            return genre_comparison_title (d.key, d.value);
        })
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .legend(dc.legend().x(185).y(25).gap(3));
}

/*----- Comparison of Publishers in Top 100 -----*/

function publisher_comparison(ndx) {
    let publisher_comparison_dim = ndx.dimension(dc.pluck("publisher"));
    let publisher_comparison_group = publisher_comparison_dim.group();
    let chart_colors = d3.scale.ordinal()
        .range(['#003791', '#107c10', '#78727c', '#5dc21e', '#f1f1f1', '#9800ff', '#4f9eff', '#ffa500']);

    function publisher_comparison_title (k, v) {
        // Shows the Publisher and the number of games the publisher is accountable for on hover
        if (k) {
            return k + " has " + v + " games in the top 100's.";
        }
    }

    dc.pieChart("#publisher-comparison")
        .height(250)
        .radius(85)
        .cx(85)
        .transitionDuration(1500)
        .dimension(publisher_comparison_dim)
        .group(publisher_comparison_group)
        .slicesCap(7)
        .renderLabel(false)
        .title(function(d) {
            return publisher_comparison_title (d.key, d.value);
        })
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(chart_colors)
        .legend(dc.legend().x(185).y(25).gap(3));
}

function three_decimal_places (v) {
    // Shows the Publisher and the number of games the publisher is accountable for on hover
    if (v) {
        return Number.parseFloat(v).toFixed(3);
    }
}


