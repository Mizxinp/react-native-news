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

class RegisterPage extends Component{
	constructor(props){
		super(props)
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})
		
		this.params = this.props.navigation.state.params;
		console.log('参数',this.params);
		
		this.state={
			username:'',
			password:'',
			confirmPassword:'',
			errorMsg:'',
			error_visible:false,
			button_visible:false
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

	handleRegister = () => {
		const {username,password,confirmPassword} = this.state
		const { reflesh } = this.params
		const {onRegister} = this.props
		if(confirmPassword!==password){
			this.setState({
				error_visible:true,
				errorMsg:'两次输入的密码不一致'
			})
			return
		}

		onRegister(username,password,'user',()=>{
			reflesh()
			this.props.navigation.goBack(null)
		},()=>{this.setState({
			error_visible:true,
			errorMsg:'用户名已存在'
		})})
	}

	toLogin = () => {
		NavigationUtil.goPage({},'LoginPage')
	}

	inputChange = (value,type) => {
		this.setState({[type]:value,error_visible:false},()=>{
			if(this.state.username&&this.state.password&&this.state.confirmPassword){
				this.setState({button_visible:true})
			}else{
				this.setState({button_visible:false})
			}
		})
	}

	render(){
		console.log('regisprops',this.props);
		const {theme} = this.props
		const {button_visible,error_visible,errorMsg} = this.state
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
					onChangeText={(value)=>{this.inputChange(value,'username')}}
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
					inputStyle={{marginTop:20}}
					secureTextEntry={true}
					leftIconContainerStyle={{left:-20}}
					onChangeText={(value)=>{this.inputChange(value,'password')}}
					password={true}
				/>
				<Input
					placeholder='确认密码'
					leftIcon={
						<AntDesign
							name='lock1'
							size={24}
							color='black'
						/>
					}
					inputStyle={{marginTop:20}}
					secureTextEntry={true}
					leftIconContainerStyle={{left:-20}}
					onChangeText={(value)=>{this.inputChange(value,'confirmPassword')}}
					password={true}
				/>
				{error_visible?<Text style={styles.errorMessage}>{errorMsg}</Text>:<Text></Text>}
				<View style={styles.login}>
					<Button
						onPress={this.handleRegister}
						title='注册'
						color={theme.themeColor}
						disabled={button_visible?false:true}
					/>
				</View>
				{/* <TouchableOpacity 
					style={styles.register}
					onPress={this.toLogin}
				>
					<Text>去登录</Text>
				</TouchableOpacity> */}
			</View>
		)
	}
}

const mapStateToProps = state=>({
	user:state.user,
	theme: state.theme.theme,
})
const mapDispatchToProps = dispatch=>({
	onRegister:(username,password,type,successCallback,errorCallback)=>dispatch(actions.onRegister(username,password,type,successCallback,errorCallback))
})

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage)

const styles = StyleSheet.create({
	login:{
		marginTop:50
	},
	register:{
		marginTop:20,
		alignItems: 'flex-end',
	},
	errorMessage:{
		color:'red',
		paddingLeft:10
	}
})