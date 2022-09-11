module.exports = {
    devServer: {
        // 代理
        proxy: {
            '/api/student/findAll': {
                target: 'http://open.duyiedu.com'
            }
        }
    },
}