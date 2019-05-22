let express = require('express')
let router = express.Router();
const request = require('request');

let NewsDetail = require('../models/new_detail')
const URL ='http://m.toutiao.com/i6693671860736885261/info/'

function insertData(data,res,content_id){
	let result = {...data,content_id}
	// console.log(result);
	
	NewsDetail.create(result,createError=>{
		if(createError){
			console.log('错误');
			res.json({
				msg:'写数据失败'
			})
		}else{
			console.log('写数据成功');
			res.json({
				status:'0',
				msg:'success',
				result:result
			})
		}
	})
}

router.get('/',function(req,res,next){
	let flag=true;
	let content_id = req.param('content_id')
	

	NewsDetail.find(function(error,doc){
		if(error){
			res.json({
				status:'1',
				msg:error.message,
			})
		}else if(doc.length>0){
			for(let i=0;i<doc.length;i++){
				if(doc[i].content_id&&doc[i].content_id==content_id){
					console.log('进来for循环');
					
					res.json({
						status:'1',
						msg:'success',
						result:doc[i]
					})
					flag=false
					break
				}
			}
			if(flag){
				console.log('网络请求');
				
				request(`http://m.toutiao.com/i${content_id}/info/`, { json: true }, (err, response, body) => {
					if (err) { return console.log(err); }
					insertData(body.data,res,content_id)
				})
			}
		}else{
			console.log('没有原始数据的');
			insertData(body.data,res,content_id)
		}
	})

	

	

})

module.exports = router;