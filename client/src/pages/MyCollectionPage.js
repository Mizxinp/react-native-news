import React,{Component}from 'react'
import {Text,View,StyleSheet,FlatList} from 'react-native'
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation'
import {connect} from 'react-redux'

import backPressComponent from '../component/backPressComponent'
import NavigationUtil from '../navigator/NavigationUtil'
import NavigationBar from '../component/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import { FLAG_STORAGE } from '..//expand/storage/DataStore'
import actions from '../action/index'
import Api from '../expand/api/api'
import HomeItem from '../component/homeItem'
import ForeignItem from '../component/foreignItem'

class MyCollectionPage extends Component{
	constructor(props){
		super(props)
		this.params = this.props.navigation.state.params;
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})
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
		const {theme} = this.params
		const TabNavigation = createAppContainer(createMaterialTopTabNavigator({
			'National': {
				screen: props => <CollectionTabPage {...props} flag={FLAG_STORAGE.flag_national} theme={theme}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
				navigationOptions: {
						title: '国内新闻',
				},
			},
			'Foreign': {
				screen: props => <CollectionTabPage {...props} flag={FLAG_STORAGE.flag_foreign} theme={theme}/>,//初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
				navigationOptions: {
						title: '国外新闻',
				},
			},
		},
		{
			tabBarOptions:{
				tabStyle:styles.tabStyle,
				upperCaseLabel:false,
				style:{
					backgroundColor:theme.themeColor,
					height:30,
				},
				indicatorStyle:styles.indicatorStyle,
				labelStyle:styles.labelStyle
			}
		}
		))
		const statusBar = {
			backgroundColor:theme.themeColor,
			barStyle:'light-content',
		}
		const navigationBar = <NavigationBar 
			title={'我的收藏'}
			leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
			// rightButton={this.renderRightButton()}
			statusBar = {statusBar}
			style={theme.styles.navBar}
		/>
		return(
			<View style={styles.container}>
				{navigationBar}
				<TabNavigation />
				{/* <Text>jj</Text> */}
			</View>
		)
	}
}

export default MyCollectionPage

class CollectionTab extends Component{
	constructor(props){
		super(props)
		const { flag } = this.props
		this.tagName = flag
	}
	componentDidMount(){
		this._loadData(true)
	}
	
	_loadData = ( isShowLoading ) => {
		const { onLoadFavoriteData } = this.props
		const url = Api.loadFavoriteDataUrl+this.tagName
		onLoadFavoriteData(this.tagName,url,isShowLoading)
	}

	//获取与当前页面有关的数据
	_store() {
		const {favorite} = this.props;
		let store = favorite[this.tagName];
		if (!store) {
				store = {
						items: [],
						isLoading: false,
						projectModels: [],//要显示的数据
				}
		}
		console.log('获取到的数据',store);
		return store;
	}

	renderItem = (data) => {
		const {theme} = this.props
		console.log('单个数据',data);
		const that = this
		// const Item = this.tagName === FLAG_STORAGE.flag_national ? HomeItem : ForeignItem;
		// return <Text>jjj</Text>
		if(this.tagName==FLAG_STORAGE.flag_national){
			return<HomeItem 
						data={data}
						onSelect={(callback)=>{
							NavigationUtil.goPage({
								theme,
								contentId:data.item.content_id,
								forseFresh(){
									that._loadData()
								}
							},'DetailPage')
						}} 
						theme={theme}
					/>
		}else{
			return<ForeignItem 
							data={data}
							onSelect={(callback)=>{
								NavigationUtil.goPage({
									theme,
									ForeignUrl:data.item.url,
									forseFresh(){
										that._loadData()
									}
								},'ForeignDetailPage')
							}} 
							theme={theme}
						/>
		}
		
	}

	render(){
		const store = this._store()
		return(
			<View>
			{/* <Text>子页面</Text> */}
				<FlatList 
					data={store.projectModels}
					renderItem={data=>this.renderItem(data)}
					// keyExtractor = {item => '' + item}
					// keyExtractor={item => "" + (item.item.id || item.item.fullName)}
					
					
				/>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	favorite:state.favorite,
})
const mapDispatchToProps = dispatch => ({
	onLoadFavoriteData:(tagName,isShowLoading) => dispatch(actions.onLoadFavoriteData(tagName,isShowLoading)),
})
const CollectionTabPage = connect(mapStateToProps,mapDispatchToProps)(CollectionTab) 


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