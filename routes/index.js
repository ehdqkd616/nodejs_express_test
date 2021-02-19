var express = require('express');
var router = express.Router();
const { Connection, Request } = require("tedious");

// Create connection to database
var config = {
  authentication: {
    options: {
      userName: 'user', // userName
      password: 'user'  // password
    },
    type: 'default'
  },
  server: '127.0.0.1',  // server 주소  
  options: {
    database: 'express',  // database name
    encrypt: true
  }
}; 

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
  // If no error, then good to proceed.  
  if (err) {
    // console.error(err.message);
    console.error(err);
  } else {
    console.log("Connected");
    queryDatabase();
  }
});  

connection.connect();

function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request("select * from TEST;", function (err) {  
      if (err, rowCount) {  
        console.log(err);  
      } else {
        console.log(`${rowCount} row(s) returned`);
        connection.close();
      }
    }
  );
  
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });     
  
  connection.execSql(request);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/get', function(req, res, next) {
  
  var queryString = req.query;
  var queryString_json = JSON.stringify(queryString);

  insert(queryString_json);
  res.end('Get Insert Success')
  // res.send(queryString);
  // res.render('index', { title: `Get Parameter : ${queryString} `});
});

/* GET home page. */
router.post('/post', function(req, res, next) {

  var body = req.body;
  var body_json = JSON.stringify(body);

  insert(body_json);
  res.end('Post Insert Success');
  // res.send(body);
  // res.render('index', { title: `Post Parameter : ${body} `});
});

function insert(data) {  
  
  var sql = `INSERT INTO TEST(JSON_DATA, TIME) VALUES(${data}, GETDATE())`;
  
  request = new Request(sql, function(err) {  
  
  if (err) {  
      console.log(err);}  
  });
  
  connection.execSql(request);  
}  

module.exports = router;
