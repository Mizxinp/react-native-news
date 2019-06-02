import Types from '../../action/types'

const homeTags = [
	{
		"path":"推荐",
		"name":"推荐",
		"checked":true
	},
	{
		"path":"热点",
		"name":"热点",
		"checked":true
	},
	{
		"path":"科技",
		"name":"科技",
		"checked":true
	},
	{
		"path":"社会",
		"name":"社会",
		"checked":true
	},
	{
		"path":"娱乐",
		"name":"娱乐",
		"checked":true
	}
]

const initState = {
	// tags:[]
	tags:[
		{
			"path":"推荐",
			"name":"推荐",
			"checked":true
		},
		{
			"path":"热点",
			"name":"热点",
			"checked":true
		},
		{
			"path":"科技",
			"name":"科技",
			"checked":true
		},
		{
			"path":"社会",
			"name":"社会",
			"checked":true
		},
		{
			"path":"娱乐",
			"name":"娱乐",
			"checked":true
		}
	]
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
		case Types.SUBSCRIBE_Load_SUCCESS:	//获取订阅数据成功
			return {
				...state,
				tags:action.data.result
			}
		case Types.SUBSCRIBE_Load_FAIL:   //获取订阅数据失败
			return {
				...state,
				tags:[]
			}
		case Types.SUBSCRIBE_SUCCESS:	//订阅成功
			return{
				...state,
				tags:action.data.result
			}
		case Types.SUBSCRIBE_FAIL: //订阅失败
				return{
					...state,
				}
		case Types.SUBCRIBE_HOME_INIT:
			console.log('进来reduser');
			
			return {
				tags:homeTags
			}
		default:
			return state
	}
}