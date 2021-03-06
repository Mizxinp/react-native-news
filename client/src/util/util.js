/* 
'推荐','热点','科技','社会','娱乐'
 */

export function changeTag(type){
	switch(type){
		case '推荐':
			return 'all';
		case '热点':
			return 'news_hot';
		case '科技':
			return 'news_tech';
		case '社会':
			return 'news_society';
		case '娱乐':
			return 'news_entertainment';
		case '游戏':
			return 'news_game'
		case '体育':
			return 'news_sports'
		case '汽车':
			return 'news_car'
		case '财经':
			return 'news_finance'
		case '历史':
			return 'news_history'
		default:
			return 'all'
	}
}

export function changeForeignTag(type){
	switch(type){
		case '综合':
			return 'general';
		case '科学':
			return 'science';
		case '体育':
			return 'sports';
		case '科技':
			return 'technology';
		case '娱乐':
			return 'entertainment';
		default:
			return 'general'
	}
}

/* 
时间戳转年月日
 */

 export function changeDate(time){
	const dateTime = new Date(time);
	const Y = `${dateTime.getFullYear()  }/`;
	const M = `${dateTime.getMonth()+1 < 10 ? '0'+(dateTime.getMonth()+1) : dateTime.getMonth()+1  }/`;
	const D = `${dateTime.getDate()<10? '0' + dateTime.getDate(): dateTime.getDate() } `;
	return Y+M+D
 }