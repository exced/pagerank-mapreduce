var mongoose = require('mongoose');
config = require('../config/database');
var Edge = require('../models/edge');
var Vertex = require('../models/vertex');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/* drop Edge collection for this exercize */
Edge.remove({}, function (err) {
    if (err) throw err;
    console.log('Edge collection removed')
});

/* drop Vertex collection for this exercize */
Vertex.remove({}, function (err) {
    if (err) throw err;
    console.log('Vertex collection removed')
});

mongoose.connection.close();