import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	WALLET_TYPE,
	ONCONNECT,
	SIGNIN,
	SIGNIN_WALLET,
	SIGNOUT,
	SIGNUP,
	UPDATE_USER_INFO,
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	signOutSuccess,
	signUpSuccess,
} from "../actions/Auth";
import Web3 from 'web3'
import FirebaseService from 'services/FirebaseService'






export function* signInWithWalletSaga() {
  yield takeEvery(SIGNIN_WALLET, function* ({payload}) {
 
	  let userInfoFromFB
	  const {walletAddress, walletType} = payload
	  
      try{
		 userInfoFromFB = yield call(FirebaseService.dbGetAccount, walletAddress); 
	  }catch(err){
		  yield put(showAuthMessage(err));
	  }
	  
	  if (userInfoFromFB){
				localStorage.setItem(AUTH_TOKEN, walletAddress);
				localStorage.setItem(WALLET_TYPE, walletType);
				yield put(authenticated(walletAddress));
			}else{
				yield call(FirebaseService.dbCreateAccount, walletAddress, walletType);
				localStorage.setItem(AUTH_TOKEN, walletAddress);
				localStorage.setItem(WALLET_TYPE, walletType);
				yield put(authenticated(walletAddress));
			}
 
	});
}

export function* signOut() {
  yield takeEvery(SIGNOUT, function* () {
		try {
				localStorage.removeItem(AUTH_TOKEN);
				localStorage.removeItem(WALLET_TYPE);
				yield put(signOutSuccess());
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export function* updateUserInfoSaga() {
  yield takeEvery(UPDATE_USER_INFO, function* ({payload}) {
		  const {walletAddress, name, country, division, team} = payload
	    try{
			console.log(payload)
			yield call(FirebaseService.dbUpdateUserInfo, walletAddress, name, country, division, team)
		}catch(err){
			yield put(showAuthMessage(err));
		}    
	});
}


export default function* rootSaga() {
  yield all([
	    fork(signInWithWalletSaga),
		fork(signOut),
		fork(updateUserInfoSaga),
  ]);
}
