"user strict";

var koala = require('koala')
  , render = require('koa-ejs')
  , router = require('koa-router')
  , statics = require('koa-static')
  , logger = require('koa-logger')
  , path = require('path')
  , stylus = require('stylus')
  , app = koala()
  ;
app.use(router(app));

var config = {
  port: 9501
};

var locals = {
  version: '0.0.1',
  now: function () {
    return new Date();
  },
  ip: function *() {
    // yield wait(100);
    return this.ip;
  },
};

var filters = {
  format: function (time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
  }
};




render(app, {
  root: path.join(__dirname, 'view')
  , layout: 'index'
  , viewExt: 'html'
  , open: '<ejs>'
  , close: '</ejs>'
  , cache: false
  , debug: true
  , locals: locals
  , filters: filters
});

// stylus
// app.use(function *(next) {
//   yield function(req, res) {
//     return function(callback) {
//       // console.log(stylus,'\n', path.join(__dirname, './style/index.styl'), '\n', path.join(__dirname, '../public/'))
//
//       stylus.middleware({
//         src: path.join(__dirname, './style/index.styl'),
//         dest: path.join(__dirname, '../public')
//       })(req, res, callback);
//     }
//   }(this.req, this.res);
//   yield next;
// });
app.use(statics(path.join(__dirname, '../public')));

app.use(function *() {
    yield this.render('index');
});

app.get('/list/:id', function *(next) {
  var _param = this.params.id;
  // this.body = user;
  yield this.render('index',{
    'date':_param
  })
});

app.listen(config.port);

console.log('app run , and port is '+ config.port)
