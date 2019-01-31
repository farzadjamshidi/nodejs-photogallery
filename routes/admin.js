var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer ({dest:'./public/images/portfolio'});
var mysql = require('mysql');

var connection = mysql.createConnection({
      host: 'localhost',
      user : 'root',
      password : '',
      database: 'nodejs'
});

connection.connect();


/* GET home page. */
router.get('/', function(req, res, next) {      

      connection.query("select * from projects", function(err, rows, fields){

            if (err) {
                  throw err;
                  
            } else {
                  
            
            console.log('admin-index');
            res.render('admin/index', {
                  'projects': rows
            });
            }

      });
  
});

router.get('/add', function(req, res, next) {      

      res.render('admin/add');
  
});

router.post('/add', upload.single('image'), function(req, res, next) {      

      var title = req.body.title;
      var service = req.body.service;
      var client = req.body.client;
      var url = req.body.url;
      var projectdate = req.body.date;
      var description = req.body.description;
      

      if(req.file){
            var projectImage = req.file.filename;

      }else{
            var projectImage = 'noimage.jpg';
      }

      req.checkBody('title','title is required').notEmpty();

      var errors = req.validationErrors();

      if (errors) {
            res.flash('danger', errors)
      } else {
            
            var project = {
                  title:title,
                  service:service,
                  client:client,
                  url:url,
                  date:projectdate,
                  description:description,
                  image:projectImage

            };

            var query = connection.query('INSERT INTO projects SET ?', project, function(err,result){
                  console.log('error '+err);
                  console.log('success '+result);
            });

            req.flash('success_msg', 'Preject added successfully');
            res.redirect('/admin');


      }

});

router.get('/edit/:id', function(req, res, next) {      

      connection.query("select * from projects Where id = "+req.params.id, function(err, rows, fields){

            if (err) {
                  throw err;
                  
            } else {
                  
            
            
            res.render('admin/edit', {
                  'project': rows[0]
            });
            }

      });
  
});

router.post('/edit/:id', upload.single('image'), function(req, res, next) {      

      var title = req.body.title;
      var service = req.body.service;
      var client = req.body.client;
      var url = req.body.url;
      var projectdate = req.body.date;
      var description = req.body.description;
      

      if(req.file){
            var projectImage = req.file.filename;

      }else{
            var projectImage = 'noimage.jpg';
      }

      req.checkBody('title','title is required').notEmpty();

      var errors = req.validationErrors();

      if (errors) {
            res.flash('danger', errors)
      } else {
            
            var project = {
                  title:title,
                  service:service,
                  client:client,
                  url:url,
                  date:projectdate,
                  description:description,
                  image:projectImage

            };

            var query = connection.query('UPDATE projects SET ? Where id = '+req.params.id, project, function(err,result){
                  console.log('error '+err);
                  console.log('success '+result);
            });

            req.flash('success_msg', 'Preject updated successfully');
            res.redirect('/admin');


      }

});

router.delete('/delete/:id', function(req, res, next) {      

            connection.query('DELETE from projects Where id = '+req.params.id, function(err,result){
                  console.log('error '+err);
                  console.log('delete '+result.affectedRows+' row(s)');
            });   

});


module.exports = router;
