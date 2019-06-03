queue()
    .defer(d3.csv, "data/ps4gamesales.csv")
    .await(makeGraphs);
    
function makeGraphs(error, ps4gamesalesData) {
    // TODO: make graphs using d3

}