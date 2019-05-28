const BASE_API = 'http://192.168.1.103:3000'
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
}