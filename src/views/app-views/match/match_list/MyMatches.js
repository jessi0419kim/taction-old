import React , {useEffect, useState} from "react";
import {test, approveMatchToconfirm} from 'redux/actions/Match'
import { useDispatch, useSelector } from 'react-redux';
import IntlMessage from "components/util-components/IntlMessage";
import { AUTH_TOKEN, GET_NUM_MATCHES} from 'redux/constants/Auth'; 
import {getAllApprovedMatches} from 'redux/actions/Match';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { Card, Table, Tag, Tooltip, message, Button, Tabs } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import {getMyApprovedMatches} from 'redux/actions/Match';


const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();


const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const MyMatches = () => {
	 const locale = useSelector((state) => state.theme.locale)
	
	const dispatch = useDispatch()
	const myApprovedMatches = useSelector(state => state.match.myApprovedMatches)
	const [loading, setLoading] = useState(true)
	
	const init = async ()=>{	
		dispatch(getMyApprovedMatches(walletAddress))
	}
	
	useEffect(()=>{
	 init()
	},[])
	
	useEffect(()=>{
		 (myApprovedMatches !=null) && setLoading(false)
	 },[myApprovedMatches])
	
	
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
		<div>
			 <Table columns={columns} dataSource={myApprovedMatches} scroll={{ x: 900, }} rowKey='id' loading={loading} />
		</div>
	)
}


export default MyMatches