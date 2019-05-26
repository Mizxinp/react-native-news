import Types from '../types'
import DataStore from '../../expand/storage/DataStore'
import Api from '../../expand/api/api'

/**
 *获取国内新闻详情
 *@param url 路径
 *
 */

export function onLoadNewsDetail(contentId,url){
	return dispatch=>{
		let dataStore = new DataStore();
		dataStore.fetchNetData(url)
			.then(res=>{
				console.log('文章详情数据',res);
				dispatch({type:Types.NEWS_DETAIL,res})
			})
	}
}

/**
 *获取国外新闻详情
 *@param url 路径
 *
 */

export function onLoadForeignNewsDetail(url){
	return dispatch=>{
		let dataStore = new DataStore();
		dataStore.fetchNetData(url)
			.then(res=>{
				console.log('文章详情数据',res);
				dispatch({type:Types.Foreign_DETAIL,res})
			})
	}
}

/**
 *修改搜藏状态
 *@param flag  修改首页文章还是国际文章
 *@param content_id  文章id
 *@param isFavorite  取消或者收藏文章
 */

export function onEditFavorite(flag,content_id,isFavorite){
	const params={
		flag,
		content_id,
		isFavorite
	};
	console.log('action中的参数',params);
	
	return dispatch=>{
		fetch(Api.editFavoriteApi,{
			method:"POST",
			body:JSON.stringify(params),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=utf-8'
		}
		})
			.then((response)=>{
				if(response.ok){
					return response.json()
				}else{
					throw new Error('Network response was not ok')
				}
			})
			.then(res=>{
				dispatch({type:Types.FAVORITE_EDIT_SUCCESS,isFavorite:isFavorite})
				console.log('收藏返回数据',res)
			})
			.catch(e=>{
				console.log('错误了',e);
				
			})

			
	}
}
