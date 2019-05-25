import React,{Component} from 'react'
import { Text,View,ScrollView } from 'react-native'
import HTMLView from 'react-native-htmlview'

import backPressComponent from '../component/backPressComponent'
import NavigationUtil from '../navigator/NavigationUtil'

const BAST_URL = 'http://192.168.1.102:3000/news_info/foreign?url='

class ForeignDetailPage extends Component{
	constructor(props){
		super(props)
		this.params = this.props.navigation.state.params;
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})

	}
	componentDidMount(){
		this.backPress.componentDidMount()
		const {ForeignUrl} = this.params
		console.log('这是url',ForeignUrl);
		
		fetch(BAST_URL+ForeignUrl)
			.then((response)=>{
				if(response.ok){
					return response.json()
				}else{
					throw new Error('Network response was not ok')
				}
			})
			.then((responseData)=>{
				console.log('结果',responseData);
			})
			.catch(error=>{
				console.log('error',error);
			})
	}
	componentWillUnmount(){
		this.backPress.componentWillUnmount()
	}
	onBackPress = () => {
		this.onBack()
		return true
	}
	onBack = () => {
		NavigationUtil.goBack(this.props.navigation)
	}
	render(){
		return(
			<ScrollView>

			</ScrollView>
		)
	}
}

export default ForeignDetailPage