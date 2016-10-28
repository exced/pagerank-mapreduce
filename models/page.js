var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  url: String,  
  pg: Number,
  links: [String]
});

module.exports = mongoose.model('Page', pageSchema);