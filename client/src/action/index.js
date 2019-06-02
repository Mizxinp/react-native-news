import { onThemeChange,onShowCustomThemeView,onThemeInit } from './theme/index'
import { onLoadRefreshHome,onLoadMoreHome,onLoadHomeFavorite } from  './home/index'
import { onLoadNewsDetail,onLoadForeignNewsDetail,onEditFavorite } from './newsDetail/index'
import { onLoadFavoriteData}from './favorite/index'
import { onLogin,onLogout,onRegister } from './user/index'
import { onSearch } from './search/index'
import { onLoadSubscribe,onEditSubscribe,onLoadInitSubscribe } from './subscribe/index'

export default{
	onThemeChange,	//改变主题
	onShowCustomThemeView,	//显示主题设置页
	onThemeInit,	//默认主题
	onLoadRefreshHome,	//首页刷新
	onLoadMoreHome,		//首页加载更多
	onLoadHomeFavorite,	//获取首页中被收藏的数量
	onLoadNewsDetail, 		//获取文章详情
	onLoadForeignNewsDetail, // 获取国外文章详情
	onEditFavorite,		//添加收藏
	onLoadFavoriteData,	//获取收藏的文章列表
	onLogin, //登录
	onLogout, //退出登录
	onRegister, // 注册,
	onSearch, //搜索
	onLoadSubscribe, // 获取订阅信息
	onEditSubscribe, // 订阅和取消订阅
	onLoadInitSubscribe
}