import Types from '../../action/types'
const initState={
}
export default function onAction(state=initState,action){
	switch(action.type){
		case Types.NEWS_DETAIL:
			return {
				...state,
				item:action.res.result,
				isFavorite:action.res.result.checked
			}
		case Types.FAVORITE_EDIT_SUCCESS:
			return {
				...state,
				isFavorite:action.isFavorite
			}
		case Types.Foreign_DETAIL:
			return {
				...state,
				item:action.res.result,
				isFavorite:action.res.result.checked
			}
		default:
			return state
	}
}