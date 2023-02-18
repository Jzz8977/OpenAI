const { query,queryOne } = require('../db');
const { user } = require('../db/sql')
function login(username, password) {
    return query(`select * from admin_user where username='${username}' and password='${password}'`);
}
function findUser(username) {
    return queryOne(`select * from admin_user where username = '${username}'`)
}

module.exports = {
    login,
    findUser,
};

