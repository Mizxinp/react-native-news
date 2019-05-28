import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export const MORE_MENU = {
	Custom_Language: {name: '订阅内容', Icons: Ionicons, icon: 'md-checkbox-outline'},
	Sort_Language: {name: '内容排序', Icons: MaterialCommunityIcons, icon: 'sort'},
	Custom_Theme: {name: '自定义主题', Icons: Ionicons, icon: 'ios-color-palette'},
	Custom_Key: {name: '自定义国家', Icons: Ionicons, icon: 'md-checkbox-outline'},
	Sort_Key: {name: '标签排序', Icons: MaterialCommunityIcons, icon: 'sort'},
	Remove_Key: {name: '标签移除', Icons: Ionicons, icon: 'md-remove'},
	About_Author: {name: '关于作者', Icons: Octicons, icon: 'smiley'},
	Login: {name: '登录', Icons: Ionicons, icon: 'logo-github'},
	Register: {name: '注册', Icons: Ionicons, icon: 'logo-github'},
	My_Collection: {name: '我的收藏', Icons: MaterialIcons, icon: 'collections'},
	Feedback: {name: '反馈', Icons: MaterialIcons, icon: 'feedback'},
	Share: {name: '分享', Icons: Ionicons, icon: 'md-share'},
	CodePush: {name: 'CodePush', Icons: Ionicons, icon: 'ios-planet'},
}