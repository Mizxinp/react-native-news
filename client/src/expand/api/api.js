const BASE_API = 'http://192.168.1.102:3000'
export default{
	BASE_API:BASE_API,
	editFavoriteApi:`${BASE_API}/news_info/editFavorite`,	//添加取消收藏
	loadFavoriteDataUrl:`${BASE_API}/news_info/collection?flag=`,	//获取收藏文章列表
	loginUrl:`${BASE_API}/users/login`,//登录
	registerUrl:`${BASE_API}/users/register`,//登录
}