const axios = require('axios');
const cheerio = require('cheerio');

/**
 * 得到所有电影的html字符串
 */
async function getMovieHtml() {
    const resp = await axios.get('https://movie.douban.com/chart');
    return resp.data;
}

/**
 * 分析tr，得到一部电影对象
 * @param {*} tr 
 */
function getMovie(tr) {
    var name = tr.find('div.pl2 a').text();
    name = name.replace(/\s/g, ''); //去掉空白符
    name = name.split('/')[0];

    var imgSrc = tr.find('a.nbg img').attr('src');
    var detail = tr.find('div.pl2 p.pl').text();
    return {
        name,
        imgSrc,
        detail
    }
}

/**
 * 获取所有电影的数据
 */
async function getMoviesData() {
    const html = await getMovieHtml();
    const $ = cheerio.load(html);
    var trs = $('tr.item');
    var movies = [];
    for (let i = 0; i < trs.length; i++) {
        var tr = trs[i];
        // 分析每个tr数据，得到一部电影对象
        var m = getMovie($(tr));
        movies.push(m);
    }
    return movies;
}

module.exports = getMoviesData;