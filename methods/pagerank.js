var mongoose = require('mongoose');
var Edge = require('../models/edge');
var Vertex = require('../models/vertex');
config = require('../config/database');

const DAMPING_FACTOR = 0.85;

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/* defining helper fonctions */
function getDampingFactor() {
    return this.DAMPING_FACTOR;
}

/*
* pagerank algorithm with mapReduce
*/
var o = {};
o.map = function () {
    for (var i = 0, len = this.outlinkList.length; i < len; i++) {
        elt = this.outlinkList[i];
        emit(elt.id, elt.weight / len);
    }
    emit(this.id, this.outlinkList);
};
o.reduce = function (k, vals) {
    var outlinkList = [];
    var pagerank = 0;
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] instanceof Array)
            outlinkList = vals[i];
        else 
            pagerank += vals[i];
    }
    pagerank = 1 - getDampingFactor() + getDampingFactor() * pagerank;
    return { key: [k, pagerank], value: outlinkList };
};
o.scope = { getDampingFactor: new mongoose.mongo.Code(getDampingFactor.toString()) }
o.finalize = function (key, value) {
    if (typeof (value) != "number")
        value = 1;

    return value;
};
o.out = { "inline": 1 };
/*
for (var i = 1; i < 20; i++) {
    Vertex.mapReduce(o, function (err, results) {
        if (err) throw err;
        console.log("iITERATION I : " + i);
        console.log(results)
    });
}
*/

Vertex.mapReduce(o, function (err, results) {
    if (err) throw err;
    console.log(results);
});


mongoose.connection.close();
