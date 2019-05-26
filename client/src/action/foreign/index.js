import Types from '../types'
import DataStore from '../../expand/storage/DataStore'
import { handleData,_projectModels } from '../ActionUtil'

// 首页的action
export function onLoadRefreshHome(tagName,url){
	return dispatch => {
		dispatch({type:Types.Foreign_REFRESH,tagName:tagName});
		let dataStore = new DataStore();
		dataStore.fetchData(url) //异步action与数据流
			.then(res=>{
				
				// handleData(Types.HOME_REFRESH_SUCCESS,dispatch,tagName,res,pageSize)
				if(res&&res.data&&res.data.status=='0'){
					dispatch({
						type:Types.Foreign_REFRESH_SUCCESS,
						tagName,
						projectModels:res.data.items,
						pageIndex:1
					})
				}
			})
			.catch(error=>{
				console.log('home',error);
				dispatch({
					type:Types.Foreign_REFRESH_FAIL,
					tagName,
					error
				})
				
			})
	}
}

// 上拉加载更多
export function onLoadMoreHome(CountryName,url,pageIndex,pageSize,callback){
	return dispatch => {
		// dispatch({type:Types.HOME_REFRESH,tagName:tagName});
		let dataStore = new DataStore();
		dataStore.fetchData(url) 
			.then(res=>{
				if(res&&res.data&&res.data.status=='0'){
					if((pageIndex-1)*pageSize >= res.data.items.length){
						if(typeof callback === 'function'){
							callback('no more')
						}
						dispatch({
							type:Types.HOME_LOAD_MORE_FAIL,
							error:'no more',
							CountryName,
							pageIndex:--pageIndex,
							projectModels:res.data.items
						})
					}else{
							dispatch({
								type:Types.HOME_LOAD_MORE_SUCCESS,
								CountryName,
								pageIndex,
								projectModels:res.data.items
							})
					}
				}
			})


	}
}

export function onLoadHomeFavorite(tagName, pageIndex, pageSize, dataArray = []) {
	return dispatch=>{
			//本次和载入的最大数量
			let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
			dispatch({
					type: Types.FLUSH_POPULAR_FAVORITE,
					tagName,
					pageIndex,
					projectModels: dataArray.slice(0, max),
			})
	}
}
