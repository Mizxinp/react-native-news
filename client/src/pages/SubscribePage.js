import React ,{Component} from 'react'
import { View,Text,ScrollView,StyleSheet,Alert,TouchableOpacity } from 'react-native'
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'


import NavigationBar from '../component/NavigationBar'
import backPressComponent from '../component/backPressComponent'
import NavigationUtil from '../navigator/NavigationUtil'
import ViewUtil from '../util/ViewUtil'
import actions from '../action/index'
import DataStore from '../expand/storage/DataStore'


class SubscribePage extends Component{
	constructor(props){
		super(props)
		this.params = this.props.navigation.state.params;
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})
		this.dataStore = new DataStore();
		this.state = {
			tags:[]
		}
	}
	componentDidMount(){
		const { user_id } = this.params
		this.backPress.componentDidMount()
		
		const { onLoadSubscribe } = this.props
		onLoadSubscribe(user_id,()=>{
			const {subscribe} = this.props
			this.setState({tags:subscribe.tags},()=>{
				console.log('这是数据',this.state.tags);
				
			})
		})
	}
	componentWillUnmount(){
		this.backPress.componentWillUnmount()
	}
	onBackPress = () => {
		this.onBack()
		return true
	}
	onBack() {
		if (false) {
			Alert.alert('提示', '要保存修改吗？',
				[
					{
						text: '否', onPress: () => {
								NavigationUtil.goBack(this.props.navigation)
						}
					}, 
					{
						text: '是', onPress: () => {
								this.onSave();
						}
					}
				]
			)
		} else {
				NavigationUtil.goBack(this.props.navigation)
		}
	}
	_loadData=() =>{

	}
	onSave = () => {
		const {onEditSubscribe} = this.props;
		const { user_id } = this.params
		onEditSubscribe(user_id,this.state.tags,()=>{
			NavigationUtil.goBack(this.props.navigation)
			
		},()=>{
			Alert.alert('', '保存失败',
				[
					{
						text: '退出', onPress: () => {
								// NavigationUtil.goBack(this.props.navigation)
						}
					}
				]
			)
		})
	}
	onClick = (data, index)=> {
		data.checked = !data.checked;
		// ArrayUtil.updateArray(this.changeValues, data);
		this.state.tags[index] = data;//更新state以便显示选中状态
		this.setState({
			tags: this.state.tags
		})
	}
	renderView() {
		const {subscribe} = this.props
		
		let dataArray = subscribe.tags;
		if (!dataArray || dataArray.length === 0) return;
		let len = dataArray.length;
		let views = [];
		for (let i = 0, l = len; i < l; i += 2) {
				views.push(
						<View key={i}>
								<View style={styles.item}>
										{this.renderCheckBox(dataArray[i], i)}
										{i + 1 < len && this.renderCheckBox(dataArray[i + 1], i + 1)}
								</View>
								<View style={styles.line}/>
						</View>
				)
		}
		return views;
	}
	_checkedImage(checked) {
		// const {theme} = this.params;
		const {theme} = this.params
		return <Ionicons
			name={checked ? 'ios-checkbox' : 'md-square-outline'}
			size={20}
			style={{
					color: theme.themeColor,
			}}
		/>
	}

	renderCheckBox(data, index) {
		return <CheckBox
			style={{flex: 1, padding: 10}}
			onClick={() => this.onClick(data, index)}
			isChecked={data.checked}
			leftText={data.name}
			checkedImage={this._checkedImage(true)}
			unCheckedImage={this._checkedImage(false)}
		/>
	}
	
	render(){
		console.log();
		
		const { theme } =this.params
		// let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
		let navigationBar = <NavigationBar
		title={'我的订阅'}
		leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
		style={theme.styles.navBar}
		rightButton={ViewUtil.getRightButton('保存', () => this.onSave())}
		/>;
		return (
			<View style={styles.container}>
				{navigationBar}
				<ScrollView>
					{this.renderView()}
				</ScrollView>
			</View>
		)
			
		
	}
}

const mapStateToProps = state=>({
	subscribe:state.subscribe
})
const mapDispatchToProps = dispatch=>({
	onLoadSubscribe:(user_id,successCallback)=>dispatch(actions.onLoadSubscribe(user_id,successCallback)),
	onEditSubscribe:(user_id,tags,successCallback,errorCallback)=>dispatch(actions.onEditSubscribe(user_id,tags,successCallback,errorCallback)),
})
export default connect(mapStateToProps,mapDispatchToProps)(SubscribePage)


const styles = StyleSheet.create({
	container: {
			flex: 1,
	},
	item: {
			flexDirection: 'row',
	},
	line: {
			flex: 1,
			height: 0.3,
			backgroundColor: 'darkgray',
	}
});