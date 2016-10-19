var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vertexSchema = new Schema({  
  color: String,
  label: String
});

module.exports = mongoose.model('Vertex', vertexSchema);