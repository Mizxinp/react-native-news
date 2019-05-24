let express = require('express')
let router = express.Router();
const request = require('request');

const NewsDetail = require('../models/new_detail')
const util = require('../util/util')
// console.log('hahahs',util.responseError());

//获取头条新闻详情
const DETAIL_URL ='http://m.toutiao.com/i6693671860736885261/info/'
// 获取新闻的评论
const COMMENT_URL = 'http://www.toutiao.com/api/comment/list/?group_id=6364965628189327618&item_id=6364969235889783298'

function insertData(data,res,content_id){
	let result = {...data,content_id}
	
	NewsDetail.create(result,createError=>{
		if(createError){
			console.log('错误');
			res.json({msg:'写数据失败'})
		}else{
			console.log('写数据成功');
			util.responseSuccess(res,result)
		}
	})
}

router.get('/',function(req,res,next){
	let flag=true;
	let content_id = req.param('content_id')
	let result={}
	NewsDetail.find(function(error,doc){
		if(error){
			console.log('jj');
			
			util.responseError(res,error)
		}else if(doc.length>0){
			for(let i=0;i<doc.length;i++){
				if(doc[i].content_id&&doc[i].content_id==content_id){
					console.log('进来for循环');
					util.responseSuccess(res,doc[i])
					flag=false
					break
				}
			}
			if(flag){
				console.log('网络请求');
				request(`http://m.toutiao.com/i${content_id}/info/`, { json: true }, (err, response, body) => {
					if (err) { return console.log(err); }
					// insertData(body.data,res,content_id)
					result = body.data
				})
				request(`http://www.toutiao.com/api/comment/list/?group_id=${content_id}&item_id=${content_id}`, { json: true }, (err, response, body) => {
					if (err) { return console.log(err); }
					// console.log('获取评论数据',body);
					
					result = {...result,comments:body.data.comments}
					insertData(result,res,content_id)
				})
			}
		}else{
			console.log('没有原始数据的');
			insertData(body.data,res,content_id)
		}
	})

	

	

})

module.exports = router;