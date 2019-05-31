import Types from '../types'
import Api from '../../expand/api/api'
import DataStore from '../../expand/storage/DataStore'

/**
 *获取收藏数据
 *@param url  路径
 */


export function onSearch(searchKey,url){
	console.log('url是什么',url);
	
	return dispatch=>{
		let dataStore = new DataStore();
		dataStore.fetchNetData(url)
			.then(res=>{
				console.log('后端搜索数据',res);
				dispatch({type:Types.SEARCH_REFRESH_SUCCESS,res,searchKey})
			})
			.catch(error=>{
				dispatch({type:Types.SEARCH_REFRESH_FAIL,searchKey,error})
			})
	}
}