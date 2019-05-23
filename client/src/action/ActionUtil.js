export function handleData(actionType,dispatch,tagName,res,pageSize){
	
	let fixItems = [];
	if (res && res.data) {
			if (Array.isArray(res.data)) {
					fixItems = res.data;
			} else if (Array.isArray(res.data.items)) {
					fixItems = res.data.items;
			}
	}
	
	//第一次要加载的数据
	let showItems = pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize)
		dispatch({
			type:actionType,
			items:fixItems,
			tagName,
			projectModels:showItems,
			pageIndex:1
		})
}                                                                               
