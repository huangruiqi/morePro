const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const Classes = require('../models/Classes.js')
const Student = require('../models/Student.js')
const Teacher = require('../models/Teacher.js')
const LessonSelect = require('../models/LessonSelect.js')
const Grade = require('../models/Grade.js')
const multipart = require('connect-multiparty')
const node_xlsx = require('node-xlsx').default
const multipartMiddleware = multipart()
const sha1 = require('sha1')
const url = require('url')
const fs = require('fs')

// 新建班级
router.post('/add', multipartMiddleware, function(req, res, next) {
    const { number } = req.body
    Classes.find({ number }, (err, docs) => {
        if (docs.length > 0) {
            res.json({
                status: 0,
                data: '该课程已经存在'
            })
        } else {
            Classes.create(req.body, function(err) {
                if (err) {
                    res.json({
                        status: 0,
                        data: '添加班级失败'
                    })
                } else {
                    const { name, number, lessonNumber, lessonId, lessonName, teacherId, teacherName } = req.body
                    // 导入选课关系名单
                    const result = node_xlsx.parse(req.files.lessonSelectList.path)[0].data
                    const list = result.slice(1, result.length)
                        .filter((item, i) => {
                            return item.length > 0 ? true : false
                        })
                        .map((item, i) => {
                            return {
                                name: item[0],
                                number: item[1],
                                classNumber: number,
                                className: name,
                                lessonNumber,
                                lessonId,
                                lessonName,
                                teacherId,
                                teacherName,
                            }
                        })
                    // 创建成绩表 by HJ
                    const gradeList = result.slice(1, result.length)
                        .filter((item, i) => {
                            return item.length > 0 ? true : false
                        })
                        .map((item, i) => {
                            return {
                                name: item[0],
                                number: item[1],
                                classId: number,
                            }
                        })
                    Grade.insertMany(gradeList, function(err) {});
                    LessonSelect.insertMany(list, function(err){
                        if (err) {
                            res.json({
                                status: 0,
                                data: '添加班级失败'
                            })
                        } else {
                            res.json({
                                status: 1,
                                data: '添加班级成功'
                            })
                        }
                    })
                }
            })
        }
    })

})

// 编辑班级
router.post('/edit', multipartMiddleware, function(req, res, next) {
    const { _id, name } = req.body
    Classes.update({ _id }, { name }, function(err, docs) {
        if (err) {
            res.json({
                status: 0,
                data: '编辑班级失败'
            })
        } else {
            res.json({
                status: 1,
                data: '编辑班级成功'
            })
        }
    })
})

// 下线 or 上线班级
router.post('/offline', function(req, res, next) {
    const { id, status } = req.body;
    const { _id, name } = req.body;
    Classes.update({ _id: id }, { status }, function(err, docs) {
        if (err) {
            res.json({
                status: 0,
                // data: '下线班级失败'
            })
        } else {
            res.json({
                status: 1,
                // data: '下线班级成功'
            })
        }
    })
})

// 获取单个班级信息
router.get('/:number', function(req, res, next) {
    Classes.find({ number: req.params.number }, function(err, docs) {
        if (err) {
            res.send({
                status: 0,
            })
        } else {
            res.send({
                status: 1,
                data: docs[0] || {}
            })
        }
    })
});

// 获取班级选课名单
router.get('/student/:number', function(req, res, next) {
    LessonSelect.find({ classNumber: req.params.number }, function(err, docs) {
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

// 获取班级列表
router.get('/', function(req, res, next) {
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

module.exports = router