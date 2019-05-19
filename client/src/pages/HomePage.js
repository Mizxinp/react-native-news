import React,{Component} from 'react'
import { Text,View,StyleSheet,Button } from 'react-native'
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation'
import ViewPager from "@react-native-community/viewpager";

import AntDesign from 'react-native-vector-icons/AntDesign'
import actons from '../action/index'
import { connect } from 'react-redux';

const BASE_URL = 'http://192.168.1.102:3000/news/'
const THEME_COLOR = '#678'
class HomePage extends Component{
	constructor(props){
		super(props)
		this.tabNames=['热门','历史','体育']
	}
	componentDidMount(){
		fetch(BASE_URL)
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
	changeTab = ()=>{
		const tabs = {}
		this.tabNames.forEach((item,index)=>{
			// if(item.checked){
				tabs[`tab${index}`] = {
					//  这种方法可以传递相应的参数
					screen:props => <HomeTabPage {...props} tabLabel={item}/>,
					navigationOptions:{
						title:item
					}
			// }
				}
		})
		
		return tabs

	}
	render(){
		console.log('ha',this.props);
		const TabNavigation = createAppContainer(createMaterialTopTabNavigator(
			this.changeTab(),
			{
				tabBarOptions:{
					tabStyle:styles.tabStyle,
					upperCaseLabel:false,
					scrollEnabled:true, //安卓下开启滚动，高度有问题
					style:{
						backgroundColor:THEME_COLOR,
						height:30,
					},
					indicatorStyle:styles.indicatorStyle,
					labelStyle:styles.labelStyle
				},
				lazy:true
			}
		))
		return(
			<View style={styles.container}>
				{/* {navigationBar} */}
				{TabNavigation&&<TabNavigation />}
				<Button
					title="改变主题色"
					onPress={() => {
							// let {dispatch} = this.props.navigation;
							// dispatch(onThemeChange('red'))
							this.props.onThemeChange('red');
					}} 
				/>
			</View>
	
		)
	}
}

class HomeTabPage extends Component{
	changeTheme = () => {

	}
	render(){
		// console.log('ha',this.props);
		const {tabLabel} = this.props
		
		return(
			<View style={styles.container}>
				<Text>{tabLabel}</Text>
				
				

			</View>
		)
	}
}

const mapStateToProps = state => ({
	// theme:state.theme.theme
})
const mapDispatchToProps = dispatch => ({
	onThemeChange:(theme)=>dispatch(actons.onThemeChange(theme))
})

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabStyle:{
		// minWidth:50
	},
	indicatorStyle: {
		height: 2,
		backgroundColor: 'white'
	},
	labelStyle: {
			fontSize: 13,
			margin: 0,
	},
	indicatorContainer: {
		alignItems: "center"
	},
	indicator: {
			color: 'red',
			margin: 10
	}
})