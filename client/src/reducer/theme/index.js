import Types from '../../action/types'
import ThemeFactory, {ThemeFlags} from "../../assets/styles/ThemeFactory";

const initState = {
	theme: ThemeFactory.createTheme(ThemeFlags.Red),
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