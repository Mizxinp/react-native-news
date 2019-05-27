import Types from '../../action/types'

const initState={
	username:'',
	type:'',
	nationalCollection:[],
	foreignCollection:[]
}

export default function onAction(state=initState,action){
	switch(action.type){
		case Types.USER_LOGIN_SUCCESS:
			return{
				...state,
				data:action.data.result
			}
		case Types.USER_LOGIN_SUCCESS:
			return{
				...state,
				error:action.error
			}
		default:
			return state

	}
}