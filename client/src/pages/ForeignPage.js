import React,{Component} from 'react'
import { Text,View,StyleSheet,Button,TouchableOpacity,TextInput,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation'
import ViewPager from "@react-native-community/viewpager";
import AntDesign from 'react-native-vector-icons/AntDesign'
import actions from '../action/index'
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast'

import NavigationBar from '../component/NavigationBar'
import {changeForeignTag} from '../util/util'
import ForeignItem from '../component/foreignItem'
import NavigationUtil from '../navigator/NavigationUtil'

const BASE_URL = 'http://192.168.1.102:3000/news/foreign?tag='
// const URL = `https://api.github.com/search/repositories?q=`
const pageSize = 10;
class HomePage extends Component{
	constructor(props){
		super(props)
		this.tabNames=['综合','科学','体育','科技','娱乐']
		// this.tabNames=['all','java','react']
		// this.props.onThemeChange('#666')
	}
	componentDidMount(){
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
			// titleView = {this.renderTitleView()}
			title={'国际新闻'}
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
		console.log('这是url',url);
		
		// let store = this._store()
		// if(loadMore){
		// 	onLoadMorePopular(this.storeName,++store.pageIndex,pageSize,store.items,favoriteDao,callback=>{
		// 		this.refs.toast.show('没有更多了')
		// 	})
		// }else if(freshFavorite){
		// 	onFlushPopularFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
		// 	this.isFavoriteChanged = false;
		// }else{
		// 	onLoadRefreshPopular(this.storeName,url,pageSize,favoriteDao)
		// }
		onLoadRefreshHome(this.tagName,url,pageSize)
		
	}

	_reflesh = (flag) =>{
		const { onLoadRefreshHome,onLoadMoreHome } = this.props
		if(flag==1){
			this.setState(preState=>{
				return {pageIndex:preState.pageIndex+1}
			},()=>{
				console.log('刷星之后的',this.state.pageIndex);
				
				const url = this.getFetchUrl(this.tagName,this.state.pageIndex,flag)
				onLoadRefreshHome(this.tagName,url,pageSize)
			})
		}else{
			this.setState(preState=>{
				return {loadMorePageIndex:preState.loadMorePageIndex+1}
			},()=>{
				console.log('刷星之后的',this.state.pageIndex);
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
		let tag = changeForeignTag(key)
		
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
		// console.log('获取到的外文数据;',store);
		return store;
	}
	renderItem = (data) => {
		const {theme} = this.props
		// console.log('dadd',data);
		
		return <ForeignItem 
							data={data}
							onSelect={(callback)=>{
								NavigationUtil.goPage({
									theme,
									ForeignUrl:data.item.url,
									forseFresh(){
									}
								},'ForeignDetailPage')
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
		console.log('ha',this.props);
		const {tabLabel,theme} = this.props
		let store = this._store()
		// return <Text>jjj</Text>
		return(
			<View >
				{/* <Text>{tabLabel}</Text>s */}
				<FlatList 
					data={store.projectModels}
					renderItem={data=>this.renderItem(data)}
					keyExtractor = {item => ''+item.title}
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
					// ListFooterComponent={()=>this.genIndicator()}
					onEndReached={() => {
						setTimeout(() => {
								if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
									console.log('触发2');
									
										this._reflesh(2);
										this.canLoadMore = false;
								}
						}, 100);
					}}
					onEndReachedThreshold={0.5}
					onContentSizeChange={() => {
						console.log('触发1');						
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