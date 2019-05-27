import Types from '../types'
import Api from '../../expand/api/api'

export function onLogin(username,password,type='user',successCallback,errorCallback){
	let params = {
		username,
		password,
		type
	}
	return dispatch=>{
		fetch(Api.loginUrl,{
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
				console.log('服务端获取到的数据',res);
				if(res&&res.status=='0'){
					dispatch({type:Types.USER_LOGIN_SUCCESS,data:res})
					successCallback()
				}else{
					errorCallback()
				}
			})
			.catch(error=>{
				console.log('错误了',error);
				dispatch({type:Types.USER_LOGIN_FAIL,error:error})
				
			})
	}
}