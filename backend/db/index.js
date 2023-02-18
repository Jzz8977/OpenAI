const mysql = require('mysql');
const config = require('./config')
const { debug } = require('../utils/constant')
function _connect() {
    const pool = mysql.createPool(config.mysql)
    return pool
}
function query(sqlStr) {
    let pool = _connect();
    debug && console.log(sqlStr, '111111111111111')
    return new Promise((resolve, reject) => {
        // 从连接池里面拿一个连接
        pool.getConnection(function (err, connection) {
            if (err) {
                debug && console.log('连接数据库失败,原因:' + JSON.stringify(err));
                return reject(err)
            }
            connection.query(sqlStr, (error, ...args) => {
                // 操作结束尽早释放连接
                connection.release();
                if (error) {
                    debug && console.log('查询失败,原因:' + JSON.stringify(err));
                    return reject(error)
                };
                // debug && console.log('查询成功:' + JSON.stringify(args));
                resolve(...args)
            });
        });
    })
}

function queryOne(sqlStr) {
    debug && console.log(sqlStr, '111111111111111')
    return new Promise((resolve, reject) => {
        // 从连接池里面拿一个连接
        query(sqlStr).then(result => {
            debug && console.log(sqlStr, '******')
            if (result && result.length > 0) {
                resolve(result[0]);
            } else {
                reject(null);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

function insert(model, tableName) {
    return new Promise((resolve, reject) => {
        if (!Object.prototype.toString.call(model) === "[object Object]") {
            reject('添加图书对象不合法')
        } else {
            const keys = []
            const values = []
            Object.keys(model).forEach(key => {
                console.log('eky', key, model[key])
                if (model.hasOwnProperty(key)) {
                    keys.push(`\`${key}\``)
                    values.push(`'${model[key] || null}'`)
                }
            })
            if (keys.length > 0 && values.length > 0) {
                let sql = `INSERT INTO \`${tableName}\`(`
                const keysString = keys.join(',')
                const valuesString = values.join(',')
                sql = `${sql}${keysString}) VALUES(${valuesString})`
                debug && console.log(sql, '222')
            }
        }

        // 从连接池里面拿一个连接
        query(sqlStr).then(result => {
            debug && console.log(sqlStr, '******')
            if (result && result.length > 0) {
                resolve(result[0]);
            } else {
                reject(null);
            }
        }).catch(err => {
            reject(err);
        })
    })
}
module.exports = {
    query,
    queryOne,
    insert
}