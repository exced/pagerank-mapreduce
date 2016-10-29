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
var pages = [
    {
        _id: 'A',
        value: {
            url: 'A',
            pg: 1,
            links: ['B', 'C']
        }
    },
    {
        _id: 'B',
        value: {
            url: 'B',
            pg: 1,
            links: ['C']
        }
    },
    {
        _id: 'C',
        value: {
            url: 'C',
            pg: 1,
            links: ['A']
        }
    },
    {
        _id: 'D',
        value: {
            url: 'D',
            pg: 1,
            links: ['C']
        }
    }
];

/* save pages ... */
pages.forEach(function savePages(elt, index, array) {
    Page(elt).save(function (err, newPage) {
        if (err) throw err;
    });
});

mongoose.connection.close();