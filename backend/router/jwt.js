const jwt = require('express-jwt');
const { PRIVATE_KEY }= require('../utils/constant')


module.exports = jwt({
    secret: PRIVATE_KEY,
    ccredentialsRequired : true
}).unless({
    path:[
        '/',
        '/user/login'
    ]
})