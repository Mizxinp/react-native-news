import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
		DeviceInfo,
		StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index'
import NavigationUtil from '../navigator/NavigationUtil'
import BackPressComponent from "../component/backPressComponent";
import GlobalStyles from '../assets/styles/GlobalStyles'
import ViewUtil from "../util/ViewUtil";
import Api from '../expand/api/api';
import HomeItem from '../component/homeItem'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Utils from "../util/Utils";
const pageSize = 10;//设为常量，防止修改
class SearchPage extends Component {
	constructor(props) {
			super(props);
			this.params = this.props.navigation.state.params;
			this.backPress = new BackPressComponent({backPress: (e) => this.onBackPress(e)});
	}

	componentDidMount() {
		const {searchKey} = this.params
			this.backPress.componentDidMount();
			if(searchKey){
				this._loadData()
			}
	}

	componentWillUnmount() {
			this.backPress.componentWillUnmount();
	}

	_loadData(loadMore) {
			const {searchKey} = this.params
			const { onSearch } = this.props
			const url = Api.searchUrl + searchKey
			onSearch(searchKey,url)
	}
	onBackPress() {
			this.refs.input.blur();
			NavigationUtil.goBack(this.props.navigation);
			return true;
	}

	onRightButtonClick() {
		this.loadData()
			/* const {onSearchCancel, search} = this.props;
			if (search.showText === '搜索') {
					this.loadData();
			} else {
					onSearchCancel(this.searchToken);
			} */
	}

	renderNavBar() {
			const {theme} = this.params;
			// const {showText, inputKey} = this.props.search;
			// const placeholder = inputKey || "请输入";
			let backButton = ViewUtil.getLeftBackButton(() => this.onBackPress());
			let inputView = <TextInput
					ref="input"
					placeholder={'请输入'}
					onChangeText={text => this.inputKey = text}
					style={styles.textInput}
					value='华为'
			>
			</TextInput>;
			let rightButton = this.renderRightButton()
			return <View style={{
					backgroundColor: theme.themeColor,
					flexDirection: 'row',
					alignItems: 'center',
					height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
			}}>
					{backButton}
					{inputView}
					{rightButton}
			</View>
	}

	renderRightButton = () => {
		const {theme} = this.params;
		return <TouchableOpacity
				onPress={() => {
						// AnalyticsUtil.track("SearchButtonClick");
						console.log('点击了');
						
						NavigationUtil.goPage({theme,searchKey:'华为'}, 'SearchPage')
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

	renderItem = (data) => {
		const {theme} = this.params
		console.log('dadd',data);
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

	render() {
		console.log('搜索props',this.props);
		const {search} = this.props
		const {theme} = this.params;
		let statusBar = <StatusBar backgroundColor={theme.themeColor}/>
		return <View
				style={GlobalStyles.root_container}
				topColor={theme.themeColor}
		>
				{statusBar}
				{this.renderNavBar()}
				<FlatList 
					data={search.items}
					renderItem={data=>this.renderItem(data)}
				/>
		</View>
	}
}

const mapStateToProps = state => ({
    search: state.search,
});
const mapDispatchToProps = dispatch => ({
    onSearch: (searchKey,url) => dispatch(actions.onSearch(searchKey,url)),
});

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0
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
    },
    statusBar: {
        height: 20
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: GlobalStyles.window_height - 45 - (DeviceInfo.isIPhoneX_deprecated ? 34 : 0),
        right: 10,
        borderRadius: 3
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
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
    title: {
        fontSize: 18,
        color: "white",
        fontWeight: '500'
    },
});

