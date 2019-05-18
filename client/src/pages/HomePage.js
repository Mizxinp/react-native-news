import React,{Component} from 'react'
import { Text,View } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'

class HomePage extends Component{
	render(){
		return(
			<View>
				<AntDesign 
					name='user'
					size={26}
					style={{color:'red'}}
				/>
			<Text>首页</Text>
			</View>
		)
	}
}

export default HomePage