import React , {useEffect, useState} from "react";
import IntlMessage from "components/util-components/IntlMessage";
import {getMyConfirmedTraining} from 'redux/actions/Training';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Tag, Tooltip, message, Button, Modal } from 'antd';
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
	
	const [loading, setLoading] = useState(true)
	const [otacUnLockedBalance, setOtacUnLockedBalance] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const handleCancel = () => {setIsModalVisible(false);};
	
	const dispatch = useDispatch()
	const confirmedTrainings = useSelector(state => state.training.confirmedTrainings)


	
		const getOTACBalance = async() => {
		
		const web3 = await web3Optimism
		const otac_contract =  new web3.eth.Contract(ATACABI, ATACAddress);
	
		//get unLocked OTAC from op-kovan
		const otacUnlocked_temp_wei = await otac_contract.methods.balanceOf(walletAddress).call()
		const otacUnlocked_temp_ether = await web3.utils.fromWei(otacUnlocked_temp_wei, 'ether');  //typeof : string
		const otacUnlocked_temp_int = parseInt(otacUnlocked_temp_ether)
		setOtacUnLockedBalance(otacUnlocked_temp_int)
	}
	
	useEffect(()=>{
		getOTACBalance()
	},[])
	
	
	useEffect(()=>{
		dispatch(getMyConfirmedTraining(walletAddress))
	},[])
	
	
	 useEffect(()=>{
		 (confirmedTrainings !=null) && setLoading(false)
	 },[confirmedTrainings])
	

	
	 const columns = [
	  {
	title: () => (<div>{setLocale(locale, 'users.matchID')}</div>),
	dataIndex: 'id',
	key: 'id',
  },
 	{
	title:  () => (<div>{setLocale(locale, 'users.time')}</div>),
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
	title:  () => (<div>{setLocale(locale, 'users.status')}</div>),
	dataIndex: 'verified',
	key: 'verified',
	render: (item, data) => {
 		if(item==true){
		 return(
			  <Tag icon={<CheckCircleOutlined />} color="lime">
				Approved
			  </Tag>
			  )
	  }else if(data.loserTx){
		  return(
		      <Tag icon={<SyncOutlined spin />} color="geekblue">
				processing
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
];	
	
	
return(
		<>
			<Table columns={columns} dataSource={confirmedTrainings} scroll={{ x: 900, }} rowKey='id' loading={loading} />
		</>
	
	)
}






export default TrainingList



	