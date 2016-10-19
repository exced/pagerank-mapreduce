var mongoose = require('mongoose');
config = require('../config/database');
var View = require('../models/view');

/*
* pseudo-random int \in [low, high]
*/
function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/* inserting some random datas ... */
urls = [
    "/",
    "/edmond",
    "/ksander",
    "/basile"//,
    // "/ulrich",
    // "/schaal",
    // "/theo"
];
for (var i = 0; i < 100; i++) {
    var view = View({
        url: urls[randomIntInc(0, urls.length - 1)],
        user_id: randomIntInc(0, 3),
        hour: randomIntInc(0, 3)
    });
    view.save(function (err, newView) {
        if (err) throw err;
    });
}

mongoose.connection.close();