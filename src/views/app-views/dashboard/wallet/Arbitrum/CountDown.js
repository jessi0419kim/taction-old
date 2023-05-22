import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import { useSelector, useDispatch  } from 'react-redux'
import { Avatar, Button, Modal, Spin } from 'antd';
import { 
  CloseCircleTwoTone,
	CloseCircleOutlined,
	CheckCircleTwoTone,
	CheckCircleOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import { AUTH_TOKEN, } from 'redux/constants/Auth'; 
import { web3Optimism} from 'services/AlchemyService';
import walletServices from 'services/walletServices';
//import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_rinkeby'
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import IntlMessage from "components/util-components/IntlMessage";
import {errorNotification, notEnoughTACNotification, txHashNotification} from 'components/shared-components/Notifications'

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

export const CountDown = () => {
	const locale = useSelector((state) => state.theme.locale)
	const walletAddress = localStorage.getItem('auth_token');
	const walletType = localStorage.getItem('wallet_type');
	
	const [timestampOfRemovalTime, setTimestampOfRemovalTime] = useState(null)
	const [parsedLockupDuration, setParsedLockupDuration] = useState(null)
	const [currentTimestamp, setCurrentTimestamp] = useState(0)
	const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)
	const [isModalVisible, setIsModalVisible] = useState(false);
	 const modalOff = () => {setIsModalVisible(false);};	
	
	// const getLastRemovalTime = async () => {
	// 	const web3 = await web3Optimism
	// 	const otacLockup_contract = new web3.eth.Contract(ATACLockupABI, ATACLockupAddress);
	// 	const lastRemovalTime = await otacLockup_contract.methods.lastRemovalTime(walletAddress).call()
	// 	const lockupDuration = await otacLockup_contract.methods.lockupDuration().call()
		
	// 	setParsedLockupDuration(parseInt(lockupDuration))
	// 	setTimestampOfRemovalTime(parseInt(lastRemovalTime))
	// }
	
	
	// const countdownCalculation = (last_release_time, lockupDuration) => {
	
	// 	//let next_release_time = last_release_time + 604800;
	// 	let next_release_time = last_release_time + lockupDuration;
	// 	//Date.now는 밀리세컨드 단위이기 때문에, 세컨드로 단위 변환해줘야함
	// 	//let current_timestamp = parseInt(Date.now()/1000);
	// 	let current_timestamp = currentTimestamp
		
	// 	let date = new Date(current_timestamp);
	// 	// console.log(date)
	// 	// console.log(current_timestamp)

	// 	let left_timestamp = (next_release_time - current_timestamp)
		
	// 	if(left_timestamp > 0 ){
	// 		setDays(
	// 		 Math.floor( left_timestamp/(60*60*24))
	// 		)
	// 		setHours(
	// 		 Math.floor( (left_timestamp/(60*60)) % 24 )
	// 		)
	// 		setMinutes(
	// 		 Math.floor( (left_timestamp/60) % 60 )
	// 		)
	// 		setSeconds(
	// 		 Math.floor( (left_timestamp) % 60 )
	// 		)	
	// 	}
	// }
	
	const unlockTAC = async() => {
		setIsModalVisible(true)
		const web3 = await walletServices(walletType)
		const otacLockup_contract = new web3.eth.Contract(ATACLockupABI, ATACLockupAddress);
				    await otacLockup_contract.methods.claimTAC()
						.send({ from: walletAddress,  gas:'0x1e8480'})
					  .on("transactionHash", async (Txhash) =>{
						 console.log("pending");
						 txHashNotification(Txhash);
						 setIsModalVisible(false)
					  })
					  .on("confirmation", function(receipt) {
						 console.log("confirmation");
						 console.log(receipt)
						 setIsModalVisible(false)
					  })
					  .on('error', function(error){
						errorNotification(error.message)
						console.log( error)
						 setIsModalVisible(false)
					})	
		
		
		
		
	}
	
	useEffect(()=>{
		let isComponentMounted = true;
		
		const getLastRemovalTime = async () => {
			const web3 = await web3Optimism
			const otacLockup_contract = new web3.eth.Contract(ATACLockupABI, ATACLockupAddress);
			const lastRemovalTime = await otacLockup_contract.methods.lastRemovalTime(walletAddress).call()
			const lockupDuration = await otacLockup_contract.methods.lockupDuration().call()

			if (isComponentMounted) {
				setParsedLockupDuration(parseInt(lockupDuration))
			   setTimestampOfRemovalTime(parseInt(lastRemovalTime))
			}
		}
			
		getLastRemovalTime()
		
		return () => {
        isComponentMounted = false;
      };
	},[])
	
	useEffect(() => {
		let isComponentMounted = true;
		
		setInterval(() => {
		if (isComponentMounted) {
			 setCurrentTimestamp( parseInt(Date.now()/1000)	) 	
			}
		}, 1000);
		
		return () => {
        isComponentMounted = false;
      };
	  }, []);
	
	useEffect(()=>{
		let isComponentMounted = true;
		
		const countdownCalculation = (last_release_time, lockupDuration) => {
			//let next_release_time = last_release_time + 604800;
			let next_release_time = last_release_time + lockupDuration;
			//Date.now는 밀리세컨드 단위이기 때문에, 세컨드로 단위 변환해줘야함
			//let current_timestamp = parseInt(Date.now()/1000);
			let current_timestamp = currentTimestamp

			let date = new Date(current_timestamp);
			// console.log(date)
			// console.log(current_timestamp)

			let left_timestamp = (next_release_time - current_timestamp)

			if (isComponentMounted) {
				if(left_timestamp > 0 ){
					setDays(
					 Math.floor( left_timestamp/(60*60*24))
					)
					setHours(
					 Math.floor( (left_timestamp/(60*60)) % 24 )
					)
					setMinutes(
					 Math.floor( (left_timestamp/60) % 60 )
					)
					setSeconds(
					 Math.floor( (left_timestamp) % 60 )
					)	
				} //left_timestamp				
			} //isComponentMounted
		} //countdownCalculation
		
		timestampOfRemovalTime && parsedLockupDuration && countdownCalculation(timestampOfRemovalTime, parsedLockupDuration)
		
		return () => {
        isComponentMounted = false;
      };
		
	},[ currentTimestamp])
	
	
	return (
		<div className={`d-flex flex-column align-items-center justify-content-between mb-4`} style={{borderTop: "1px solid #ededed", borderBottom: "1px solid #ededed"}}>
			<div className="avatar-status d-flex align-items-center mt-2 mb-2 ml-2 mr-2">
				<div className="d-flex flex-column align-items-center ml-3 mr-3">
				  <h2 className='font-weight-bold text-primary'>{days}</h2>
				  <div className='text-muted'>{setLocale(locale, 'countdown.days')}</div>
				</div>
				<div className="d-flex flex-column align-items-center ml-3 mr-3">
				  <h2 className='font-weight-bold text-primary'>{hours}</h2>
				  <div className='text-muted'>{setLocale(locale, 'countdown.hours')}</div>
				</div>
				<div className="d-flex flex-column align-items-center ml-3 mr-3">
				  <h2 className='font-weight-bold text-primary'>{minutes}</h2>
				  <div className='text-muted'>{setLocale(locale, 'countdown.minutes')}</div>
				</div>
				<div className="d-flex flex-column align-items-center ml-3 mr-3">
				  <h2 className='font-weight-bold text-primary'>{seconds}</h2>
				  <div className='text-muted'>{setLocale(locale, 'countdown.seconds')}</div>
				</div>
			</div>
		
			{( timestampOfRemovalTime &&  ((timestampOfRemovalTime + parsedLockupDuration) <currentTimestamp))?
			   <Button  className="mb-2"  type="primary"   size='small' block onClick={()=>{unlockTAC()}}> {setLocale(locale, 'countdown.unlock')}</Button>:
			    <Button className="mb-2" type="primary"   size='small' block disabled> {setLocale(locale, 'countdown.unlock')}</Button>
			}
		  <Modal title="UnLock TAC" 
		   visible={isModalVisible} 
		   onCancel={modalOff}  
		   maskClosable={false} centered={true}
		   footer={[<Button key="Cancle" onClick={modalOff}> Cancel </Button>]}
		   >
		  <LoadingOutlined /> 
		  <span className="ml-2"> Now Loading Wallet.</span>
		  <p>It might take a few seconds to show your wallet successfully</p>
		</Modal>
	
		</div>
	)
}



export default CountDown;
