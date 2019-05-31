import {combineReducers} from 'redux'
import {rootCom, RootNavigator} from '../navigator/AppNavigators';

import theme from './theme/index'
import home from './home/index'
import newsDetail from './newsDetail/index'
import favorite from './favorite/index'
import user from './user/index'
import search from './search/index'

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/** * 2.创建自己的 navigation reducer， */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果`nextState`为null或未定义，只需返回原始`state`
    return nextState || state;
};

/** * 3.合并reducer *  */
const index = combineReducers({
    nav: navReducer,
    theme,
    home,
    newsDetail,
    favorite,
    user,
    search
});

export default index;