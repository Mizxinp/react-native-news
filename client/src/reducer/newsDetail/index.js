import Types from '../../action/types'
const initState={
}
export default function onAction(state=initState,action){
	console.log('action',action);
	
	switch(action.type){
		case Types.NEWS_DETAIL:
			return {
				...state,
				item:action.res.result
			}
		default:
			return state
	}
}