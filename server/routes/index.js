var express = require('express');
var router = express.Router();
const request = require('request');
const superagent = require('superagent')
const cheerio = require('cheerio')
const util = require('../util/util')
/* GET home page. */

let ForeignNewsDetail={};
superagent.get('https://www.foxnews.com/us/wisconsin-man-who-kidnapped-jayme-closs-gets-life-in-prison').end((err, res) => {
  if (err) {
    console.log(`热点新闻抓取失败 - ${err}`)
  } else {
   ForeignNewsDetail = getnewsContent(res)
  //  console.log(ForeignNewsDetail);
   /* router.get('/', function(req, res, next) {
    util.responseSuccess(res,ForeignNewsDetail)
    }); */
  }
});
router.get('/', function(req, res, next) {
  util.responseSuccess(res,ForeignNewsDetail)
  });
let getnewsContent =  (res) => {
  let content=''
  let title=""
  let $ = cheerio.load(res.text)
  content = $('.article-content').toString()
  title = $('.page-content .headline').text()
  return {
    title,
    content,
    
  }
}







module.exports = router;
