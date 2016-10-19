var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* both oriented and non-oriented edge, depending on how you evaluate it */
var edgeSchema = new Schema({
    id: String,
    color: String,
    label: String,
    source: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    weight: Number,
    step: Number // iteration loop
});

module.exports = mongoose.model('Edge', edgeSchema);