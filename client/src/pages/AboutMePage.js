import React,{Component} from 'react'
import {Text,View} from 'react-native'

import backPressComponent from '../component/backPressComponent'
import NavigationBar from '../component/NavigationBar'
import NavigationUtil from '../navigator/NavigationUtil'
import ViewUtil from '../util/ViewUtil'
import actions from '../action/index'

class AboutMePage extends Component{
	constructor(props){
		super(props)
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})
		
		// this.params = this.props.navigation.state.params;
		
		this.state={
		}
	}
	componentDidMount(){
		this.backPress.componentDidMount()
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
		const statusBar = {
			backgroundColor:'transparent',
			barStyle:'light-content',
		}
		const navigationBar = <NavigationBar 
			leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
			// rightButton={this.renderRightButton()}
			title={'关于我'}
			statusBar = {statusBar}
			style={{backgroundColor:'white'}}
		/>
		return<View>
			<Text>个人信息页</Text>
			{navigationBar}
		</View>
	}
}
export default AboutMePage