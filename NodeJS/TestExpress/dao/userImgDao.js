var dbutil = require("./dbutil");

//新增用户头像
function insertUserImg(name, imgPath, originName, imgSize, success) {
    var insertSql = 'insert into user_img(name, img_path, origin_name, img_size) values(?, ?, ?, ?);';
    var params = [name, imgPath, originName, imgSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            // console.log(result);
            success(result);
        }else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports = {
    insertUserImg,
}
