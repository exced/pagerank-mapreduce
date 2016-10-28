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
        url: 'A',
        pg: 1 / NUM_PAGES,
        links: ['B','C']
    },
    {
        url: 'B',
        pg: 1 / NUM_PAGES,
        links: ['C']
    },
    {
        url: 'C',
        pg: 1 / NUM_PAGES,
        links: ['A']
    },
    {
        url: 'D',
        pg: 1 / NUM_PAGES,
        links: ['C']
    }
];

/* save pages ... */
pages.forEach(function savePages(elt, index, array) {
   Page(elt).save(function (err, newPage) {
        if (err) throw err;
    });
});

mongoose.connection.close();