var express = require('express');
var router = express.Router();
const { Connection, Request } = require("tedious");
const TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
  authentication: {
    options: {
      userName: 'yw', // userName
      password: 'yw'  // password
    },
    type: 'default'
  },
  server: '192.168.10.225',  // server 주소  
  options: {
    database: 'YW_Test',  // database name
    encrypt: false
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
    // queryDatabase();
  }
});  

connection.connect();

function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request("select * from TEST;", function (err, rowCount) {  
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



router.get('/get_sql', function(req, res, next) {
  
  var queryString = req.query;
  var queryString_json = JSON.stringify(queryString);
  insert(queryString_json);

  res.end('Get_SQL Insert');
  // res.send(queryString);
  // res.render('index', { title: `Get Parameter : ${queryString} `});
});


router.get('/get_procedure', function(req, res, next) {
  
  var queryString = req.query;
  var queryString_json = JSON.stringify(queryString);
  insert_procedure(queryString_json);

  res.end('Get_PROCEDURE Insert');
  // res.send(queryString);
  // res.render('index', { title: `Get Parameter : ${queryString} `});
});


router.post('/post_sql', function(req, res, next) {

  var body = req.body;
  var body_json = JSON.stringify(body);
  insert(body_json);

  res.end('Post_SQL Insert');
  // res.send(body);
  // res.render('index', { title: `Post Parameter : ${body} `});
});

router.post('/post_procedure', function(req, res, next) { // 프로시저 이용

  var body = req.body;
  var body_json = JSON.stringify(body);
  insert_procedure(body_json);
  
  res.end('Post_PROCEDURE Insert');
  // res.send(body);
  // res.render('index', { title: `Post Parameter : ${body} `});
});

function insert(data, result) {
  
  var sql = `INSERT INTO TEST(JSON_DATA, INSERT_TIME) VALUES('${data}', GETDATE())`;
  var result = "";

  console.log(sql); // sql syntax 에러 발생시 sql문을 log로 출력해본다.!!!!!!!!
  
  request = new Request(sql, function(err) {  
  
    if (err) {  
      console.log(err);
      result = 'Error Occurred!!!';
    }else{
      console.log('Insert 성공');
      result = 'Insert Success!';
    }
  });
  
  connection.execSql(request);

} 

function insert_procedure(data) {  
  
  var sql = 'INSERT_PROCEDURE';
  var result = "";
  
  // console.log(sql); // sql syntax 에러 발생시 sql문을 log로 출력해본다.!!!!!!!!
  
  request = new Request(sql, function(err, rowCount, rows) {  
    
    if (err) { // 에러 발생 시
      console.log("request err : " + err);
      console.log('-------------------------------------');
      result = 'Error Occurred!!!';
    }else{  // 요청 성공 시
      console.log("request rowCount : " + rowCount);
      console.log("request rows : " + rows);
      console.log('-------------------------------------');
      result = 'Insert Success!';
    }
  });
  
  request.addParameter('json_data', TYPES.NVarChar, data);
  // request.addOutputParameter('id', TYPES.Int);
  
  request.on('columnMetadata', function (columns) {
    columns.forEach(function (column) {
      console.log("event olumnMetadata");
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
    console.log('-------------------------------------');
  });   
  
  request.on('prepared', function () {
    console.log('event prepared');
    console.log('-------------------------------------');
  });
  
  request.on('error', function (err) {
    console.log('error : '+err);
    console.log('-------------------------------------');
  });
  
  request.on('requestCompleted', function () {
    console.log('event requestCompleted');
    console.log('-------------------------------------');
  });
  
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      console.log("event row");
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
    console.log('-------------------------------------');
  });
  
  request.on('done', function (rowCount, more, rows) {
    console.log('event requestCompleted');
    console.log('rowCount : ' + rowCount);
    console.log('more : ' + more);
    console.log('rows : ' + rows);
    console.log('-------------------------------------');
  }); 
  
  request.on('doneInProc', function (rowCount, more, rows) { 
    console.log('event doneInProc');
    console.log('rowCount : ' + rowCount);
    console.log('more : ' + more);
    console.log('rows : ' + rows);
    console.log('-------------------------------------');
  });
  
  request.on('doneProc', function (rowCount, more, returnStatus, rows) {
    console.log('event doneProc');
    console.log('rowCount : ' + rowCount);
    console.log('more : ' + more);
    console.log('returnStatus : ' + returnStatus);
    console.log('rows : ' + rows);
    console.log('-------------------------------------');
  });
  
  request.on('returnValue', function (parameterName, value, metadata) {
    console.log('event returnValue');
    console.log('parameterName : ' + parameterName);
    console.log('value : ' + value);
    console.log('metadata : ' + metadata);
    console.log('-------------------------------------');
  });
  
  connection.callProcedure(request);
  
  console.log('result : '+result);
  return result;
}  

module.exports = router;
