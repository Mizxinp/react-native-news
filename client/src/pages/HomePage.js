import React,{Component} from 'react'
import { Text,View,StyleSheet,AsyncStorage,Platform,Button,StatusBar,TouchableOpacity,TextInput,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation'
import ViewPager from "@react-native-community/viewpager";
import AntDesign from 'react-native-vector-icons/AntDesign'
import actions from '../action/index'
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast'

import NavigationBar from '../component/NavigationBar'
import {changeTag} from '../util/util'
import HomeItem from '../component/homeItem'
import NavigationUtil from '../navigator/NavigationUtil'
import Api from '../expand/api/api'
import Ionicons from 'react-native-vector-icons/Ionicons'
import GlobalStyles from '../assets/styles/GlobalStyles'

const BASE_URL = Api.nationalURL

const pageSize = 10;
class HomePage extends Component{
	constructor(props){
		super(props)
		this.tabNames=['推荐','热点','科技','社会','娱乐']
		this.searchKey
		// this.tabNames=['all','java','react']
		// this.props.onThemeChange('#666')
	}
	componentDidMount(){
		AsyncStorage.clear()
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
		return <TextInput
							ref="input"
							placeholder={'请输入'}
							onChangeText={text => this.inputKey = text}
							style={styles.textInput}
					/>
	}

	renderRightButton = () => {
		const {theme} = this.props;
		return <TouchableOpacity
				onPress={() => {
						// AnalyticsUtil.track("SearchButtonClick");
						console.log('点击了');
						
						NavigationUtil.goPage({theme,searchKey:this.searchKey}, 'SearchPage')
				}}
		>
				<View style={{padding: 5, marginRight: 8}}>
						<Ionicons
								name={'ios-search'}
								size={24}
								style={{
										marginRight: 8,
										alignSelf: 'center',
										color: 'white',
								}}/>
				</View>
		</TouchableOpacity>
	}

	renderNavBar() {
		const {theme} = this.props;
		// const {showText, inputKey} = this.props.search;
		// const placeholder = inputKey || "请输入";
		// let backButton = ViewUtil.getLeftBackButton(() => this.onBackPress());
		let inputView = <TextInput
				ref="input"
				placeholder={'请输入'}
				onChangeText={text => this.searchKey = text}
				// value="华为"
				style={styles.textInput}
		>
		</TextInput>;
		let rightButton = this.renderRightButton()
				
		return <View style={{
				backgroundColor: theme.themeColor,
				flexDirection: 'row',
				alignItems: 'center',
				height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
		}}>
				{inputView}
				{rightButton}
		</View>
}

	render(){
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
				// lazy:true
			}
		))
		
		let statusBar = <StatusBar backgroundColor={theme.themeColor}/>


		return(
			<View style={styles.container}>
				{statusBar}
				{this.renderNavBar()}
				{TabNavigation&&<TabNavigation />}
			</View>
	
		)
	}
}

const mapHomeStateToProps = state => ({
	theme:state.theme.theme
})
const mapHomeDispatchToProps = dispatch => ({
	onThemeChange:(theme)=>dispatch(actions.onThemeChange(theme))
})
export default connect(mapHomeStateToProps,mapHomeDispatchToProps)(HomePage)

/* 页面主体 */
class HomeTab extends Component{
	constructor(props){
		super(props);
		const {tabLabel} = this.props
		this.tagName = tabLabel
		this.state={
			pageIndex:1,
			loadMorePageIndex:1
		}
	}
	componentDidMount(){
		this._loadData(false,false)

	}

	// 初始化数据
	_loadData = ( loadMore ) => {
		const { onLoadRefreshHome } = this.props
		const url = this.getFetchUrl(this.tagName,this.state.pageIndex,1)
		onLoadRefreshHome(this.tagName,url,pageSize)
		
	}

	_reflesh = (flag) =>{
		const { onLoadRefreshHome,onLoadMoreHome } = this.props
		if(flag==1){
			this.setState(preState=>{
				return {pageIndex:preState.pageIndex+1}
			},()=>{
				
				const url = this.getFetchUrl(this.tagName,this.state.pageIndex,flag)
				onLoadRefreshHome(this.tagName,url,pageSize)
			})
		}else{
			this.setState(preState=>{
				return {loadMorePageIndex:preState.loadMorePageIndex+1}
			},()=>{
				// storeName,pageIndex,pageSize,callback
				const url = this.getFetchUrl(this.tagName,this.state.loadMorePageIndex,flag)
				onLoadMoreHome(this.tagName,url,this.state.loadMorePageIndex,pageSize,callback=>{
					this.refs.toast.show('没有更多了')
				})
			})
		}
	}

	//获取请求路径
	getFetchUrl = (key,pageIndex,flag) => {
		let tag = changeTag(key)
		
		return BASE_URL+tag+`&pageIndex=${pageIndex}&pageSize=10&flag=${flag}`
	}

	//获取与当前页面有关的数据
	_store() {
		const {home} = this.props;
		let store = home[this.tagName];
		
		
		if (!store) {
				store = {
						items: [],
						isLoading: false,
						projectModels: [],//要显示的数据
						hideLoadingMore: true,//默认隐藏加载更多
				}
		}
		// console.log('获取到的数据;',store);
		return store;
	}
	renderItem = (data) => {
		const {theme} = this.props
		// console.log('dadd',data);
		return <HomeItem 
							data={data}
							onSelect={(callback)=>{
								NavigationUtil.goPage({
									theme,
									contentId:data.item.item_id,
									forseFresh(){
									}
								},'DetailPage')
							}} 
							theme={theme}
						/>
	}
	genIndicator() {
		return this._store().hideLoadingMore ? null :
			<View style={styles.indicatorContainer}>
					<ActivityIndicator
							style={styles.indicator}
					/>
					<Text>正在加载更多</Text>
			</View>
	}
	render(){
		const {tabLabel,theme} = this.props
		let store = this._store()
		return(
			<View >
				{/* <Text>{tabLabel}</Text>s */}
				<FlatList 
					data={store.projectModels}
					renderItem={data=>this.renderItem(data)}
					keyExtractor = {item => ''+item.item_id}
					refreshControl={
						<RefreshControl 
							title={'loading'}
							titleColor={theme.themeColor}
							color={theme.themeColor}
							refreshing={store.isLoading}
							onRefresh={()=>{this._reflesh(1)}}
							tintColor={theme.themeColor}
						/>
					}
					ListFooterComponent={()=>this.genIndicator()}
					onEndReached={() => {
						setTimeout(() => {
								if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
									// console.log('触发2');
									
										this._reflesh(2);
										this.canLoadMore = false;
								}
						}, 100);
					}}
					onEndReachedThreshold={0.5}
					onContentSizeChange={() => {
						// console.log('触发1');						
						this.canLoadMore = true // flatview内部组件布局完成以后会调用这个方法
				}}
				/>
				<Toast 
					ref='toast'
					position={'center'}
				/>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	home:state.home
})
const mapDispatchToProps = dispatch => ({
	onLoadRefreshHome:(storeName,url,pageSize) => dispatch(actions.onLoadRefreshHome(storeName,url,pageSize)),
	onLoadMoreHome:(storeName,url,pageIndex,pageSize,items,callback) => dispatch(actions.onLoadMoreHome(storeName,url,pageIndex,pageSize,items,callback)),
	// onFlushPopularFavorite:(storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavorite(storeName, pageIndex, pageSize, items, favoriteDao))
})
const HomeTabPage = connect(mapStateToProps,mapDispatchToProps)(HomeTab) 

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
			margin: 10
	},
	textInput:{
		flex: 1,
		height: 35,
		borderWidth: 1,
		borderColor: "white",
		alignSelf: 'center',
		paddingLeft: 5,
		marginRight: 10,
		marginLeft: 20,
		borderRadius: 3,
		backgroundColor:'white',
		width:'100%',
	},
})