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
        source: 'A',
        target: 'B',
        weight: 0.125   
    },
    {
        source: 'A',
        target: 'C',
        weight: 0.125
    },
    {
        source: 'B',
        target: 'C',
        weight: 0.25
    },
    {
        source: 'C',
        target: 'A',
        weight: 0.25
    },
    {
        source: 'D',
        target: 'C',
        weight: 0.25
    }                       
];
/* good for drawing with cytoscape */
edges.forEach(function saveEdges(elt, index, array) {
   Edge(elt).save(function (err, newEdge) {
        if (err) throw err;
    });
});

/* inserting vertex ... */
var vertexes = [
    {
        id: 'A',
        weight: 0.25,
        outlinkList: [edges[0], edges[1]]
    },
    {
        id: 'B',
        weight: 0.25,
        outlinkList: [edges[2]]
    },
    {
        id: 'C',
        weight: 0.25,
        outlinkList: [edges[3]]
    },
    {
        id: 'D',
        weight: 0.25,
        outlinkList: [edges[4]]
    }
];
vertexes.forEach(function saveVertex(elt, index, array) {
   Vertex(elt).save(function (err, newVertex) {
        if (err) throw err;
    });
});

mongoose.connection.close();