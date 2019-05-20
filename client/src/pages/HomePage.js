import React,{Component} from 'react'
import { Text,View,StyleSheet,Button,TouchableOpacity,TextInput } from 'react-native'
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation'
import ViewPager from "@react-native-community/viewpager";
import AntDesign from 'react-native-vector-icons/AntDesign'
import actons from '../action/index'
import { connect } from 'react-redux';

import NavigationBar from '../component/NavigationBar'

const BASE_URL = 'http://192.168.1.102:3000/news/'
const THEME_COLOR = '#678'
class HomePage extends Component{
	constructor(props){
		super(props)
		this.tabNames=['推荐','热点','科技','社会','娱乐']
		// this.props.onThemeChange('#666')
	}
	componentDidMount(){
		/* fetch(BASE_URL)
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
			}) */
	}
	changeTab = ()=>{
		const {theme} = this.props
		const tabs = {}
		this.tabNames.forEach((item,index)=>{
			// if(item.checked){
				tabs[`tab${index}`] = {
					//  这种方法可以传递相应的参数
					screen:props => <HomeTabPage {...props} tabLabel={item} theme={theme}/>,
					navigationOptions:{
						title:item
					}
			// }
				}
		})
		return tabs
	}

	renderTitleView = () => {
		return <View>
						<TouchableOpacity>
							<View>
							<TextInput
								style={styles.searchStyle}
								// onChangeText={(text) => this.setState({text})}
								// value={this.state.text}
							></TextInput>
							</View>
						</TouchableOpacity>
		</View>
	}
	render(){
		console.log('ha',this.props);
		const {theme} = this.props
		const TabNavigation = createAppContainer(createMaterialTopTabNavigator(
			this.changeTab(),
			{
				tabBarOptions:{
					tabStyle:styles.tabStyle,
					upperCaseLabel:false,
					scrollEnabled:true, //安卓下开启滚动，高度有问题
					style:{
						backgroundColor:theme.themeColor,
						height:40,
						// verticalAlign:'middle'
						// color:'red'
					},
					indicatorStyle:styles.indicatorStyle,
					labelStyle:styles.labelStyle
				},
				lazy:true
			}
		))

		const statusBar = {
			backgroundColor:theme.themeColor,
			barStyle:'light-content',
		}
		const navigationBar = <NavigationBar 
			titleView = {this.renderTitleView()}
			statusBar = {statusBar}
			style={theme.styles.navBar}
		/>

		return(
			<View style={styles.container}>
				{navigationBar}
				{TabNavigation&&<TabNavigation />}
			</View>
	
		)
	}
}

class HomeTabPage extends Component{
	render(){
		// console.log('ha',this.props);
		const {tabLabel} = this.props
		
		return(
			<View >
				<Text>{tabLabel}</Text>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	theme:state.theme.theme
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
		width:80
	},
	indicatorStyle: {
		height: 2,
		// width:20
	},
	labelStyle: {
			fontSize: 16,
			margin: 0,
			// top:5
			// color:'#666'
	},
	indicatorContainer: {
		alignItems: "center",
	},
	indicator: {
			// color: 'red',
			margin: 10
	},
	searchStyle:{
		flex: 1,
		height: 36,
		borderWidth: 0,
		borderColor: "white",
		alignSelf: 'center',
		paddingLeft: 5,
		marginRight: 10,
		marginLeft: 5,
		borderRadius: 3,
		opacity: 0.7,
		color: 'white'
	}
})