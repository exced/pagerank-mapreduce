var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  _id: String,
  value: {
    url: String,
    pg: Number,
    links: [String]
  }
});

module.exports = mongoose.model('Page', pageSchema);