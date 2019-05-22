import React,{Component} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'

import moment from 'moment'
export default class HomeItem extends Component{
	render(){
		const {data} = this.props
		console.log('图片路径',data);
		let date = new Date(data.item.behot_time).getFullYear
		return(
			<TouchableOpacity
					// onPress={()=>this.onItemClick()}
			>
				<View style={styles.cell_container}>
					<View style={styles.left}>
						<Text style={styles.title}>
								{data.item.title}
						</Text>
						<View style={styles.description}>
							<Text style={{marginRight:15}}>
									{data.item.source}
							</Text>
							<Text>
								{data.item.comments_count}评论
							</Text>
							<Text>
								{/* {moment(data.item.behot_time).format('YYYY/MM/DD')} */}
							</Text>
						</View>
					</View>
					<View style={styles.row}>
						<Image style={{height: 80, width: 80}}
							source={{uri: 'http:'+data.item.image_url}}
						/>
							{/* <View style={styles.row}>
									<Text>Author:ddd</Text>
									<Image style={{height: 22, width: 22}}
													source={{uri: item.owner.avatar_url}}
									/>
							</View>
							<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
									<Text>Start:</Text>
									<Text>222</Text>
							</View> */}
							{/* {this._favoriteIcon()} */}
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	cell_container: {
			backgroundColor: 'white',
			padding: 10,
			marginLeft: 5,
			marginRight: 5,
			marginVertical: 3,
			borderColor: '#dddddd',
			borderWidth: 0.5,
			borderRadius: 2,
			shadowColor: 'gray',
			shadowOffset: {width: 0.5, height: 0.5},
			shadowOpacity: 0.4,
			shadowRadius: 1,
			elevation: 2,
			flexDirection:'row',
			justifyContent: 'space-between',
			// height:'100%'
	},
	row: {
			justifyContent: 'space-between',
			flexDirection: 'row',
			alignItems: 'center',
	},
	title: {
			fontSize: 16,
			marginBottom: 2,
			color: '#212121',
	},
	description: {
			fontSize: 14,
			marginBottom: 2,
			color: '#757575',
			position:'absolute',
			bottom:5,
			flexDirection: 'row',
			justifyContent: 'space-between'
	},
	left:{
		width:250
	}
}
);