import Types from '../../action/types'

const initState = {
	
}

/* 
home:{
	java:{
		items:[],
		isLoading:false
	},
	JavaScript:{
		items:[],
		isLoading:false
	}
} 
*/

// 设置动态store，和动态获取store(难点：storekey不固定)：使用[action.tagName]

export default function onAction(state=initState,action){
	console.log('action',action);
	
	switch(action.type){
		case Types.HOME_REFRESH_SUCCESS:		//下拉刷新成功
		console.log('state',state);
		
			return {
				...state,
				[action.tagName]:{
					...[action.tagName],
					items:action.items,	//原始数据
					projectModels:action.projectModels,	//此次需要展示的数据
					isLoading:false,
					hideLoadingMore:false,
					pageIndex:action.pageIndex
				}
			}
		case Types.HOME_REFRESH:	//下拉刷新
			return {
				...state,
				[action.tagName]:{
					...state[action.tagName],
					items:action.items,
					isLoading:true,
					hideLoadingMore:true,
				}
			}
		case Types.HOME_REFRESH_FAIL:	//下拉刷新失败
			return {
				...state,
				[action.tagName]:{
					...state[action.tagName],
					items:action.items,
					isLoading:false
				}
			}
		case Types.HOME_LOAD_MORE_SUCCESS:	//上拉加载更多成功
			return {
				...state,
				[action.tagName]:{
					...state[action.tagName],
					projectModels:action.projectModels,
					hideLoadingMore:false,
					pageIndex:action.pageIndex
				}
			}
		case Types.HOME_LOAD_MORE_FAIL:	//上拉加载更多失败
			return {
				...state,
				[action.tagName]:{
					...state[action.tagName],
					hideLoadingMore:true,
					pageIndex:action.pageIndex
				}
			}
		default:
			return state
	}
}