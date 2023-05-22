import {
   MY_TRAININGS_TO_CONFIRM,
	MY_CONFIRMED_TRAINING
} from '../constants/Training';

const initState = {
	proposedTrainingsToConfirm: null,
	confirmedTrainings: null,
}

const training = (state = initState, action) => {
	switch (action.type) {
		case MY_TRAININGS_TO_CONFIRM:
			return {
				...state,
				proposedTrainingsToConfirm: action.payload,
			}	
		case MY_CONFIRMED_TRAINING:
			return{
				...state,
				confirmedTrainings: action.payload,
			}
		default:
			return state;
	}
}

export default training