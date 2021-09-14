var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = path.join(__dirname, "../")

/* GET users listing. */
router.get('/', function (req, res, next) {
    var testPath = path.join(rootPath, "html", "test.html")
    res.sendFile(testPath);

    // next();
    // res.send(rootPath);

    // res.render('router', {
    //     title: 'Express'
    // });
});

module.exports = router;