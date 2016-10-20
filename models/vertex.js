var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Edge = new Schema({
    id: String,
    color: String,
    label: String,
    source: String,
    target: String,
    weight: Number
});

var vertexSchema = new Schema({
  id: String,  
  color: String,
  label: String,
  weight: Number,
  outlinkList: [Edge],
  inlinkList: [Edge]
});

module.exports = mongoose.model('Vertex', vertexSchema);