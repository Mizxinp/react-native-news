let express = require('express')
let router = express.Router();

let News = require('../models/news')
let Foreign = require('../models/foreignNews')

/* 
// 格式
{
	items:[]
} */
router.get('/national',function(req,res,next){
	const tagName = req.param('tag');
	const pageIndex = req.param('pageIndex');
	const pageSize = req.param('pageSize');
	const flag = req.param('flag');
	// console.log(req);
	
	News.findOne(function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
			})
		}else if(doc){
			// console.log(doc.all);
			let result = [];
			
			Object.keys(doc._doc).forEach(item=>{
				if(item==tagName){
					result=doc._doc[item]
				}
			})
			// console.log('个数',result.length);
			// flag:1表示刷新
			/* 
			
			*/
			let finalResult = []
			if(pageIndex*pageSize-result.length>=pageSize){
				finalResult = result.slice(result.length-pageSize+1,result.length)
			}else if(pageIndex*pageSize>result.length){
				finalResult = result.slice(pageIndex*pageSize-pageSize,result.length)
			}else{
				finalResult=result.slice(pageIndex*pageSize-pageSize,pageIndex*pageSize)
			}
			

			let loadMoreResult=[]
			if(pageIndex*pageSize>=result.length){
				loadMoreResult=result
			}else{
				loadMoreResult=result.slice(0,pageIndex*pageSize)
			}
			
			if(flag==1){
				res.json({
					status:'0',
					msg:'success',
					items:finalResult
				})
			}else{
				res.json({
					status:'0',
					msg:'success',
					items:loadMoreResult
				})
			}
			
			/* 

				switch(flag){
				case 1:
					let finalResult = []
					if(pageIndex*pageSize-result.length>=pageSize){
						finalResult = result.slice(result.length-pageSize+1,result.length)
					}else if(pageIndex*pageSize>result.length){
						finalResult = result.slice(pageIndex*pageSize-pageSize,result.length)
					}else{
						finalResult=result.slice(pageIndex*pageSize-pageSize,pageIndex*pageSize)
					}
					res.json({
						status:'0',
						msg:'success',
						items:finalResult
					})
					break
				case 2:
					let loadMoreResult=[]
					if(pageIndex*pageSize>=result.length){
						loadMoreResult=result
					}else{
						loadMoreResult=result.slice(0,pageIndex*pageSize)
					}
					res.json({
						status:'0',
						msg:'success',
						items:loadMoreResult
					})
					break
				default:
					res.json({
						status:'0',
						msg:'success',
						items:result
					})
			}

			 */
		}
	})
})

router.get('/foreign',function(req,res,next){
	const tagName = req.param('tag');
	const pageIndex = req.param('pageIndex');
	const pageSize = req.param('pageSize');
	const flag = req.param('flag');
	// console.log(req);
	
	Foreign.findOne(function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message,
			})
		}else if(doc){
			// console.log(doc.all);
			let result = [];
			
			Object.keys(doc._doc).forEach(item=>{
				if(item==tagName){
					result=doc._doc[item]
				}
			})
			// console.log('个数',result.length);
			// flag:1表示刷新
			/* 
			
			*/
			let finalResult = []
			if(pageIndex*pageSize-result.length>=pageSize){
				finalResult = result.slice(result.length-pageSize+1,result.length)
			}else if(pageIndex*pageSize>result.length){
				finalResult = result.slice(pageIndex*pageSize-pageSize,result.length)
			}else{
				finalResult=result.slice(pageIndex*pageSize-pageSize,pageIndex*pageSize)
			}
			

			let loadMoreResult=[]
			if(pageIndex*pageSize>=result.length){
				loadMoreResult=result
			}else{
				loadMoreResult=result.slice(0,pageIndex*pageSize)
			}
			
			if(flag==1){
				res.json({
					status:'0',
					msg:'success',
					items:finalResult
				})
			}else{
				res.json({
					status:'0',
					msg:'success',
					items:loadMoreResult
				})
			}
		}
	})
})

module.exports = router;