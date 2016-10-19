var mongoose = require('mongoose');
config = require('../config/database');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/*
* pagerank algorithm with mapReduce
*/
var o = {};
/*
* nid n
* node N
*/
o.map = function (n, N) {
    var p = N.pageRank / norm(N.adjacencyList);
    emit(n, N);

    for() {
        
    }
};
o.reduce = function (k, vals) {
    return vals.length
};
View.mapReduce(o, function (err, results) {
    if (err) throw err;
    console.log(results)
});

mongoose.connection.close();
