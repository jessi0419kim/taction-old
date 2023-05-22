import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Match from './Match';
import Training from './Training'

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
	match: Match,
	training: Training,
});

export default reducers;