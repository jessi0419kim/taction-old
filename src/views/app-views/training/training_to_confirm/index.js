import React , {useEffect, useState} from "react";
import {getMyProposedTraining} from 'redux/actions/Training';
import IntlMessage from "components/util-components/IntlMessage";
import { useDispatch, useSelector } from 'react-redux';
import {onConnectByPortis} from 'services/PortisService'
import { Card, Table, Tag, Tooltip, message, Button, Modal } from 'antd';
import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_mainnet'
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import walletServices from 'services/walletServices'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
	LoadingOutlined
} from '@ant-design/icons';
import { web3Optimism} from 'services/AlchemyService'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import {errorNotification, notEnoughTACNotification, txHashNotification} from 'components/shared-components/Notifications'


const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');



const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const TrainingList = () => {
	const locale = useSelector((state) => state.theme.locale)
	const [buttonIsLoading, setButtonIsLoading] = useState({})
	const [isConfirmed, setIsConfirmed] = useState({})
	
	const [loading, setLoading] = useState(true)
	const [otacUnLockedBalance, setOtacUnLockedBalance] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const handleCancel = () => {setIsModalVisible(false);};
	
	const dispatch = useDispatch()
	const proposedTrainingsToConfirm = useSelector(state => state.training.proposedTrainingsToConfirm)

	
	const getOTACBalance = async() => {
		
		const web3 = await web3Optimism
		const otac_contract =  new web3.eth.Contract(ATACABI, ATACAddress);
	
		//get unLocked OTAC from op-kovan
		const otacUnlocked_temp_wei = await otac_contract.methods.balanceOf(walletAddress).call()
		const otacUnlocked_temp_ether = await web3.utils.fromWei(otacUnlocked_temp_wei, 'ether');  //typeof : string
		const otacUnlocked_temp_int = parseInt(otacUnlocked_temp_ether)
		setOtacUnLockedBalance(otacUnlocked_temp_int)

	}
	
	const setFalseArrayState = (items) => {
		items.map(item => {
					 const state = {[item.id]: false}
		    		 setButtonIsLoading(prev => ({...prev, ...state}))
					setIsConfirmed(prev => ({...prev, ...state}))
			    })
	}
	
	useEffect(()=>{
		getOTACBalance()
	},[])
	
	
	useEffect(()=>{
		dispatch(getMyProposedTraining(walletAddress))
	},[])
	
	
	 useEffect(()=>{
		 (proposedTrainingsToConfirm !=null) && setLoading(false);
		  (proposedTrainingsToConfirm !=null) && setFalseArrayState(proposedTrainingsToConfirm);
	 },[proposedTrainingsToConfirm])
	
	// useEffect(()=>{
	// 	console.log(buttonIsLoading)
	// },[buttonIsLoading])
	
	 const columns = [
	  {
	title: () => (<div>{setLocale(locale, 'users.matchID')}</div>),
	dataIndex: 'id',
	key: 'id',
  },
 	{
	title: () => (<div>{setLocale(locale, 'users.time')}</div>),
	dataIndex: 'time',
	key: 'time',
	render: item => {
       const date = new Date(item*1000);
		return(
		<div className="d-flex flex-column  justify-content-center">
			<p className="mt-0 mb-0">	{date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()} </p>
			<p className="mt-0 mb-0">	{date.getHours()+":"+date.getMinutes()} </p>
		</div>
		)
	}		 	
 	 },	
		 {
    title: () => (<div>{setLocale(locale, 'users.confirm')}</div>),
    dataIndex: '',
    key: 'x',
    render:  (_, data) => {
    
			const onClick = async () => {
			    const web3 = await walletServices(walletType)
			    const OcoopData_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
				
				
				let suggestedGas 
				await OcoopData_contract.methods.verifyTraining(data.id).estimateGas({from: walletAddress})
				.then(function(gasAmount){
					suggestedGas = parseInt(gasAmount*1.3)
					console.log(gasAmount)
					console.log(suggestedGas)
				})
				
				const updateTxPending = () => {
					let newArr = {...buttonIsLoading}
					newArr[data.id] = true
					setButtonIsLoading(newArr)
				}

				const updateTxConfirm = () => {
					let newArr = {...isConfirmed}
					newArr[data.id] = true
					setIsConfirmed(newArr)
				}
				
			
				if(otacUnLockedBalance < 10){
					notEnoughTACNotification(otacUnLockedBalance)
				}else{
					setIsModalVisible(true)
					await OcoopData_contract.methods.verifyTraining(data.id).send({ from: walletAddress, gas: suggestedGas})
					   .on("error", function(error){
							errorNotification(error.message)
							console.log( error)
							setIsModalVisible(false)
					   })
					   .on("transactionHash", async (Txhash)=> {
							txHashNotification(Txhash)	
							setIsModalVisible(false)
							updateTxPending()
					   })
					   .on("confirmation", function(receipt) {
							setIsModalVisible(false)
							console.log("confirmation");
							console.log(receipt)
							updateTxConfirm();
						})
				} //else				
			}//if(otacUnLockedBalance < 10)
			

			
		return(
			<>
			 {(isConfirmed[data.id]==true) ?
				<Button type="primary" size='small' icon= {<CheckCircleOutlined />} ghost> {setLocale(locale, 'users.confirmed.button')}</Button>:
				<Button type="primary" size='small' onClick={onClick} loading={buttonIsLoading[data.id]}> {setLocale(locale, 'users.confirm.button')}</Button>
			 }	
			</>
		)
	}
  },
  {
	title: () => (<div>{setLocale(locale, 'users.status')}</div>),
	dataIndex: 'verified',
	key: 'verified',
	render: (item, data) => {
		
		 // if(item==true){
		 // return(
		 // <Tag icon={<CheckCircleOutlined />} color="lime">Approved </Tag>
		 // )
		 // }else if(data.loserTx){
		 //  return(
		 //      <Tag icon={<SyncOutlined spin />} color="geekblue">processing</Tag>
		 //  )
		 // }else{
		 //  return(
		 //  <Tag icon={<ClockCircleOutlined />} color="#bfbfbf">Not Approved</Tag>
		 //  )
		 // }
	 
		return(
			 <>
			{!isConfirmed[data.id] &&  !buttonIsLoading[data.id]  && <Tag icon={<ClockCircleOutlined />} color="#bfbfbf">Not Approved</Tag>}  
			{!isConfirmed[data.id] &&  buttonIsLoading[data.id]  && <Tag icon={<SyncOutlined spin />} color="geekblue">processing</Tag>}
			{isConfirmed[data.id] &&   <Tag icon={<CheckCircleOutlined />} color="lime">Approved </Tag>}
			</>
		  )	
	}
  },	
];	
	
	
return(
		<>
			<Table columns={columns} dataSource={proposedTrainingsToConfirm} scroll={{ x: 900, }} rowKey='id' loading={loading} />
		</>
	
	)
}






export default TrainingList



	