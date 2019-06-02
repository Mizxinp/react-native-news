// const BASE_API = 'http://172.20.10.2:3000'
// const BASE_API = 'http://192.168.1.102:3000'
const BASE_API = 'http://192.168.31.170:3000'
export default{
	BASE_API:BASE_API,
	nationalURL:`${BASE_API}/news/national?tag=`,//首页列表
	detailUrl:`${BASE_API}/news_info/national?content_id=`, //国内新闻详情
	foreignUrl:`${BASE_API}/news/foreign?tag=`, // 国际新闻列表
	foreignDetailUrl:`${BASE_API}/news_info/foreign?url=`, // 国际新闻详情
	editFavoriteApi:`${BASE_API}/news_info/editFavorite`,	//添加取消收藏
	loadFavoriteDataUrl:`${BASE_API}/news_info/collection?flag=`,	//获取收藏文章列表
	loginUrl:`${BASE_API}/users/login`,//登录
	registerUrl:`${BASE_API}/users/register`,//注册
	searchUrl:`${BASE_API}/news_info/search?q=`,//搜索
	subscribeUrl:`${BASE_API}/users/getSubscribe?user_id=`,//获取订阅信息
	editSubscribeUrl:`${BASE_API}/users/editSubscribe`,		//订阅和取消订阅

}