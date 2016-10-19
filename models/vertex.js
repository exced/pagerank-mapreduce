var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vertexSchema = new Schema({
  id: String,  
  color: String,
  label: String,
  weight: Number,
  step: Number // iteration loop
});

module.exports = mongoose.model('Vertex', vertexSchema);