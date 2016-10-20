var mongoose = require('mongoose');
config = require('../config/database');
var Vertex = require('../models/vertex');
var Edge = require('../models/edge');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/* inserting edges ... */
var edges = [
    {
        source: 'n1',
        target: 'n2',
        weight: 0.1   
    },
    {
        source: 'n1',
        target: 'n4',
        weight: 0.1
    },
    {
        source: 'n5',
        target: 'n1',
        weight: 0.066
    },
    {
        source: 'n2',
        target: 'n5',
        weight: 0.1
    },
    {
        source: 'n5',
        target: 'n2',
        weight: 0.066
    },
    {
        source: 'n2',
        target: 'n3',
        weight: 0.1
    },
    {
        source: 'n5',
        target: 'n3',
        weight: 0.066
    },
    {
        source: 'n4',
        target: 'n5',
        weight: 0.2
    },
    {
        source: 'n3',
        target: 'n4',
        weight: 0.2
    }                        
];
/* good for drawing with cytoscape */
edges.forEach(function saveEdges(elt, index, array) {
   Edge(elt).save(function (err, newEdge) {
        if (err) throw err;
    });
});

var nb_vertex = 5;
/* inserting vertex ... */
for (var i = 1; i <= nb_vertex; i++) {
    var outlinkList = [];
    /* insert outlink list */
    edges.forEach(function(elt, index, arr){
        /* outlink list */
        if (elt.source == 'n'+i )
            outlinkList.push(elt);
    })

    var vertex = Vertex({
        id: 'n' + i,
        weight: 1 / nb_vertex,
        outlinkList: outlinkList
    });
    vertex.save(function (err, newVertex) {
        if (err) throw err;
    });
}

mongoose.connection.close();