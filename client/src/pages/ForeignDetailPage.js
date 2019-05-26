import React,{Component} from 'react'
import { Text,View,ScrollView,StyleSheet,TouchableOpacity } from 'react-native'
import HTMLView from 'react-native-htmlview'
import {connect} from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import backPressComponent from '../component/backPressComponent'
import NavigationUtil from '../navigator/NavigationUtil'
import actions from '../action/index'
import ViewUtil from '../util/ViewUtil'
import NavigationBar from '../component/NavigationBar'
import { FLAG_STORAGE }  from '../expand/storage/DataStore'

const BAST_URL = 'http://192.168.1.102:3000/news_info/foreign?url='

class ForeignDetailPage extends Component{
	constructor(props){
		super(props)
		this.params = this.props.navigation.state.params;
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})

	}
	componentDidMount(){
		this.backPress.componentDidMount()
		this._loadData()

		/* console.log('这是url',ForeignUrl);
		
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
			}) */
	}
	_loadData = () => {
		const {ForeignUrl} = this.params;
		const { onLoadForeignNewsDetail }  = this.props
		console.log('路径',BAST_URL+ForeignUrl);
		
		onLoadForeignNewsDetail(BAST_URL+ForeignUrl)
	}
	componentWillUnmount(){
		this.backPress.componentWillUnmount()
	}
	onBackPress = () => {
		this.onBack()
		return true
	}
	onBack = () => {
		const { forseFresh } = this.params
		forseFresh()
		NavigationUtil.goBack(this.props.navigation)
	}

	renderRightButton() {
		return (
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity
						onPress={() => {
							this.onFavoriteButtonClick()
						}}>
						<FontAwesome
								name={this.props.detail.isFavorite?'star':'star-o'}
								size={20}
								style={{color: 'white', marginRight: 10}}
						/>
				</TouchableOpacity>
				{ViewUtil.getShareButton(() => {})}
			</View>
		)
	}

	onFavoriteButtonClick = () => {
		const { onEditFavorite } = this.props
		const {ForeignUrl} = this.params
		
		onEditFavorite(FLAG_STORAGE.flag_foreign,ForeignUrl,!this.props.detail.isFavorite)

	}

	render(){
		const {theme} = this.params
		const {detail:{item}} = this.props
		console.log('详情',this.props);
		const statusBar = {
			backgroundColor:theme.themeColor,
			barStyle:'light-content',
		}
		const navigationBar = <NavigationBar 
			title={'新闻详情'}
			leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
			rightButton={this.renderRightButton()}
			statusBar = {statusBar}
			style={theme.styles.navBar}
		/>
		return(
			item?
			<View>
				{navigationBar}
				<ScrollView style={styles.container}>
					<Text style={styles.title}>{item.title}</Text>
					<HTMLView
						value={item.content}
						onLinkPress={(url) => {
						}}
						stylesheet={{
								p: {color:'#333',fontFamily:'Serif'}
								// a: styles.description,
						}}
					/>
				</ScrollView>	
			</View>:<Text>暂无数据</Text>
		)
	}
}

const mapStateToProps = state=>({
	detail:state.newsDetail
})
const mapDispatchToProps = dispatch => ({
	onLoadForeignNewsDetail:url=>dispatch(actions.onLoadForeignNewsDetail(url)),
	onEditFavorite:(flag,content_id,isFavorite)=>dispatch(actions.onEditFavorite(flag,content_id,isFavorite))
})
export default connect(mapStateToProps,mapDispatchToProps)(ForeignDetailPage)

const styles = StyleSheet.create({
	container:{
		padding:10
	},
	title:{
		color:'#333',
		fontSize:22
	}
})