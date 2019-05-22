import React,{Component} from 'react'
import { Text,View,StyleSheet,Button,TouchableOpacity,TextInput,FlatList } from 'react-native'
import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation'
import ViewPager from "@react-native-community/viewpager";
import AntDesign from 'react-native-vector-icons/AntDesign'
import actions from '../action/index'
import { connect } from 'react-redux';

import NavigationBar from '../component/NavigationBar'
import {changeTag} from '../util/util'
import HomeItem from '../component/homeItem'

const BASE_URL = 'http://192.168.1.102:3000/news/national?tag='
// const URL = `https://api.github.com/search/repositories?q=`
const pageSize = 10;
class HomePage extends Component{
	constructor(props){
		super(props)
		this.tabNames=['推荐','热点','科技','社会','娱乐']
		// this.tabNames=['all','java','react']
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
			// title={'热门'}
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
	}
	componentDidMount(){
		this._loadData()
	}

	// 初始化数据
	_loadData = ( loadMore ) => {
		const { onLoadRefreshHome } = this.props
		const url = this.getFetchUrl(this.tagName)
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

	//获取请求路径
	getFetchUrl = (key) => {
		let tag = changeTag(key)
		console.log('标签',tag);
		
		return BASE_URL+tag
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
		console.log('单列表的数据',data);
		return <HomeItem 
							data={data}
						/>
	}
	render(){
		console.log('ha',this.props);
		const {tabLabel} = this.props
		let store = this._store()
		return(
			<View >
				{/* <Text>{tabLabel}</Text>s */}
				<FlatList 
					data={store.projectModels}
					renderItem={data=>this.renderItem(data)}
					
					// keyExtractor = {item => '' + item}
					// keyExtractor = {item => ''+item.item.id}
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
	// onLoadMorePopular:(storeName,pageIndex,pageSize,items,favoriteDao,callback) => dispatch(actions.onLoadMorePupular(storeName,pageIndex,pageSize,items,favoriteDao,callback)),
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