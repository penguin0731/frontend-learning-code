const express = require('express');
const server = express();
const Vue = require('vue');



const render = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf8')
});

server.get("*", (req, res) => {
    const app = createApp();
    render.renderToString(app, (err ,html) => {
        res.end(html);
    })
})


server.listen(12306, () => {
    console.log("server is running in 12306");
});