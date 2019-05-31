import {
	createStackNavigator,
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation'
import { connect } from 'react-redux'
import {createReactNavigationReduxMiddleware,  createReduxContainer} from 'react-navigation-redux-helpers';

export const rootCom = 'Init'	//根路由
import WelcomePage from '../pages/WelcomePage';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import ForeignDetailPage from '../pages/ForeignDetailPage'
import MyCollectionPage from '../pages/MyCollectionPage'
import LoginPage from '../pages/LoginPage'
import AboutMePage from '../pages/AboutMePage'
import RegisterPage from '../pages/RegisterPage'
import MyPage from '../pages/MyPage'
import SearchPage from '../pages/SearchPage'

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
	DetailPage:{
		screen:DetailPage,
		navigationOptions:{
			header:null
		}
	},
	ForeignDetailPage:{
		screen:ForeignDetailPage,
		navigationOptions:{
			header:null
		}
	},
	MyCollectionPage:{
		screen:MyCollectionPage,
		navigationOptions:{
			header:null
		}
	},
	LoginPage:{
		screen:LoginPage,
		navigationOptions:{
			header:null
		}
	},
	RegisterPage:{
		screen:RegisterPage,
		navigationOptions:{
			header:null
		}
	},
	AboutMePage:{
		screen:AboutMePage,
		navigationOptions:{
			header:null
		}
	},
	MyPage:{
		screen:MyPage,
		navigationOptions:{
			header:null
		}
	},
	SearchPage:{
		screen:SearchPage,
		navigationOptions:{
			header:null
		}
	}
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

/* 
 *配置redux
 */

 // 初始化react-native与redux的中间件
export const middleware = createReactNavigationReduxMiddleware(
	// 'root',
	state => state.nav
);

const AppWithNavigationState = createReduxContainer(RootNavigator);


const mapStateToProps = state => ({
	state: state.nav,//v2
});
export default connect(mapStateToProps)(AppWithNavigationState);
/*  */