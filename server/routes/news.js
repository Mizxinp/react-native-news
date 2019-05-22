let express = require('express')
let router = express.Router();

let News = require('../models/news')

/* 
// 格式
{
	items:[]
} */
router.get('/national',function(req,res,next){
	let tagName = req.param('tag');
	console.log(tagName);
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
			console.log('个数',result.length);
			
			res.json({
				status:'0',
				msg:'success',
				items:result
			})
		}
	})
})

module.exports = router;