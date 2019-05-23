import { onThemeChange,onShowCustomThemeView,onThemeInit } from './theme/index'
import { onLoadRefreshHome,onLoadMoreHome,onLoadHomeFavorite } from  './home/index'
import { onLoadNewsDetail } from './newsDetail/index'

export default{
	onThemeChange,	//改变主题
	onShowCustomThemeView,	//显示主题设置页
	onThemeInit,	//默认主题
	onLoadRefreshHome,	//首页刷新
	onLoadMoreHome,		//首页加载更多
	onLoadHomeFavorite,	//获取首页中被收藏的数量
	onLoadNewsDetail, 		//获取文章详情
}