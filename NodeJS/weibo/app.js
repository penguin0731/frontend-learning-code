// cherrio 是 nodejs 的抓取页面模块，为服务器特别定制的jQuery核心实现。
// 适合各种 Web 爬虫程序。node.js 版的 jQuery
const cheerio = require('cheerio');
// superagent 是一个轻量级、渐进式的请求库，内部依赖 nodejs 原生的请求 api,适用于 nodejs 环境。
const superagent = require('superagent');
const fs = require('fs');
const nodeSchedule = require("node-schedule"); // 定时任务

const weiboURL = "https://s.weibo.com";
const hotSearchURL = weiboURL + "/top/summary?cate=realtimehot";

function getHotList() {
    return new Promise((resolve, reject) => {
        superagent.get(hotSearchURL, (err, res) => {
            if (err) console.error(err);
            const $ = cheerio.load(res.text);
            var hotList = [];
            $('#pl_top_realtimehot table tbody tr').each(function(index) {
                if(index !== 0) {
                    const $td = $(this).find('td').eq(1);
                    const link = weiboURL + $td.find('a').attr('href');
                    const text = $td.find('a').text();
                    const hotValue = $td.find('span').text();
                    const icon = $td.find('img').attr('src') ? 'http:' + $td.find('img').attr('src') : '';
                    hotList.push({
                        index,
                        link,
                        text,
                        hotValue,
                        icon
                    });
                }
            });
            hotList.length ? resolve(hotList) : reject('error');
        });
    })
}

async function writeFile() {
    const hotList = await getHotList();
    // 写入文件
    fs.writeFileSync(`${__dirname}/hotSearch.json`, JSON.stringify(hotList), 'utf-8');
}
writeFile();

// // 设置定时任务 每分钟执行一次
// nodeSchedule.scheduleJob('0 1 * * * *', async function() {
//     try{
//         const hotList = await getHotList();
//         // 写入文件
//         fs.writeFileSync(`${__dirname}/hotSearch.json`, JSON.stringify(hotList), 'utf-8');
//     }catch(e) {
//         console.log(e);
//     }
// });


