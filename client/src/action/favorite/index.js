import Types from '../types'
import Api from '../../expand/api/api'
import DataStore from '../../expand/storage/DataStore'

/**
 *获取收藏数据
 *@param url  路径
 */


export function onLoadFavoriteData(flag,url){
	return dispatch=>{
		let dataStore = new DataStore();
		dataStore.fetchData(url)
			.then(res=>{
				console.log('收藏页数据',res);
				
				dispatch({type:Types.FAVORITE_LOAD_SUCCESS,res,flag})
			})
			.catch(error=>{
				dispatch({type:Types.FAVORITE_LOAD_FAIL,flag,error})
			})
	}
}