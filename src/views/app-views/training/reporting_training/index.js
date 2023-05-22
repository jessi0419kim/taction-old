import React , {useEffect, useState} from "react";
import {onConnectByPortis} from 'services/PortisService'
import { Spin, Button, Modal, message } from 'antd';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService';
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import YouAreNotReferee from './YouAreNotReferee'
import ReportingTrainingScreen from './ReportingTrainingScreen'

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');


const ReportingTraining = () => {
	
	const [isReferee, setIsReferee] = useState(null)
	
	
		
	const checkIsUserReferee = async () => {
		const web3 = await web3Optimism
		const ACoopdata_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
		const userInfo = await ACoopdata_contract.methods.getUser(walletAddress).call()
		setIsReferee(userInfo.allowedMatches)
		}
			
	
	useEffect(()=>{
	checkIsUserReferee()
	},[]
	)
	
return(
	    <>
		{(isReferee && isReferee ==0) && <YouAreNotReferee />}
		{(isReferee && isReferee !=0) && <ReportingTrainingScreen /> }
		</>

	
	)
}






export default ReportingTraining



	