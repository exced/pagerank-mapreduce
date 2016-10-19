var uuid = require('uuid');

module.exports = {
    database: 'mongodb://localhost/pagerank',
    secret: uuid.v4()
};
