import Types from '../../action/types'

const initState = {

}

/* 
state:{
	national:{
		items:[],
		isLoading:false
	},
	foreign:{
		items:[],
		isLoading:false
	}
} 
*/

// 

export default function onAction(state=initState,action){
	switch(action.type){
		case Types.FAVORITE_LOAD_SUCCESS:
			// console.log('传过来的reduce数据',action);
				
			return {
				...state,
				[action.flag]:{
					...state[action.flag],
					isLoading:false,
					projectModels: action.res.data.result,//此次要展示的数据
				}
			}
		case Types.FAVORITE_LOAD_FAIL:	
			return {
				...state,
				[action.flag]:{
					...state[action.flag],
					isLoading:false
				}
			}
		default:
			return state
	}
}