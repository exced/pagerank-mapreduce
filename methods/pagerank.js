var mongoose = require('mongoose');
var Page = require('../models/page');
config = require('../config/database');

const DAMPING_FACTOR = 0.85;

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
    return this.DAMPING_FACTOR;
}

/*
* pagerank algorithm with mapReduce
*/
for (var i = 1; i < 20; i++) {
    
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
        print("REDUCE " + JSON.stringify({ key: [k, pagerank], value: links }));
        return { key: [k, pagerank], value: links };
    };
    o.scope = { getDampingFactor: new mongoose.mongo.Code(getDampingFactor.toString()) }
    o.finalize = function (key, value) {
        if (typeof (value) != "number")
            value = 1;

        return value;
    };
    o.out = { "inline": 1 };

    Page.mapReduce(o, function (err, results) {
        if (err) throw err;
        console.log("iITERATION I : " + i);
        console.log(results)
    });
}


mongoose.connection.close();
