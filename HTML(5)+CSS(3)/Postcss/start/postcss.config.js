const autofixer = require("autoprefixer");
module.exports = {
  map: false, // 是否内联sourcemap
  plugins: [
    autofixer()
  ],
};
