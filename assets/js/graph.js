queue()
    .defer(d3.csv, "data/gamesalesData.csv")
    .await(makeGraphs);
    
function makeGraphs(error, gamesalesData) {
    var ndx = crossfilter(gamesalesData)
    // TODO: make graphs using d3
    gamesalesData.forEach(function(d){
        d.north_america = parseInt(d["north_america"]);
        d.europe = parseInt(d["europe"]);
        d.rest_of_world = parseInt(d["rest_of_world"]);
        d.global = parseInt(d["global"]);
    });

    /* ----- Video Game Selector -----*/
    game_selector(ndx);

    dc.renderAll();
}




/* ----- Video Game Selector Function -----*/

function game_selector(ndx) {
    var gameDim = ndx.dimension(dc.pluck("game"));
    var gameGroup = gameDim.group();

    dc.selectMenu("#game-selector")
        .dimension(gameDim)
        .group(gameGroup);
        /*.title(function(d) {
            return d.key;
        });*/
};