import {
    GET_MY_PROPOSED_TRAINING,
	MY_TRAININGS_TO_CONFIRM,
	GET_MY_CONFIRMED_TRAINING,
	MY_CONFIRMED_TRAINING
} from '../constants/Training';


export function getMyProposedTraining(walletAddress) {
  return {
    type: GET_MY_PROPOSED_TRAINING,
    walletAddress
  };
}


export function myTrainingsToConfirm(payload) {	
  return {
    type: MY_TRAININGS_TO_CONFIRM,
    payload
  };
}

export function getMyConfirmedTraining(walletAddress) {
  return {
    type: GET_MY_CONFIRMED_TRAINING,
    walletAddress
  };
}

export function myConfirmedTrainings(payload) {
	  return {
    type: MY_CONFIRMED_TRAINING,
    payload
  };	
}