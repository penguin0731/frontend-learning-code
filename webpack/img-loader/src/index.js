
var imgSrcJpg = require('./assets/penguin.jpg');
console.log(imgSrcJpg)

var imgSrc = require('./assets/webpack.png');
console.log(imgSrc);
var img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);
