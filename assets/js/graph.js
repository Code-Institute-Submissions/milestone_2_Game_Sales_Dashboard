queue()
    .defer(d3.csv, "data/vgsales.csv")
    .await(makeGraphs);
    
function makeGraphs(error, salesData) {
}