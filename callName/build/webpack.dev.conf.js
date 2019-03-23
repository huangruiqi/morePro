'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//mook数据
const express = require('express');
const app = express();
const fs = require('fs');

var appData = require('../static/data.json');
var seat = require("../static/seat.json");
// var seat = seat2.stringify;
var student = seat.student;
var information = appData.information;
var season = appData.season;

var apiRoutes = express.Router();
app.use('/api', apiRoutes);

//增加
function writeJson(params) {
  //现将json文件读出来
  fs.readFile(path.join(__dirname, '../static/seat.json'), 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
    let person = JSON.parse(data);//将字符串转换为json对象
    person.student.push(params);//将传来的对象push进数组对象中
    // person.total = person.data.length;//定义一下总条数，为以后的分页打基础
    var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(path.join(__dirname, '../static/seat.json'), str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('----------新增成功-------------');
    })
  })
}
// 修改
function changeJson(id, params) {
  fs.readFile(path.join(__dirname, '../static/seat.json'), 'utf8' , function (err, data) {
    if (err) {
      console.error(err);
    }
    var person = JSON.parse(data);
    //把数据读出来,然后进行修改
    for (var i = 0; i < person.student.length; i++) {
      if (id == person.student[i].id) {
        for (var key in params) {
          if (person.student[i][key]) {
            person.student[i][key] = params[key];
          }
        }
      }
    }
    person.total = person.student.length;

    var str = JSON.stringify(person);
    //console.log(str);
    fs.writeFile(path.join(__dirname, '../static/seat.json'), str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('--------------------修改成功');
      // console.log(person.data);
    })
  })
}
//查找是否存在
function indexStudent(num) {
  for (var i = 0; i < student.length; i++) {
    if (num == student[i].id) {
      return true;
    }
  }
  return false;
}
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.get('/api/information', function (req, res) {
        res.json({
          erron: 0,
          information: information,
          season: season
        });
      });
      app.get('/api/seat', function (req, res) {
        // res.send(123);
        if (!indexStudent(req.query.id)) {
          writeJson(req.query);
        }else {
          changeJson(req.query.id, req.query);
        }
      });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
