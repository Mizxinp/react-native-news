import React ,{Component} from 'react'
import { View,Text,ScrollView,StyleSheet,Image,TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import HTMLView from 'react-native-htmlview'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


import NavigationBar from '../component/NavigationBar'
import backPressComponent from '../component/backPressComponent'
import NavigationUtil from '../navigator/NavigationUtil'
import ViewUtil from '../util/ViewUtil'
import actions from '../action/index'
import { FLAG_STORAGE }  from '../expand/storage/DataStore'

const BASE_URL = 'http://192.168.1.102:3000/news_info/national?content_id='

class DetailPage extends Component{
	constructor(props){
		super(props)
		this.params = this.props.navigation.state.params;
		this.backPress = new backPressComponent({backPress:()=>this.onBackPress()})
		this.state={
			isFavorite:false
		}
	}
	componentDidMount(){

		/* fetch('http://192.168.1.102:3000/news_info/editFavorite',{
			method:'POST',
			body:{
				flag:'national',
				content_id:11,
				checked:true
			}
		})
			.then((response)=>{
				if(response.ok){
					return response.json()
				}else{
					throw new Error('Network response was not ok')
				}
			})
			.then((responseData)=>{
				console.log('测试收藏结果',responseData);
			})
			.catch(error=>{
				console.log('error',error);
			}) */


		const {contentId} = this.params
		const {onLoadNewsDetail}=this.props
		console.log('id',contentId);
		
		this.backPress.componentDidMount()
		onLoadNewsDetail(contentId,BASE_URL+contentId)
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
	_loadData=() =>{

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
		const {contentId} = this.params
		
		onEditFavorite(FLAG_STORAGE.flag_national,contentId,!this.props.detail.isFavorite)

	}
	renderComment=(data) =>{
		const {user} = data
		return <View style={{marginTop:15}} key={data.content_id}>
						<View style={styles.discript}>
							<View style={styles.left}>
								{user&&<Image style={styles.avatar}
									source={{uri: user.avatar_url}}
								/>}
								<View style={styles.sourse}>
									<Text style={{color:'skyblue'}}>{user.name}</Text>
									{/* <Text style={styles.sourse}>{item.is_original&&'原创'}</Text> */}
								</View>
							</View>
							
							<View style={{}}>
								<Text style={{textAlign:'center',}}>
									<AntDesign
											name={'like2'}
											size={20}
											style={{
													// marginRight: 10,
											}}
									/>
									{data.digg_count}
								</Text>
							</View>
						</View>
						<View style={{marginTop:10,paddingLeft:29,paddingRight:20}}>
							<Text style={{marginBottom:10}}>{data.text}</Text>
							<Text>{data.reply_count}回复</Text>
						</View>
					</View>
	}
	render(){
		const {theme} = this.params
		console.log('传过来的参数',this.props);
		const {detail:{item}} =this.props
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
		return item?
			
			<View style={styles.container}>
				{navigationBar}
				<ScrollView style={styles.body}>
					{/* <Button danger><Text> Danger </Text></Button> */}
					<Text style={styles.title}>{item&&item.title}</Text>
					<View style={styles.discript}>
						<View style={styles.left}>
							{item.media_user&&<Image style={styles.avatar}
								source={{uri: item.media_user.avatar_url}}
							/>}
							<View style={styles.sourse}>
								<Text style={styles.sourse}>{item.source}</Text>
								<Text style={styles.sourse}>{item.is_original&&'原创'}</Text>
							</View>
						</View>
						
						<View>
							<View style={styles.button}>
								<Text style={{color:'#fff',textAlign:'center',}}> 关注 </Text>
							</View>
							</View>
					</View>
						<HTMLView
							value={item.content}
							onLinkPress={(url) => {
							}}
							stylesheet={{
									p: {color:'#333',fontFamily:'Serif'}
									// a: styles.description,
							}}
						/>
						{item.comments.map(item=>this.renderComment(item))}
				</ScrollView>
			</View>:<Text>暂无数据</Text>
		
	}
}

const mapStateToProps = state=>({
	detail:state.newsDetail,
})
const mapDispatchToProps = dispatch=>({
	onLoadNewsDetail:(content_id,url)=>dispatch(actions.onLoadNewsDetail(content_id,url)),
	onEditFavorite:(flag,content_id,isFavorite)=>dispatch(actions.onEditFavorite(flag,content_id,isFavorite))
})
export default connect(mapStateToProps,mapDispatchToProps)(DetailPage)
// export default DetailPage

const styles = StyleSheet.create({
	container:{
		flex:1,
		
	},
	body:{
		padding:10
	},
	title:{
		fontSize:22,
		color:'#000'
	},
	discript:{
		marginTop:10,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	avatar:{
		height:25,
		width:25,
		borderRadius:12,
		marginRight:10
	},
	left:{
		flexDirection:'row',
		justifyContent:'space-between'
	},
	sourse:{
		fontSize:12,
		
	},
	button:{
		height:25,
		width:50,
		
		backgroundColor:'#d62312'
	}
})