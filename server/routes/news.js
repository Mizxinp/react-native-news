var express = require('express');
var router = express.Router();

let News = require('../models/news')


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  News.find(function (err, doc) {
    if (err) {
        res.json({
            status: '1',
            msg: err.message,
            result: ''
        })
    } else {
        if (doc) {
          console.log('haha',doc);
          
            res.json({
                status: '0',
                msg: 'success',
                result: doc
            })
        }
    }
  })
});

module.exports = router;
