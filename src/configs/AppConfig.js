import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Taction-Arbitrum';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';

const nation = localStorage.getItem('nation')? localStorage.getItem('nation'): 'en'

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: nation,
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light'
};
