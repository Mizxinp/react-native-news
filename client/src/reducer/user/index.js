import {AsyncStorage} from 'react-native'

import Types from '../../action/types'



console.log('执行了用户reducer');

let initState={
	username:'',
	type:'',
	nationalCollection:[],
	foreignCollection:[]
}

// AsyncStorage.getItem('user',(err,result)=>{
// 	if(!err){
// 		initState = result
// 		console.log('哈哈',initState);
		
// 	}
// })

async function loadUserData(){
	await AsyncStorage.getItem('user',(err,result)=>{
		if(!err){
			initState = result
			console.log('哈哈',initState);
			
		}
	})
} 
loadUserData()

export default function onAction(state=initState,action){
	switch(action.type){
		case Types.USER_LOGIN_SUCCESS:
			return{
				...state,
				data:action.data.result
			}
		case Types.USER_LOGIN_FAIL:
			return{
				...state,
				error:action.error
			}
		case Types.USER_LOGOUT:
			return {...initState}
		case Types.USER_REGISTER_SUCCESS:
			return{
				...state,
				data:action.data.result
			}
		default:
			return state
	}
}