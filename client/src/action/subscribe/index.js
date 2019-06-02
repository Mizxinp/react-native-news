import Types from '../types'
import Api from '../../expand/api/api'
import DataStore from '../../expand/storage/DataStore'

export function onLoadSubscribe(user_id,successCallback){
	return dispatch=>{
		let dataStore = new DataStore();
		dataStore.fetchNetData(Api.subscribeUrl+user_id)
			.then(res=>{
				if(res&&res.status=='0'){
					dispatch({type:Types.SUBSCRIBE_Load_SUCCESS,data:res})
					successCallback()
				}
			})
			.catch(e=>{
				dispatch({type:Types.SUBSCRIBE_Load_FAIL,data:e})
			})
	}
}




/**
 *订阅和取消订阅
 *@param user_id  用户id
 *@param tags  订阅标签
 *@function successCallback  成功的回调
 *@function errorCallback  失败的回调
 */

export function onEditSubscribe(user_id,tags,successCallback,errorCallback){
	console.log('进来的数据');
	
	let params = {
		user_id,
		tags,
	}
	return dispatch=>{
		fetch(Api.editSubscribeUrl,{
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
				// console.log('服务端获取到的数据',res);
				if(res&&res.status=='0'){
					console.log('修改订阅信息成功',res);
					
					dispatch({type:Types.SUBSCRIBE_SUCCESS,data:res})
					successCallback()
				}else{
					errorCallback()
				}
			})
			.catch(error=>{
				console.log('错误了',error);
				dispatch({type:Types.SUBSCRIBE_FAIL,error:error})
				
			})
	}
}

export function onLoadInitSubscribe(){
	return dispatch=>{
		dispatch({type:Types.SUBCRIBE_HOME_INIT})
	}
}

