var mongoose = require('mongoose');
config = require('../config/database');
var Page = require('../models/page');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/* drop Page collection for this exercize */
Page.remove({}, function (err) {
    if (err) throw err;
    console.log('Page collection removed')
});

mongoose.connection.close();