import { all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {
	GET_MY_PROPOSED_TRAINING,
	GET_MY_CONFIRMED_TRAINING
} from '../constants/Training';
import {
	myTrainingsToConfirm,
	myConfirmedTrainings,
} from "../actions/Training";
import { OCoopDataAddress, OCoopDataABI} from 'services/AddAndABISrc_arbi_mainnet'

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {SELECTED_NODE} from 'configs/NodeConfig'
import { getAlchemyHTTPS} from 'services/AlchemyService'



export function* getMyProposedTrainingsSaga() {
  yield takeEvery(GET_MY_PROPOSED_TRAINING, function* ({walletAddress}) {
	  
	  
	  	const alchemyHTTPS = getAlchemyHTTPS(SELECTED_NODE)
	    const web3 = yield call(createAlchemyWeb3, alchemyHTTPS)
	    const ocoopdata_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
	  
		try {
			const userInfoObj = yield call(ocoopdata_contract.methods.getUser, walletAddress) 
		 	const userInfo = yield call(userInfoObj.call)
			const trainingNumObj = userInfo.trainings

			
			const trainingObj = yield all(trainingNumObj.map((item) => {
				  return call(ocoopdata_contract.methods.getTraining, item)  ;
				}));
			
			const trainingList = yield all(trainingObj.map((item) => {
				  return call(item.call)  ;
				}));	
					
			   	 		
			const returnDatas = trainingList.filter(item => {
				 if((item.referee).toLowerCase() == walletAddress.toLowerCase()){
					 return false
				 }else if(item.verified){
					 return false
				 }else{
					 return item
				 }
			 })
			
			console.log(returnDatas)
			
		    yield put(myTrainingsToConfirm(returnDatas))

			
			
			
		} catch (err) {
			console.log(err)
		}
	});
}


export function* getMyConforimedTrainingsSaga() {
  yield takeEvery(GET_MY_CONFIRMED_TRAINING, function* ({walletAddress}) {

	  
	  	const alchemyHTTPS = getAlchemyHTTPS(SELECTED_NODE)
	    const web3 = yield call(createAlchemyWeb3, alchemyHTTPS)
	    const ocoopdata_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
	  
		try {
			const userInfoObj = yield call(ocoopdata_contract.methods.getUser, walletAddress) 
		 	const userInfo = yield call(userInfoObj.call)
			const trainingNumObj = userInfo.trainings

			
			const trainingObj = yield all(trainingNumObj.map((item) => {
				  return call(ocoopdata_contract.methods.getTraining, item)  ;
				}));
			
			const trainingList = yield all(trainingObj.map((item) => {
				  return call(item.call)  ;
				}));	
	
			const returnDatas = trainingList.filter(item => {
				 if((item.referee).toLowerCase() == walletAddress.toLowerCase()){
					 return false
				 }else if(!item.verified){
					 return false
				 }else{
					 return item
				 }
			 })
	
		    yield put(myConfirmedTrainings(returnDatas))

			
		} catch (err) {
			console.log(err)
		}
	});
}


export default function* rootSaga() {
  yield all([
	 fork(getMyProposedTrainingsSaga),
	  fork(getMyConforimedTrainingsSaga)
  ]);
}



