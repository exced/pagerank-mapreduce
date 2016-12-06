var mongoose = require('mongoose');
var Page = require('../models/page');
config = require('../config/database');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/* defining helpers */

/* epsilon */
const EPS = 10 ^ (-3);
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
    for (var i = 0, len = this.value.links.length; i < len; i++) {
        emit(this.value.links[i], this.value.pg / len);
    }
    emit(this.value.url, 0);
    emit(this.value.url, this.value.links);
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
    return { url: k, pg: pagerank, links: links };
};
o.scope = { getDampingFactor: new mongoose.mongo.Code(getDampingFactor.toString()) }
o.out = { replace: 'pages' }

for (var i = 0; i < 20; i++) {
    /* should have conv criteria */
    Page.mapReduce(o);
}

/* print results */
Page.find(function (err, res) {
    if (err) throw err;
    console.log(res);
});

mongoose.connection.close();
