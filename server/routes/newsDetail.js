let express = require('express')
let router = express.Router();
const request = require('request');

const util = require('../util/util')
const superagent = require('superagent')
const cheerio = require('cheerio')
const NewsDetail = require('../models/new_detail')
const ForeignDetail = require('../models/foreignDetail')
const Collection = require('../models/collection')
const News = require('../models/news')
const User= require('../models/users')
// console.log('hahahs',util.responseError());

//获取头条新闻详情
const DETAIL_URL ='http://m.toutiao.com/i6693671860736885261/info/'
// 获取新闻的评论
const COMMENT_URL = 'http://www.toutiao.com/api/comment/list/?group_id=6364965628189327618&item_id=6364969235889783298'

function insertData(data,res,content_id){
	
	let result = {...data,content_id,checked:false}
	
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

function insertForeignDetai(data,res){
	
	ForeignDetail.create(data,createError=>{
		if(createError){
			console.log('错误');
			res.json({msg:'写数据失败'})
		}else{
			console.log('写数据成功');
			util.responseSuccess(res,data)
		}
	})
}

let getnewsContent =  (res) => {
  let content=''
  let title=""
  let $ = cheerio.load(res.text)
  content = $('.article-content').toString() || $('.entry-content').toString()||$('.field-name-body').toString()||$('.l-container').toString()
  title = $('h1').text()
  return {
    title,
    content,
    
  }
}

router.get('/national',function(req,res,next){
	console.log('国内路由');
	
	let flag=true;
	let content_id = req.param('content_id')
	let result={}
	NewsDetail.find(function(error,doc){
		if(error){
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
					// console.log('写的数据',body.data);
					
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


// https://www.foxnews.com/us/wisconsin-man-who-kidnapped-jayme-closs-gets-life-in-prison
router.get('/foreign',function(req,res,next){
	console.log('国外路由');
	let flag=true;
	let url = req.param('url')
	console.log('传过来的路径',url);
	
	let result={}
	ForeignDetail.find(function(error,doc){
		if(error){
			console.log('jj');
			
			util.responseError(res,error)
		}else if(doc.length>0){
			for(let i=0;i<doc.length;i++){
				if(doc[i].url&&doc[i].url==url){
					console.log('进来for循环');
					util.responseSuccess(res,doc[i])
					flag=false
					break
				}
			}
			if(flag){
				console.log('网络请求');

				let ForeignNewsDetail={};
				superagent.get(url).end((err, response) => {
					if (err) {
						console.log(`热点新闻抓取失败 - ${err}`)
					} else {
					ForeignNewsDetail = getnewsContent(response)					
						insertForeignDetai({...ForeignNewsDetail,url,checked:false},res)
					}
				});
			}
		}else{
			console.log('没有原始数据的');
			// insertData(body.data,res,content_id)
		}
	})
	// insertForeignDetai({url:'hjjj'},res)
	
	
})

router.post('/editFavorite',function(req,res,next){
	const checked = req.body.isFavorite;
	const content_id = req.body.content_id;
	const flag = req.body.flag;
	console.log(checked,content_id,flag);
	
	switch(flag){
		case 'national':
			NewsDetail.update({content_id},{"checked":checked},(err,doc)=>{
				if(err){
					util.responseError(res,err)
				}else if(doc){
					util.responseSuccess(res,'')
				}
			})
			break
		case 'foreign':
			ForeignDetail.update({url:content_id},{"checked":checked},(err,doc)=>{
				if(err){
					util.responseError(res,err)
				}else if(doc){
					util.responseSuccess(res,'')
				}
			})
			break
	}

	/* if(flag=='national'){
		NewsDetail.update({content_id},{"checked":checked},(err,doc)=>{
			if(err){
				util.responseError(res,err)
			}else if(doc){
				util.responseSuccess(res,'')
			}
		})
	} */
	
})

router.get('/collection',(req,res,next)=>{
	console.log('进来');
	
	const flag = req.param('flag');
	switch(flag){
		case 'national':
			NewsDetail.find({checked:true},(err,doc)=>{
				if(err){
					util.responseError(res,err)
				}else if(doc){
					util.responseSuccess(res,doc)
				}
			})
			break
		case 'foreign':
			ForeignDetail.find({checked:true},(err,doc)=>{
				if(err){
					util.responseError(res,err)
				}else if(doc){
					util.responseSuccess(res,doc)
				}
			})
			break
		default:
			util.responseSuccess(res,'')
	}
})

router.get('/test',(req,res,next)=>{
	const data={title:'第三条'}
	Collection.findOne({user_id:'jjjf'},(err,doc)=>{
		if(!err){
			doc.nationalCollection.push(data)
			doc.save((error,ddco)=>{
				if(!error){
					console.log('成功保存');
					
					util.responseSuccess(res,ddco)
				}
			})
		}
	})
})

router.post('/editFavoriteTest',function(req,res,next){
	// console.log('进来');
	
	const checked = req.query.isFavorite;
	const content_id = req.query.content_id;
	const user_id = req.query.user_id
	const flag = req.query.flag;
	const tag = req.query.tag

	console.log('类型',Object.prototype.toString.call(checked));
	
	console.log(checked,content_id,flag,user_id,tag);
	
	// flag表示国内新闻的收藏还是国际新闻的收藏
	switch(flag){
		case 'national':
			// checked为true表示收藏
			if(checked){
				console.log('收藏');
				//在新闻列表中查找
				News.find({tag},(err,doc)=>{
					if(err){ return util.responseError(res,err)};
					// console.log('找到的数据',Object.prototype.toString.call(doc));

					doc[0].data.forEach(item=>{
						if(item.item_id==content_id){
							// 当找到后将数据插入用户收藏列表中
							User.findOne({_id:user_id},(error,data)=>{
								if(!error){
									// console.log('用户信息',data);
									
									data.nationalCollection.push(item)
									data.save((error,dataOne)=>{
										if(!error){
											console.log('成功保存');
											util.responseSuccess(res,item)
										}
									})
								}
							})
						}
					})
					
				})
			}else{  //否则为取消收藏
				console.log('取消收藏');
				
				User.update({ _id:user_id }, {
					$pull: {
						'nationalCollection': {'item_id': content_id}
					}
				}, (err, doc) => {
					if(err){return util.responseError(res,err)}
					util.responseSuccess(res,doc)
				})
			}
			break
		case 'foreign':
			ForeignDetail.update({url:content_id},{"checked":checked},(err,doc)=>{
				if(err){
					util.responseError(res,err)
				}else if(doc){
					util.responseSuccess(res,'')
				}
			})
			break
	}
})

router.get('/search',(req,res,next)=>{
	const searchKey = req.param('q')
	News.find((err,doc)=>{
		if(err){
			util.responseError(res,err)
		}else{
			let result = []
			doc.forEach(item => {
				item.data.forEach(element => {
					if(element.title.indexOf(searchKey) !== -1){

						result.push(element)
					}
				});
			});
			util.responseSuccess(res,result)
		}
	})
})

// 6693565211103725000
module.exports = router;