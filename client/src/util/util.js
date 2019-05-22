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
		default:
			return 'all'
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