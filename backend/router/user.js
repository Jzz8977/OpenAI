const express = require('express')
const Result = require('../models/Result')
const router = express.Router()
const { login,findUser } = require('../services/user')
const { md5,decoded } = require('../utils')
const { PWD_SALT, JWT_EXPIRED, PRIVATE_KEY } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken');


router.get('/info', function (req, res) {
  // res.json('user info...')
  let decode = decoded(req);
  console.log(decode,'123123')
  if(decode && decode.username){
    findUser(decode.username).then(user=>{
      if(user){
        user.roles = [user.role]
        new Result(user,'用户查询成功').success(res)
      } else {
        new Result(user,'此用户查询失败').fail(res)
      }
    }).catch(err=>{
      new Result('查询失败').fail(res)
    })
  } else {
    new Result('用户信息查询失败').fail(res)
  }
  
})


router.post('/login', [
  body('username').isString().withMessage('用户名必须是字符'),
  body('password').isString().withMessage('密码必须是字符'),
], function (req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;
    password = md5(`${password}${PWD_SALT}`)
    login(username, password).then(user => {
      if (!user || user.length === 0) {
        new Result('账号或密码错误').fail(res);
      } else {
        const  token = jwt.sign(
          { username },
          PRIVATE_KEY,
          {expiresIn: JWT_EXPIRED}
        )
        new Result({token}, '登录成功').success(res);
         
      }
    })
  }


})
module.exports = router