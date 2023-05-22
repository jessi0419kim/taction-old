import { all, takeEvery, put, fork, call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'
import {
	PROPOSE_MATCH,
	GET_PROPOSED_MATCH,
	APPROVE_PROPOSED_MATCH,
	PROPOSED_MATCH_TO_CONFIRM,
	GET_ALL_APPROVED_MATCHES,
	GET_MY_APPROVED_MATCHES,
	UPDATE_RANKING
} from '../constants/Match';
import {
	proposeMatch,
	getProposedMatch,
	proposedMatchToconfirm,
	approveMatchToconfirm,
	allApprovedMatches,
	myApprovedMatches,
	updateRankingPoints,
} from "../actions/Match";
//import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_rinkeby'
import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_mainnet'
import FirebaseService from 'services/FirebaseService'
import { auth, db } from 'auth/FirebaseAuth';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {SELECTED_NODE} from 'configs/NodeConfig'
import { getAlchemyHTTPS} from 'services/AlchemyService'

export function* getAllApprovedMatchesSaga() {
  yield takeEvery(GET_ALL_APPROVED_MATCHES, function* ({payload}) {
	  
	  const alchemyHTTPS = getAlchemyHTTPS(SELECTED_NODE)
	  const web3 = yield call(createAlchemyWeb3, alchemyHTTPS)
	  
	    const ocoopdata_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
		try {
			
			
			const numMatchesObj = yield call(ocoopdata_contract.methods.numMatches) 
			const numMatches = yield call(numMatchesObj.call)
	
	
			const arrayByNumMatches=[...Array(parseInt(numMatches)).keys()].reverse()
			
		
			
			const approvedMatchesObj = yield all(arrayByNumMatches.map((item) => {
				  return call(ocoopdata_contract.methods.getMatch, item)  ;
				}));
			const approvedMatches = yield all(approvedMatchesObj.map((item) => {
				  return call(item.call)  ;
				}));	

			
			
			const winnerInfos =yield all(approvedMatches.map(item => {
				 const winnerAddress = (item.winner).toLowerCase();
				 const winnerInfo =  call(FirebaseService.dbGetAccount, winnerAddress)
				 
				 return winnerInfo
			}))
			
			const loserInfos =yield all(approvedMatches.map(item => {
				 const loserAddress = (item.loser).toLowerCase();
				 const loserInfo =  call(FirebaseService.dbGetAccount, loserAddress)
				 return loserInfo
			}))
			
			const refereeInfos =yield all(approvedMatches.map(item => {
				 const refereeAddress = (item.referee).toLowerCase();
				 const refereeInfo =  call(FirebaseService.dbGetAccount, refereeAddress)
				 
				 return refereeInfo
			}))
			
			const approvedMatchesWithFb = yield all(approvedMatches.map((item, index)=>{
				return {...item, winnerInfo: winnerInfos[index], loserInfo: loserInfos[index], refereeInfo: refereeInfos[index]}
			}))
			
			//console.log('approvedMatchesWithFb',  approvedMatchesWithFb)
			

			yield put(allApprovedMatches(approvedMatchesWithFb))
			
		} catch (err) {
			console.log(err)
		}
	});
}


export function* getMyApprovedMatchesSaga() {
  yield takeEvery(GET_MY_APPROVED_MATCHES, function* ({address}) {
	  
	  	  const alchemyHTTPS = getAlchemyHTTPS(SELECTED_NODE)
	    const web3 = yield call(createAlchemyWeb3, alchemyHTTPS)
	   // const web3 = yield call(createAlchemyWeb3, "https://opt-kovan.g.alchemy.com/v2/IV8B0e9LDyhI71sw0z44gm8FU6QIFFmt")
	    const ocoopdata_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
	  
	  
		try {
			const numMatchesObj = yield call(ocoopdata_contract.methods.numMatches) 
			const numMatches = yield call(numMatchesObj.call)
			
			const arrayByNumMatches=[...Array(parseInt(numMatches)).keys()].reverse()
			
			const approvedMatchesObj = yield all(arrayByNumMatches.map((item) => {
				  return call(ocoopdata_contract.methods.getMatch, item)  ;
				}));
			const approvedMatches = yield all(approvedMatchesObj.map((item) => {
				  return call(item.call)  ;
				}));	
		
			
			
			const approvedMatchesOfMine = approvedMatches.filter(item =>
			 item.loser.toLowerCase() == address.toLowerCase() || item.winner.toLowerCase() == address.toLowerCase()
			)
			
	
			const winnerInfos =yield all(approvedMatchesOfMine.map(item => {
				 const winnerAddress = (item.winner).toLowerCase();
				 const winnerInfo =  call(FirebaseService.dbGetAccount, winnerAddress)
				 
				 return winnerInfo
			}))
			
			const loserInfos =yield all(approvedMatchesOfMine.map(item => {
				 const loserAddress = (item.loser).toLowerCase();
				 const loserInfo =  call(FirebaseService.dbGetAccount, loserAddress)
				 return loserInfo
			}))
			
			const refereeInfos =yield all(approvedMatchesOfMine.map(item => {
				 const refereeAddress = (item.referee).toLowerCase();
				 const refereeInfo =  call(FirebaseService.dbGetAccount, refereeAddress)
				 
				 return refereeInfo
			}))
			
			
			const myApprovedMatchesWithFb = yield all(approvedMatchesOfMine.map((item, index)=>{
				return {...item, winnerInfo: winnerInfos[index], loserInfo: loserInfos[index], refereeInfo: refereeInfos[index]}
			}))
			
			
			
			//yield put(myApprovedMatches(approvedMatchesOfMine))
			yield put(myApprovedMatches(myApprovedMatchesWithFb))
			
			
			
		} catch (err) {
			console.log(err)
		}
	});
}



export function* getProposedMatchSaga() {
  yield takeEvery(GET_PROPOSED_MATCH, function* ({address}) {
				
	  
	  	  const alchemyHTTPS = getAlchemyHTTPS(SELECTED_NODE)
	  const web3 = yield call(createAlchemyWeb3, alchemyHTTPS)
	  	//const web3 = yield call(createAlchemyWeb3, "https://opt-kovan.g.alchemy.com/v2/IV8B0e9LDyhI71sw0z44gm8FU6QIFFmt")
	    const ocoopdata_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
	  
	  
		try {
			 //proposedMatch Id를 불러옴
			 const MatchHistoryObj = yield call(ocoopdata_contract.methods.getUserMatches, address)	
			 const MatchHistory = yield call(MatchHistoryObj.call)
			 
			 

			 const proposedMatchIds = MatchHistory._proposedMatches
			 const proposedMatchIds_parseInt = proposedMatchIds.map(item => parseInt(item))
			 
			 	 
			 //각 Id에 맞는 proposedMatch data를 불러옴
			 const proposedMatchDatasObj =yield all(proposedMatchIds.map(proposedMatchId => {
				  return call(ocoopdata_contract.methods.getProposedMatch, proposedMatchId)  
				}));
			
			const proposedMatchDatas = yield all(proposedMatchDatasObj.map(item => {
				return call(item.call)
			}))
			
	

			
             //각 data별로 1) 내가 심판 본 경기나 2) 둘다 approve한건 제외함
			 const proposedMatchToConfirmDatas = proposedMatchDatas.filter(proposedMatchData => {
				 if((proposedMatchData.referee).toLowerCase() == address.toLowerCase()){
					 return false
				 }else if(proposedMatchData.winnerVerified && proposedMatchData.loserVerified){
					 return false
				 }else{
					 return proposedMatchData
				 }
			 })
	 
			//winner, loser, referee 정보 가져오기 from 파이어스토어
			const winnerInfos =yield all(proposedMatchToConfirmDatas.map(item => {
				 const winnerAddress = (item.winner).toLowerCase();
				 const winnerInfo =  call(FirebaseService.dbGetAccount, winnerAddress)
				 
				 return winnerInfo
			}))

			const loserInfos =yield all(proposedMatchToConfirmDatas.map(item => {
				 const loserAddress = (item.loser).toLowerCase();
				 const loserInfo =  call(FirebaseService.dbGetAccount, loserAddress)
				 return loserInfo
			}))
			
			const refereeInfos =yield all(proposedMatchToConfirmDatas.map(item => {
				 const refereeAddress = (item.referee).toLowerCase();
				 const refereeInfo =  call(FirebaseService.dbGetAccount, refereeAddress)
				 
				 return refereeInfo
			}))
			
			
			
	         const returnDatas = yield proposedMatchToConfirmDatas.map((item, index)=>{
			 return {...item, 
					 clientAddress: address, 
					 winnerInfo: winnerInfos[index],
					 loserInfo: loserInfos[index],
					 refereeInfo: refereeInfos[index],
					}
			 })
			
			
			 yield put(proposedMatchToconfirm(returnDatas));
			
		} catch (err) {
			
		}
	});
}



export default function* rootSaga() {
  yield all([
	 fork(getAllApprovedMatchesSaga),
	 fork(getMyApprovedMatchesSaga),
	 fork(getProposedMatchSaga),
  ]);
}
