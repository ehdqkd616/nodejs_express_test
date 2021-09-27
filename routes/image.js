var express = require('express');
var router = express.Router();
var path = require('path');
var rootPath = path.join(__dirname, "../")

/* GET users listing. */
router.get('/', function (req, res, next) {

    res.render('image', {
        title: 'Image Test'
    });

});

/* GET users listing. */
router.post('/uploadfiles', function (req, res, next) {



});

module.exports = router;