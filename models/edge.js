var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* both oriented and non-oriented edge, depending on how you evaluate it */
var edgeSchema = new Schema({
    color: String,
    label: String,
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vertex',
        required: true
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vertex',
        required: true
    },
    weight: Number
});

module.exports = mongoose.model('Edge', edgeSchema);