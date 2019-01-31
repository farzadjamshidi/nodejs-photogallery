var express = require('express');
var router = express.Router();
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
                  
            
            console.log('index');
            res.render('index', {
                  'projects': rows
            });
            }

      });
      

  
});

module.exports = router;
