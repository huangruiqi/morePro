module.exports = function (app) {

  app.get('/', function (req, res) {
    res.send('index')
  })

  // 用户相关(包括登录和注册)
  app.use('/api/user', require('./user'))

  // 课程相关
  app.use('/api/lesson', require('./lesson'))

  // 班级相关
  app.use('/api/class', require('./classes'))

  // 任务管理
  app.use('/api/workManage', require('./workManage'))

  // 上传作业
  app.use('/api/uploadWork', require('./uploadWork'))

  // 成果评价——课程列表
  app.use('/api/lessonManage', require('./lessonManage'))

  // 成绩管理
  app.use('/api/gradeManage', require('./gradeManage'))

  // 基于任务的评论
  app.use('/api/comment', require('./comment'))

  // 任务路由
  app.use('/api/studyFile', require('./studyFile'))

  // 在线帮助（待修改）
  app.use('/api/topic', require('./topic'))

  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}