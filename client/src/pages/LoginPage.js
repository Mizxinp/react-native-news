import React,{Component} from 'react'
import {Text,View,TouchableOpacity,Button,StyleSheet,TextInput} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {connect} from 'react-redux'

import backPressComponent from '../component/backPressComponent'
import NavigationBar from '../component/NavigationBar'
import NavigationUtil from '../navigator/NavigationUtil'
import actions from '../action/index'
import Api from '../expand/api/api'

class LoginPage extends Component{
	constructor(props){
		super(props)
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})
		
		this.params = this.props.navigation.state.params;
		console.log('参数',this.params);
		
		this.state={
			username:'',
			password:'',
			error_visible:false
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
	renderRightButton = ()=> {
		return<TouchableOpacity
						onPress={this.onBackPress}
					>
						<AntDesign 
							name={'close'}
							size={20}
							style={{
								marginRight: 10,
								color: '#999',
						}}
						/>
					</TouchableOpacity>
	}

	handleLogin = () => {
		const {username,password} = this.state
		const { forceReflesh } = this.params
		
		const {onLogin} = this.props
		onLogin(username,password,'user',()=>{
			forceReflesh()
			this.props.navigation.goBack(null)
		},()=>{this.setState({error_visible:true})})
	}

	handleRegister = () => {
		console.log('密码',this.state.password);
		console.log('ha',this.props);
		
		// NavigationUtil.goBack(this.props.navigation)
	}

	render(){
		// console.log('login',this.props);
		
		const statusBar = {
			backgroundColor:'transparent',
			barStyle:'light-content',
		}
		const navigationBar = <NavigationBar 
			// leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
			rightButton={this.renderRightButton()}
			statusBar = {statusBar}
			style={{backgroundColor:'white'}}
		/>
		return(
			<View style={{flex:1,padding:20}}>
				{navigationBar}
				<Input
					placeholder='输入用户名'
					leftIcon={
						<AntDesign
							name='user'
							size={24}
							color='black'
						/>
					}
					errorStyle={{ color: 'red' }}
					leftIconContainerStyle={{left:-20}}
					onChangeText={(value)=>{this.setState({username:value,error_visible:false})}}
				/>
				<Input
					placeholder='密码'
					leftIcon={
						<AntDesign
							name='lock1'
							size={24}
							color='black'
						/>
					}
					leftIconContainerStyle={{left:-20}}
					onChangeText={(value)=>{this.setState({password:value,error_visible:false})}}
					password={true}
				/>
				{this.state.error_visible?<Text style={styles.errorMessage}>用户名或密码错误</Text>:<Text></Text>}
				<View style={styles.login}>
					<Button
						onPress={this.handleLogin}
						title='登录'
					/>
				</View>
				<View style={styles.register}>
					<Button
						onPress={this.handleRegister}
						title='注册'
					/>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state=>({
	user:state.user
})
const mapDispatchToProps = dispatch=>({
	onLogin:(username,password,type,successCallback,errorCallback)=>dispatch(actions.onLogin(username,password,type,successCallback,errorCallback))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)

const styles = StyleSheet.create({
	login:{
		marginTop:50
	},
	register:{
		marginTop:20
	},
	errorMessage:{
		color:'red',
		paddingLeft:10
	}
})