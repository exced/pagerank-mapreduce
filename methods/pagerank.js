var mongoose = require('mongoose');
var Page = require('../models/page');
config = require('../config/database');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/* defining helper fonctions */
/*
* return the damping factor of pagerank algorithm
* represents the probability of the user to stay on a page and click on links
*/
function getDampingFactor() {
    return 0.85;
}

/*
* pagerank algorithm with mapReduce
*/
var o = {};
o.map = function () {
    for (var i = 0, len = this.links.length; i < len; i++) {
        emit(this.links[i], this.pg / len);
    }
    emit(this.url, this.links);
};
o.reduce = function (k, vals) {
    var links = [];
    var pagerank = 0.0;
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] instanceof Array)
            links = vals[i];
        else
            pagerank += vals[i];
    }
    pagerank = 1 - getDampingFactor() + getDampingFactor() * pagerank;
    return { pagerank: pagerank, links: links };
};
o.scope = { getDampingFactor: new mongoose.mongo.Code(getDampingFactor.toString()) }

function recMapReduce(i, maxIter) {
    if (i <= maxIter){
        console.log("ITERATION I : " + i);
        Page.mapReduce(o, function (err, res) {
            if (err) throw err;
            console.log(res);
            recMapReduce(i + 1, maxIter);
        });
    }
}

recMapReduce(1,20);

mongoose.connection.close();
