var uuid = require('uuid');

module.exports = {
    database: 'mongodb://localhost/mapreduce',
    secret: uuid.v4()
};
