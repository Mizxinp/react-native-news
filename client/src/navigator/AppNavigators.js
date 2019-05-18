import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation'

// import {createReactNavigationReduxMiddleware,  createReduxContainer} from 'react-navigation-redux-helpers';

import WelcomePage from '../pages/WelcomePage';
import MainPage from '../pages/MainPage';

export const rootCom = 'Init'

const InitNavigator = createStackNavigator({
	WelcomePage: {
		screen: WelcomePage,
		navigationOptions: {
			header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
		}
	}
});

const MainNavigator = createStackNavigator({
	MainPage:{
		screen:MainPage,
		navigationOptions:{
			header:null
		}
	},
},/* {
	defaultNavigationOptions: {
		header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
	}
} */)

const AppNavigator = createSwitchNavigator({
	Init:InitNavigator,
	Main:MainNavigator,
},{
	navigationOptions:{
		header:null
	}
})

export const RootNavigator = createAppContainer(AppNavigator,{
	navigationOptions:{
		header:null
	}
})

export default RootNavigator