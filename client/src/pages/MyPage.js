import React from 'react'
import { View,Text,Button,StyleSheet,TouchableOpacity,ScrollView,AsyncStorage } from 'react-native'
import NavigationUtil from '../navigator/NavigationUtil'
import  Ionicons  from 'react-native-vector-icons/Ionicons'
import  EvilIcons  from 'react-native-vector-icons/EvilIcons'
import {connect} from 'react-redux'

import actions from '../action/index'
import NavigationBar from '../component/NavigationBar'
import GlobalStyles from "../assets/styles/GlobalStyles";
import {MORE_MENU} from '../component/MORE_MENU'
import ViewUtil from '../util/ViewUtil'
// import {FLAG_LANGUAGE}from '../expand/storage/LanguageDao'


class MyPage extends React.Component{
	constructor(props){
		super(props)
		this.state={
			login_visible:false,
			register_visible:false
		}
	}
	componentDidMount(){
		console.log('执行了生命周期');
		
	}
	onClick = (menu) => {
		const {theme,user} = this.props
		let RouteName,params = {theme}
		switch (menu){
			case MORE_MENU.Custom_Theme: //自定义主题
					const {onShowCustomThemeView} = this.props;
					onShowCustomThemeView(true);
					break;
			case MORE_MENU.My_Collection:
					RouteName="MyCollectionPage";
					params.title='我的收藏';
					params.theme=theme;
					break
			case MORE_MENU.Login:
					params.forceReflesh=()=>{
						this.setState({login_visible:!this.state.login_visible})
					}
					RouteName="LoginPage";
					break
			case MORE_MENU.Register:
					params.reflesh=()=>{
						this.setState({login_visible:!this.state.login_visible})
					}
					RouteName="RegisterPage";
					break
			case MORE_MENU.About_Author:
					RouteName = 'AboutMePage';
					break;
			case MORE_MENU.Subscribe_tag:
					params.theme=theme;
					params.user_id=user.data._id
					RouteName = 'SubscribePage';
					break;
		}
		if(RouteName){
			NavigationUtil.goPage(params,RouteName)
		}
	}
	getItem = (menu) => {
		const { theme } = this.props
		return ViewUtil.getMenuItem(() => this.onClick(menu), menu, theme.themeColor);
	}
	getCollectionItem = (menu) => {
		const { theme } = this.props
		return ViewUtil.getMenuItem(() => this.toMyCollection(menu), menu, theme.themeColor);
	}
	getSubscribeItem = (menu) => {
		const { theme } = this.props
		return ViewUtil.getMenuItem(() => this.toSubscribe(menu), menu, theme.themeColor);
	}
	toMyCollection = () => {
		const {user} = this.props
		if(user.data){
			this.onClick(MORE_MENU.My_Collection)
		}else{
			this.onClick(MORE_MENU.Login)
		}
	}
	toSubscribe = () => {
		const {user} = this.props
		if(user.data){
			this.onClick(MORE_MENU.Subscribe_tag)
		}else{
			this.onClick(MORE_MENU.Login)
		}
	}
	handleLogin = () => {
		const {user} = this.props
		if(user.data){
			// console.log('已经登录了');
			this.onClick(MORE_MENU.About_Author)
		}else{
			this.onClick(MORE_MENU.Login)
		}
	}
	handleLogout = () => {
		const { onLogout } = this.props;
		onLogout()
	}
	
	toRegister = () => {
		NavigationUtil.goPage({
			forceReflesh(){
				// console.log('进入回调');
				this.setState({register_visible:!this.state.register_visible})
				// this.setState({register_visible:!this.state.register_visible})
			}
		},'RegisterPage')
	}
	// toLogin = () =
	render(){
		console.log('我的页面props',this.props);
		// console.log('获取持久化数据',user_id);
		// AsyncStorage.getItem('user',(err,result)=>{
		// 	if(!err){
		// 		console.log('获取用户数据',result);	
		// 	}
		// })
		
		const {theme,user} = this.props
		const statusBar = {
			backgroundColor:theme.themeColor,
			barStyle:'light-content',
		}
		const navigationBar = <NavigationBar 
			title={'我的'}
			statusBar = {statusBar}
			style={{backgroundColor:theme.themeColor}}
			// leftButton={this.getLeftButten()}
			// rightButton={this.getRightButten()}
		/>

		// let userData = {}
		// AsyncStorage.getItem('user',(err,result)=>{
		// 	if(!err){
		// 		console.log('获取用户数据',result);	
		// 		userData = result
		// 	}
		// })

		return(
			<View style={GlobalStyles.root_container}>
				{navigationBar}
				<ScrollView>
					{user.data?
					<TouchableOpacity
						style={styles.item}
						onPress={this.handleLogin}
					>
						<View style={styles.about_left}>
								<Ionicons
										name={MORE_MENU.Login.icon}
										size={40}
										style={{
												marginRight: 10,
												color: theme.themeColor,
										}}
								/>
								{/* {userData.username} */}
								<Text>{user.data.username}</Text>
						</View>
						<Ionicons
								name={'ios-arrow-forward'}
								size={16}
								style={{
										marginRight: 10,
										alignSelf: 'center',
										color:theme.themeColor,
								}}/>
					</TouchableOpacity>:
					<TouchableOpacity 
						style={styles.unLoginWrap}
						onPress={this.handleLogin}
					>
						<View style={styles.unLogin} >
							<Text style={styles.textLogin}>登录</Text>
						</View>
					</TouchableOpacity>
					}
					<View style={GlobalStyles.line}/>
					{this.getCollectionItem(MORE_MENU.My_Collection)}
					{/*首页管理*/}
					{/* <Text style={styles.groupTitle}>首页管理</Text> */}
					{/*我的订阅*/}
					{this.getSubscribeItem(MORE_MENU.Subscribe_tag)}
					{/*语言排序*/}
					<View style={GlobalStyles.line}/>
					{this.getItem(MORE_MENU.Sort_Language)}

					{/*最热管理*/}
					{/* <Text style={styles.groupTitle}>国际管理</Text> */}
					{/*自定义标签*/}
					{/* {this.getItem(MORE_MENU.Custom_Key)} */}
					{/*标签排序*/}
					{/* <View style={GlobalStyles.line}/> */}
					{/* {this.getItem(MORE_MENU.Sort_Key)} */}
					{/*标签移除*/}
					{/* <View style={GlobalStyles.line}/> */}
					{/* {this.getItem(MORE_MENU.Remove_Key)} */}

					{/*设置*/}
					{/* <Text style={styles.groupTitle}>设置</Text> */}
					{/*自定义主题*/}
					{this.getItem(MORE_MENU.Custom_Theme)}
					{/*关于作者*/}
					{/* <View style={GlobalStyles.line}/>
					{this.getItem(MORE_MENU.About_Author)} */}
					<View style={GlobalStyles.line}/>
					{/*反馈*/}
					{this.getItem(MORE_MENU.Feedback)}
					<View style={GlobalStyles.line}/>
					{
						user.data?
						<View style={{marginTop:10}}>
							<Button
								onPress={this.handleLogout}
								title="退出登录"
								color={theme.themeColor}
							/>
						</View>:
						<View style={{marginTop:10}}>
							<Button
								onPress={()=>this.onClick(MORE_MENU.Register)}
								title="注册"
								color={theme.themeColor}
							/>
						</View>
					}
					{/* {this.getItem(MORE_MENU.CodePush)} */}
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	theme: state.theme.theme,
	user:state.user
});

const mapDispatchToProps = dispatch => ({
	onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
	onLogin:(username,password,type)=>dispatch(actions.onLogin(username,password,type)),
	onLogout:()=>dispatch(actions.onLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30
	},
	about_left: {
			alignItems: 'center',
			flexDirection: 'row'
	},
	item: {
			backgroundColor: 'white',
			padding: 10,
			height: 90,
			alignItems: 'center',
			justifyContent: 'space-between',
			flexDirection: 'row'
	},
	groupTitle: {
			marginLeft: 10,
			marginTop: 10,
			marginBottom: 5,
			fontSize: 12,
			color: 'gray'
	},
	unLoginWrap:{
		justifyContent:'center',
		alignItems:'center'
	},
	unLogin:{
		width:80,
		height:80,
		borderRadius:40,
		backgroundColor:'red',
		marginTop:10,
		marginBottom:10,
		justifyContent:'center',
		alignItems:'center'
	},
	textLogin:{
		color:'#fff'
	}
})

