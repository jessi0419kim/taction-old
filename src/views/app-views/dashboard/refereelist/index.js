import React , {useEffect, useState} from "react";
import { useSelector } from 'react-redux'
import IntlMessage from "components/util-components/IntlMessage";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Typography } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import FirebaseService from 'services/FirebaseService'
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';

import { db } from 'auth/FirebaseAuth';
import {SELECTED_NODE} from 'configs/NodeConfig'
import { getAlchemyHTTPS} from 'services/AlchemyService'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');


const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const Refereelist = () => {
	
    const locale = useSelector((state) => state.theme.locale)	
	const [loading, setLoading] = useState(true)
	const [refereeList, setRefereeList] = useState(null)
	
	const columns = [
	  {
		title: () => (<div>{setLocale(locale, 'users.name')}</div>),
		dataIndex: 'name',
		key: 'name',
		render: (_, record) => (
			<div className="d-flex">
				<AvatarStatus src={record.profileImage} name={record.name}  />
			</div>
		),
	  },
	  {
		title:  () => (<div>{setLocale(locale, 'users.address')}</div>),
		dataIndex: 'walletAddress',
		key: 'walletAddress',
		render: (item) => (
			<Typography.Text ellipsis style={{width: 200}} >
				<a href={`https://arbiscan.io/address/${item}`} target="_blank">
				{item}
				</a>
			</Typography.Text> 
		)
	  },
	{
		title:  () => (<div>{setLocale(locale, 'users.allowedMatches')}</div>),
		dataIndex: 'allowedMatches',
		key: 'allowedMatches',
		render: (item) => (
			<Typography.Text ellipsis style={{width: 200}} >
				{item}
			</Typography.Text> 
		)
	  },	

	];
	
	const getAllRefereeList = async() =>{
		const alchemyHTTPS = getAlchemyHTTPS(SELECTED_NODE)
		const web3 = await createAlchemyWeb3(alchemyHTTPS);  	
		const OcoopData_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
		const numUsers = await OcoopData_contract.methods.numUsers().call();
		  //numUsers는 string 이기 때문에, parseInt로 숫자형으로 변환시켜야함
		console.log(numUsers)
		const arrayByNumUser =	[...Array(parseInt(numUsers)).keys()]
		
		const allUsersAddress = await Promise.all(
									arrayByNumUser.map(id => {
									  return OcoopData_contract.methods.allUsersById(id).call();
									})
								  );
	    //모든 유저정보 불러오기
		const getAllUsers = await Promise.all(
									allUsersAddress.map(userAddress =>{
										return OcoopData_contract.methods.getUser(userAddress).call()
									})
		)

		// allowedMatch 유효한 유저만 필터링
		 const allRefereesArrayFromBlockchain = getAllUsers.filter(item => item.allowedMatches >0)

		 
		 const allRefereeInfoFromFirebase = await Promise.all(
		 									allRefereesArrayFromBlockchain.map(item => {
												 const address = (item[0]).toLowerCase();
												return FirebaseService.dbGetAccount(address)	
											})
		 
		 )
			   
		 const allRefereesArray = allRefereeInfoFromFirebase.map((item, index) => {
			 return {...item, allowedMatches: allRefereesArrayFromBlockchain[index].allowedMatches}
		 })
		 
		 console.log(allRefereesArray)
		setRefereeList(allRefereesArray)
		setLoading(false)
		 
	}
	
	
	useEffect(()=>{
		getAllRefereeList()
		
	},[])
	
	return(
	<>
		<div>
			 <Table columns={columns} dataSource={refereeList} scroll={{ x: 900, }} rowKey='walletAddress' loading={loading} />
		</div>
    </>
	
	)
}


export default Refereelist