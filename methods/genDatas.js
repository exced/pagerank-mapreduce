var mongoose = require('mongoose');
config = require('../config/database');
var Page = require('../models/page');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

const NUM_PAGES = 4;

/* defining pages ... */
var vertexes = [
    {
        id: 'A',
        weight: 1 / NUM_VERTEXES,
        outlinkList: [{id:'B',weight:0.25},{id:'C',weight:0.25}]
    },
    {
        id: 'B',
        weight: 0.25,
        outlinkList: [{id:'C',weight:0.25}]
    },
    {
        id: 'C',
        weight: 0.25,
        outlinkList: [{id:'A',weight:0.25}]
    },
    {
        id: 'D',
        weight: 0.25,
        outlinkList: [{id:'C',weight:0.25}]
    }
];

/* save vertexes ... */
vertexes.forEach(function saveVertex(elt, index, array) {
   Vertex(elt).save(function (err, newVertex) {
        if (err) throw err;
    });
});

mongoose.connection.close();