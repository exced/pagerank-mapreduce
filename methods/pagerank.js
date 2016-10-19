var mongoose = require('mongoose');
config = require('../config/database');
var View = require('../models/view');

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

/*
* count the occurence of an URL with mapReduce
*/
var o = {};
o.map = function () {
    emit({ url: this.url, user_id: this.user_id, hour: this.hour }, 1)
};
o.reduce = function (k, vals) {
    return vals.length
};
View.mapReduce(o, function (err, results) {
    if (err) throw err;
    console.log(results)
});

mongoose.connection.close();
