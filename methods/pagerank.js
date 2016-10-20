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
function getEdges() {
    /*
    this.Edge.find({}, function (err, edges) {
        if (err) throw err;

        return (JSON.stringify(edges));
    });
    */
}

/*
* pagerank algorithm with mapReduce
*/
var o = {};
/*
PSEUDOCODE
map( key: [url, pagerank], value: outlink_list )
    for each outlink in outlink_list
        emit( key: outlink, value: pagerank/size(outlink_list) )

    emit( key: url, value: outlink_list )

reducer( key: url, value: list_pr_or_urls )
    outlink_list = []
    pagerank = 0

    for each pr_or_urls in list_pr_or_urls
        if is_list( pr_or_urls )
            outlink_list = pr_or_urls
        else
            pagerank += pr_or_urls

    pagerank = 1 - DAMPING_FACTOR + ( DAMPING_FACTOR * pagerank )

    emit( key: [url, pagerank], value: outlink_list )
*/
o.map = function () {
    for (var i = 0, len = this.outlinkList.length; i < len; i++) {
        elt = this.outlinkList[i];
        emit(elt, elt.weight / len);
    }
    emit(this.id, this.outlinkList);
};
o.reduce = function (k, vals) {
    var outlinkList = [];
    var pagerank = 0;
    for (var i = 0, len = vals.length; i < len; i++){
        if (vals[i].isArray)
            outlinkList = vals[i]; 
        else
            pagerank += vals[i];
    }
    pagerank = 1 - DAMPING_FACTOR*(1 + pagerank);
    return {key: [k, pagerank], value: outlinkList};
};
o.scope = { getEdges: new mongoose.mongo.Code(getEdges.toString()) }
Vertex.mapReduce(o, function (err, results) {
    if (err) throw err;
    console.log(results)
});

mongoose.connection.close();
