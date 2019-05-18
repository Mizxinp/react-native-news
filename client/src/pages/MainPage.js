import React from 'react'
import { View,Text,BackHandler } from 'react-native'
import {NavigationActions} from 'react-navigation'
// import { connect } from 'react-redux'

import NavigationUtil from '../navigator/NavigationUtil';
import DynamitTabNavigation from '../navigator/DynamitTabNavigation'
import backPressComponent from '../component/backPressComponent'

class MainPage extends React.Component{
	constructor(props){
		super(props);
		// this.backPress = new backPressComponent({backPress:this.onBackPress()})
	}
/* 	componentDidMount(){
		this.backPress.componentDidMount()
	}
	componentWillUnmount(){
		this.backPress.componentWillUnmount()
	}

	//  安卓物理返回键处理 
	onBackPress = () => {
		const {dispatch,nav} = this.props;
		if(nav.routes[1].index === 0){
			return false
		}
		dispatch(NavigationActions.back());
		return true
	} */

	render(){
		// 用于解决内层组件无法跳转到外层出现的问题
		// NavigationUtil.navigation = this.props.navigation
		return(
			<View style={{flex:1}}>
				<DynamitTabNavigation />
			</View>
			// <Text>首页</Text>
		)
	}
}

/* const mapStateToProps = state =>({
	nav:state.nav,
	customThemeViewVisible: state.theme.customThemeViewVisible,
  theme: state.theme.theme,
})

const mapDispatchToProps = dispatch => ({
	onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
}); */

export default MainPage