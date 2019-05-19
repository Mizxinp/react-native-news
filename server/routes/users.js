var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let User = require('../models/users')

mongoose.connect('mongodb://127.0.0.1:27017/newsDB')

mongoose.connection.on('connected',function(){
  console.log('mongodb connected success')
})
mongoose.connection.on('error', function () {
  console.log('mongodb connected error')
})
mongoose.connection.on('disconnected', function () {
  console.log('mongodb connected disconnected')
})



/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  User.find(function (err, doc) {
    if (err) {
        res.json({
            status: '1',
            msg: err.message,
            result: ''
        })
    } else {
        if (doc) {
          
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
