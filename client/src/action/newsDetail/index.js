import Types from '../types'
import DataStore from '../../expand/storage/DataStore'

export function onLoadNewsDetail(contentId,url){
	return dispatch=>{
		let dataStore = new DataStore();
		dataStore.fetchNetData(url)
			.then(res=>{
				console.log('res',res);
				dispatch({type:Types.NEWS_DETAIL,res})
			})
	}
}

