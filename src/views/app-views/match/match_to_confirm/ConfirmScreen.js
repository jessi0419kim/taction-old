import React , {useEffect, useState} from "react";
import {getProposedMatch, getAllApprovedMatches} from 'redux/actions/Match';
import IntlMessage from "components/util-components/IntlMessage";
import { useDispatch, useSelector } from 'react-redux';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import walletServices from 'services/walletServices'
import { web3Optimism} from 'services/AlchemyService'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { Card, Table, Tag, Tooltip, message, Button, Modal } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
	LoadingOutlined
} from '@ant-design/icons';

import {errorNotification, notEnoughTACNotification, txHashNotification} from 'components/shared-components/Notifications'

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');


const ConfirmScreen = () => {
	const locale = useSelector((state) => state.theme.locale)
	
	const proposedMatchToConfirm = useSelector(state => state.match.proposedMatchToConfirm)
	const dispatch = useDispatch()
	
	const [buttonIsLoading, setButtonIsLoading] = useState({})
	const [isConfirmed, setIsConfirmed] = useState({})
    const [loading, setLoading] = useState(true)
	const [otacUnLockedBalance, setOtacUnLockedBalance] = useState(null)
	
    const [isModalVisible, setIsModalVisible] = useState(false)
	const handleCancel = () => {setIsModalVisible(false);};

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
		dispatch(getProposedMatch(walletAddress))
	},[])
	
	 useEffect(()=>{
		 (proposedMatchToConfirm !=null) && setLoading(false);
		 (proposedMatchToConfirm !=null) && setFalseArrayState(proposedMatchToConfirm);
	 },[proposedMatchToConfirm])
	

	
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

        const isUserWinner = data.clientAddress.toLowerCase() == data.winner.toLowerCase() ? true : false
		const winnerVerified = data.winnerVerified
		const loserVerified = data.loserVerified
		
		const onClick = async () => {
			const web3 = await walletServices(walletType)
			const OcoopData_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
						
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
					
					let suggestedGas 
					await OcoopData_contract.methods.approveMatch(data.id).estimateGas({from: walletAddress})
					.then(function(gasAmount){
						suggestedGas = parseInt(gasAmount*1.3)
						//suggestedGas = gasAmount
						console.log(suggestedGas)
					})

								
					await OcoopData_contract.methods.approveMatch(data.id).send({ from: walletAddress, gas: suggestedGas})
				   .on("error", function(error){
					errorNotification(error.message)
					console.log( error)
					setIsModalVisible(false)
				   })
				   .on("transactionHash", async (Txhash)=> {
					txHashNotification(Txhash);
					setIsModalVisible(false);
						updateTxPending();
				   })
					.on("confirmation", function(receipt) {
					setIsModalVisible(false)
					console.log("confirmation");
					console.log(receipt);
					updateTxConfirm();
						  })
				}				
			}

        if(isUserWinner){
			if(winnerVerified){
				return( <Button type="primary" size='small' icon= {<CheckCircleOutlined />} ghost> {setLocale(locale, 'users.confirmed.button')}</Button>  )
			}else{
				return(
				 <>
					{!isConfirmed[data.id] &&  <Button className="mb-2 bt-2" type="primary" icon= {<CloseCircleOutlined />}  size='small' loading={buttonIsLoading[data.id]} onClick={()=>{onClick()}} danger> {setLocale(locale, 'users.confirm.button')}</Button>}  
					{isConfirmed[data.id]  &&  <Button type="primary" size='small' icon= {<CheckCircleOutlined />} ghost> {setLocale(locale, 'users.confirmed.button')}</Button>}
				</>
				)
			}		
		}else {
			if(loserVerified){
				return( <Button type="primary" size='small' icon= {<CheckCircleOutlined />} ghost> {setLocale(locale, 'users.confirmed.button')}</Button> )
			}else{
				return(
				 <>
					{!isConfirmed[data.id] &&  <Button className="mb-2 bt-2" type="primary" icon= {<CloseCircleOutlined />}  size='small' loading={buttonIsLoading[data.id]} onClick={()=>{onClick()}} danger> {setLocale(locale, 'users.confirm.button')}</Button>}  
					{isConfirmed[data.id]  &&  <Button type="primary" size='small' icon= {<CheckCircleOutlined />} ghost> {setLocale(locale, 'users.confirmed.button')}</Button>}
				</>
				)
			}		
		}
	}
  },
  {
	title: () => (<div>{setLocale(locale, 'users.winner')}</div>),
	dataIndex: 'winner',
	key: 'winner',
    render: (item, data) => {

		let address_short = item.substring(0,6) + '...' + item.substring(38,42)

		
		return(
		<div className="d-flex">
			<AvatarStatus src={data.winnerInfo.profileImage} name={address_short} subTitle={data.winnerInfo.name}/>
		</div>
		)
		
		
	}		 
  },
  {
	title: () => (<div>{setLocale(locale, 'users.score')}</div>),
	dataIndex: 'winnerPoints',
	key: 'winnerPoints',
  },
  {
	title: () => (<div>{setLocale(locale, 'users.status')}</div>),
	dataIndex: 'winnerVerified',
	key: 'winnerVerified',
	render: (item, data) => {

		if(item==true){
		 return(
			  <Tag icon={<CheckCircleOutlined />} color="lime">
				Approved
			  </Tag>
			  )
		}else{
		  return(
			<Tag icon={<ClockCircleOutlined />} color="#bfbfbf">
			Not Approved
		  </Tag>
		  )
		}
	

	}
  },
	  {
	title: () => (<div>{setLocale(locale, 'users.loser')}</div>),
	dataIndex: 'loser',
	key: 'loser',
    render: (item, data) => {
		let address_short = item.substring(0,6) + '...' + item.substring(38,42)
		return(
		<div className="d-flex">
			<AvatarStatus src={data.loserInfo.profileImage} name={address_short} subTitle={data.loserInfo.name}/>
		</div>
		)
	}		  
  },
  {
	title: () => (<div>{setLocale(locale, 'users.score')}</div>),
	dataIndex: 'loserPoints',
	key: 'loserPoints',
  },
  {
	title:  () => (<div>{setLocale(locale, 'users.status')}</div>),
	dataIndex: 'loserVerified',
	key: 'loserVerified',
	render: (item, data) => {
 		if(item==true){
		 return(
			  <Tag icon={<CheckCircleOutlined />} color="lime">
				Approved
			  </Tag>
			  )
	    }else{
		  return(
		  <Tag icon={<ClockCircleOutlined />} color="#bfbfbf">
			Not Approved
		  </Tag>
		  )
	  }
	}
  },	
  {
	title: () => (<div>{setLocale(locale, 'users.referee')}</div>),
	dataIndex: 'referee',
	key: 'referee',
	  render: (item, data) => {
		let address_short = item.substring(0,6) + '...' + item.substring(38,42)
		return(
		<div className="d-flex">
			<AvatarStatus src={data.refereeInfo.profileImage} name={address_short} subTitle={data.refereeInfo.name}/>
		</div>
		)
	}		 
  },	

];	
	
	
	
	return(
		<>
			<Table columns={columns} dataSource={proposedMatchToConfirm} scroll={{ x: 900, }} rowKey='id' loading={loading} />
			<Modal title="Wallet Connect" 
			   visible={isModalVisible} 
			   onCancel={handleCancel}  
				centered={true} maskClosable={false}
		       footer={[<Button key="Cancle" onClick={handleCancel}> Cancel </Button>]}
			>
              <p><LoadingOutlined /> Connect Portis to TACTION to proceed</p>
        	</Modal>
		</>

	)
}


export default ConfirmScreen