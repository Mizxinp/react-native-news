import Types from '../../action/types'
// import ThemeFactory, {ThemeFlags} from "../../res/styles/ThemeFactory";

const initState = {
	theme: '#2196F3',
	onShowCustomThemeView: false,
};
export default function onAction(state=initState,action){
	switch(action.type){
		case Types.THEME_CHANGE:
			return {
				...state,
				theme:action.theme
			}
		case Types.SHOW_THEME_VIEW:
			return {
					...state,
					customThemeViewVisible: action.customThemeViewVisible,
			};
		default:
			return state
	}
}