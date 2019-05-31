import Types from '../../action/types'

const initState = {

}

// 

export default function onAction(state=initState,action){
	switch(action.type){
		case Types.SEARCH_REFRESH_SUCCESS:
			// console.log('传过来的reduce数据',action);
				
			return {
				...state,
				items:action.res.result
			}
		case Types.FAVORITE_LOAD_FAIL:	
			return {
				...state,
			}
		default:
			return state
	}
}