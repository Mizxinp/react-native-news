import Types from '../types'
import DataStore from '../../expand/storage/DataStore'
import { handleData,_projectModels } from '../ActionUtil'

// 首页的action
export function onLoadRefreshHome(tagName,url,pageSize){
	console.log('你是谁',url);
	
	return dispatch => {
		dispatch({type:Types.HOME_REFRESH,tagName:tagName});
		let dataStore = new DataStore();
		dataStore.fetchData(url) //异步action与数据流
			.then(res=>{
				handleData(Types.HOME_REFRESH_SUCCESS,dispatch,tagName,res,pageSize)
			})
			.catch(error=>{
				console.log('home',error);
				dispatch({
					type:Types.HOME_LOAD_MORE_FAIL,
					tagName,
					error
				})
				
			})
	}
}

// 上拉加载更多
export function onLoadMoreHome(tagName,pageIndex,pageSize,dataArray=[],callback){
	return dispatch => {
		setTimeout(()=>{//模拟网络请求
			if((pageIndex-1)*pageSize >= dataArray.length){
				if(typeof callback === 'function'){
					callback('no more')
				}
				dispatch({
					type:Types.HOME_LOAD_MORE_FAIL,
					error:'no more',
					tagName,
					pageIndex:--pageIndex,
					projectModels:dataArray
				})
			}else{
				let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize*pageIndex
					dispatch({
						type:Types.HOME_LOAD_MORE_SUCCESS,
						storeName,
						pageIndex,
						projectModels:dataArray.slice(0, max)
					})
			}
		},500)
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
