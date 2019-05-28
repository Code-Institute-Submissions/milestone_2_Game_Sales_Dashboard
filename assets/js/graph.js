queue()
    .defer(d3.csv, "data/ps4gamesales.csv")
    .await(makeGraphs);
    
function makeGraphs(error, salesData) {
}