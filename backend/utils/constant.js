const {env} = require('./env')
const UPLOAD_PATH = env ==='dev'?'upload':'';
const UPLOAD_URL = env ==='dev'?'http://localhost:8089/upload':''
module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    CODE_TOKEN_EXPIRED: -200,
    debug: true,
    PWD_SALT: 'admin_imooc_node',
    PRIVATE_KEY: 'admin_imooc_node_test_youbaobao_xyz',
    JWT_EXPIRED: 60 * 60,
    UPLOAD_PATH,
    UPLOAD_URL,
    MIME_TYPE_EPUB:'application/epub+zip'
  }
  