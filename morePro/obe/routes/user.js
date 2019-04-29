const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const Classes = require('../models/Classes.js')
const Student = require('../models/Student.js')
const Teacher = require('../models/Teacher.js')
const multipart = require('connect-multiparty')
const node_xlsx = require('node-xlsx').default
const multipartMiddleware = multipart()
const sha1 = require('sha1')
const url = require('url')
const fs = require('fs')

// 用户注册
router.post('/regist', function(req, res, next) {
  const user = req.body || {}
  const { number } = user
  Student.find({ number }, (err, docs) => {
    if (err) {
      res.json({
          status: 0,
          data: '注册失败'
      })
    }
    if (docs.length > 0) {
      res.json({
          status: 0,
          data: '该学号已存在'
      })
    } else {
      user.password = sha1(user.password)
      Student.create(user, function(err){
          if (err) {
            res.json({
                status: 0,
                data: ' 创建账号失败'
            })
          } else {
            res.json({
                status: 1,
                data: '注册成功'
            })
          }
      })
    }
  })
})

// 用户登录
router.post('/login', function(req, res, next) {
    const { type, number, password } = req.body
    const Conf = {
        student: {
            model: Student,
        },
        teacher: {
            model: Teacher
        },
    }
    Conf[type].model.find({ number, password: sha1(password) }, (err, docs) => {
        if (err) {
            res.json({
                status: 0,
                data: '登录失败'
            })
        }
        if (docs.length > 0) {
            if (!req.session.user) {
                req.session.user = {
                    type,
                    id: docs[0]._id
                }
            }
            res.json({
                status: 1,
                data: '登录成功'
            })
        } else {
            res.json({
                status: 0,
                data: '该用户不存在或密码错误'
            })
        }
    })

})

// 用户注销
router.post('/logout', function(req, res, next) {
    req.session.user = null
    res.json({
        status: 1,
        data: '注销成功'
    })
})

// 教师名单上传
router.post('/teacher/add', function(req, res, next) {
    let form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        const obj = files.file
        // 获得文件的临时路径
        const result = node_xlsx.parse(obj.path)[0].data
        const list = result.slice(1, result.length)
            .filter((item, i) => {
                return item.length > 0 ? true : false
            })
            .map((item, i) => {
                return {
                    name: item[0],
                    number: item[1],
                    academic: item[2],
                    password: sha1('123456'),
                }
            })
        Teacher.insertMany(list, function(err) {
            if (err) {
                res.json({
                    status: 0,
                    data: '导入教师名单失败'
                })
            } else {
                res.json({
                    status: 1,
                    data: '导入教师名单成功'
                })
            }
        })
    })
})

// 获取教师列表
router.get('/teacher/', function(req, res, next) {
    Teacher.find({}, function(err, docs) {
        if (err) {
            res.send({
                status: 0
            })
        } else {
            res.send({
                status: 1,
                data: docs
            })
        }
    })
})

// 学生名单上传（以班级为单位）- 废弃：直接使用用户注册
router.post('/class/add', multipartMiddleware, function(req, res, next) {

    // 新建班级
    Classes.create(req.body, function(err){
        if (err) {
            res.json({
                status: 0,
                data: '添加班级失败'
            })
        } else {
            // 导入学生名单
            const result = node_xlsx.parse(req.files.studentList.path)[0].data
            const list = result.slice(1, result.length)
                .filter((item, i) => {
                    return item.length > 0 ? true : false
                })
                .map((item, i) => {
                    return {
                        name: item[0],
                        number: item[1],
                        academic: item[2],
                        class: item[3],
                        major: item[4],
                        password: '123456',
                    }
                })
            Student.insertMany(list, function(err){
                if (err) {
                res.json({
                    status: 0,
                    data: '导入学生名单失败'
                })
                } else {
                res.json({
                    status: 1,
                    data: '导入学生名单成功'
                })
                }
            })
        }
    })
})

// 获取学生列表
router.get('/student/', function(req, res, next) {
    Student.find({}, { password: 0 },function(err, docs) {
        if (err) {
            res.send({
                status: 0
            })
        } else {
            res.send({
                status: 1,
                data: docs
            })
        }
    })
})

// 获取班级列表 - 废弃：转移到班级管理
router.get('/class/', function(req, res, next) {
    Classes.find({}, function(err, docs) {
        if (err) {
            res.send({
                status: 0
            })
        } else {
            res.send({
                status: 1,
                data: docs
            })
        }
    })
})

// 获取用户信息
router.get('/', function(req, res, next) {
    // console.log('[USER]req.session: ', req.session)
    if (!req.session.user) {
        res.send({
            status: 0,
            data: {
                user: {},
                isLogin: false,
            }
        })
    } else {
        const { id, type } = req.session.user
        const Conf = {
            student: {
                model: Student,
            },
            teacher: {
                model: Teacher
            },
        }
        Conf[type].model.find({ _id: id }, { password: 0 }, (err, docs) => {
            if (err) {
                res.send({
                    status: 0,
                    data: {
                        user: docs[0],
                        isLogin: false,
                    }
                })
            }
            if (docs.length > 0) {
                const user = JSON.parse(JSON.stringify(docs[0]))
                user.type = type || ''
                res.send({
                    status: 1,
                    data: {
                        user,
                        isLogin: true,
                    }
                })
            } else {
                res.send({
                    status: 0,
                    data: {
                        user: {},
                        isLogin: false,
                    }
                })
            }
        })
    }
})

module.exports = router;