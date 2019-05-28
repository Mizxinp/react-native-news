var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let User = require('../models/users')
const util = require('../util/util')

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



const _filter = {password:0,__v:0}

//注册
router.post('/register',function(req,res){
  const {username,password,type} = req.body;
  console.log('传过来的参数',req.body);
  
	User.findOne({username},function(err,doc){
		console.log('doc',doc);
		
		if(doc){
			console.log('进来用户名重复');
			
			return res.json({
				status:'1',
        msg:'用户名重复',
        result:''
			})
		}
		new User({username,password,type}).save(function(err,doc){
			if(err){
				return res.json({status:'1',msg:'后端出错'})
			}
			const {username, type, _id} = doc
			res.cookie('user_id', _id)
			return util.responseSuccess(res,{username, type, _id})
			// return res.json({status:'',result:{username, type, _id}})
		})
		
	})
})

// 登录
router.post('/login',function(req,res){
  const { username,password } = req.body;
  console.log(req.body);
  
	User.findOne({username,password},_filter,function(err,doc){
		if(err){
			res.json({code:1,msg:'用户名或者密码错误'})
		}else if(doc){
      
      console.log('doc',Object.prototype.toString.call(doc));
      
      res.cookie('user_id',doc._id)
      util.responseSuccess(res,doc)
		}else{
      console.log('进来');
      res.json({code:1,msg:'用户名或者密码错误'})
    }
	})
})

module.exports = router;
