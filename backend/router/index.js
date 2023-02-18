const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const bookRouter = require('./book')
const Result = require('../models/Result')

const jwtAuth = require('./jwt')
// 注册路由
const router = express.Router()

router.use(jwtAuth)
router.get('/', function (req, res) {
    res.send('欢迎学习')
})

// 对路由处理进行解耦
// 通过book的路由
router.use('/book', bookRouter)

// 通过 userRouter 来处理 /user 路由
router.use('/user', userRouter)


/**
    集中处理 404请求的中间件
    注意：该中间件必须放在正常处理流程之后
    否则，会拦截正常请求
*/
router.use((req, res, next) => {
    next(boom.notFound('接口不存在'))
})

/**
 * 自定义路由处理中间件
 * 注意两点
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 */
router.use((err, req, res, next) => {
    if (err.name && err.name === 'UnauthorizedError') {
        const { status = 401, message } = err;
        new Result(null, 'token验证失败', {
            error: status,
            errMsg: message
        }).jwtError(res.status(status))
    } else {
        const msg = (err && err.message) || '系统错误'
        const statusCode = (err.output && err.output.statusCode) || 500;
        const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
        new Result(null, msg, {
            error: statusCode,
            errorMsg
        }).fail(res.status(statusCode))
    }

})

module.exports = router