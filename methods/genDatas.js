var mongoose = require('mongoose');
config = require('../config/database');
var Page = require('../models/page');

/* helper functions */

/* keep only the unique var in tab */
// usage example:
// var a = ['a', 1, 'a', 2, '1'];
// var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
/* contains function test array */
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj)
            return true;
    }
    return false;
}

/* mongoDB connection */
mongoose.connect(config.database);

mongoose.connection.on('open', function (err) {
    if (err) throw err;
});

const NUM_PAGES = 4;

/* defining pages ... */
var pages = [
    {
        url: 'A',
        pg: 1 ,
        links: ['B', 'C']
    },
    {
        url: 'B',
        pg: 1 ,
        links: ['C']
    },
    {
        url: 'C',
        pg: 1 ,
        links: ['A']
    },
    {
        url: 'D',
        pg: 1 ,
        links: ['C']
    }
];

/* add twice page which has not been linked by others 
Mongoose MapReduce does not reduce element if only one key has been emitted
Here is a little hack to get theses pages reduced 
*/
var allLinks = [];
for (var i = 0; i < pages.length; i++) {
    /* collect links name */
    for(var j = 0; j < pages[i].links.length; j++){
        allLinks.push(pages[i].links[j]);
    }
}
/* uniques */
allLinks.filter(onlyUnique);
var pagesToAdd = [];
/* add the unlinked page */
for(var i = 0; i < pages.length; i++){
    if(!allLinks.contains(pages[i].url))
        pagesToAdd.push(pages[i]);
}
pagesToAdd.forEach(function pushPages(elt, index, array){
    pages.push(elt);
});

/* save pages ... */
pages.forEach(function savePages(elt, index, array) {
    Page(elt).save(function (err, newPage) {
        if (err) throw err;
    });
});

mongoose.connection.close();