const fs = require('fs');
const getMovie = require('./getMovie');


getMovie().then(movies => {
    const json = JSON.stringify(movies);
    fs.writeFile(__dirname + '/movie.json', json, function() {
        console.log('成功');
    })
})