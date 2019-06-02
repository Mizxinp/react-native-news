import Types from '../types'
import Api from '../../expand/api/api'
import { AsyncStorage } from 'react-native'

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
				// console.log('服务端获取到的数据',res);
				if(res&&res.status=='0'){
					AsyncStorage.setItem('user',JSON.stringify(res.result),(err,result)=>{
						if(!err){
							console.log('存储成功');
						}
					})
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

export function onLogout(){
	return dispatch=>{
		// AsyncStorage.removeItem('user',(err,result)=>{
		// 	if(!err){
		// 		console.log('删除用户数据成功');
		// 	}
		// })
		dispatch({type:Types.USER_LOGOUT})
	}
}

export function onRegister(username,password,type='user',successCallback,errorCallback){
	let params = {
		username,
		password,
		type
	}
	return dispatch=>{
		fetch(Api.registerUrl,{
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
					AsyncStorage.setItem('user',res.result,(err,result)=>{
						if(!err){
							console.log('存储成功');
							
						}
					})
					dispatch({type:Types.USER_REGISTER_SUCCESS,data:res})
					successCallback()
				}else{
					errorCallback()
				}
			})
			.catch(error=>{
				console.log('错误了',error);
				dispatch({type:Types.USER_REGISTER_FAIL,error:error})
				
			})
	}
}