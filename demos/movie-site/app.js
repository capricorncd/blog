var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
// 新模块替换老模块
var _ = require('underscore')
var Movie = require('./models/movie')
var PORT = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

// 设置view视图文件目录
app.set('views', './views/pages')
app.set('view engine', 'jade')
// 格式化表单数据
app.use(express.bodyParser())
// 配置静态资源目录
app.use(express.static(path.join(__dirname, 'bower_components')))
// 本地变量
app.locals.moment = require('moment')
app.listen(PORT)

console.log('app started on port ' + PORT)

// index page
app.get('/', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('index', {
      title: '首页 INDNEXZ',
      movies: movies
    })
  })
})

// detail page
app.get('/movie/:id', function (req, res) {
  var id = req.params.id
  Movie.findById(id, function (err, movie) {
    res.render('detail', {
      title: movie.title,
      movie: movie
    })
  })
})

// admin page
app.get('/admin/movie', function (req, res) {
  res.render('admin', {
    title: '后台 录入',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  })
})

// admin update movie
app.get('/admin/update/:id', function (req, res) {
  var id = req.params.id
  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: '后台 更新',
        movie: movie
      })
    })
  }
})

// admin post movie
app.post('/admin/movie/new', function (req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie
  if (id !== 'undefined') {
    Movie.findById(id, function (err, data) {
      if (err) {
        console.log(err)
      }
      _movie = _.extend(data, movieObj)
      _movie.save(function (err2, movie) {
        if (err2) {
          console.log(err2)
        }
        // 跳转至详情页面
        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new Movie({
      title: movieObj.title,
      doctor: movieObj.doctor,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })
    _movie.save(function (err, movie) {
      if (err) {
        console.log(err)
      }
      // 跳转至详情页面
      res.redirect('/movie/' + movie._id)
    })
  }
})


// list page
app.get('/admin/list', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err)
    }
    res.render('index', {
      title: '电影列表',
      movies: movies
    })
  })
})
