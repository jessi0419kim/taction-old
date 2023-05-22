
import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import IntlMessage from "components/util-components/IntlMessage";
import {  Avatar, Card, Row, Col, Form, Table, Typography  } from "antd";
import { connectHits } from 'react-instantsearch-dom';
import { ClearRefinements  } from 'react-instantsearch-dom';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import {SELECTED_NODE} from 'configs/NodeConfig'

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

 


 const Hits = (props) => {
    const locale = useSelector((state) => state.theme.locale)
	const {hits,  refine, item } = props
 	const [loading, setLoading] = useState(true)
	
	//{setLocale(locale, 'users.name')}
	
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
		title: 'Points',
		dataIndex: 'rankingPoint',
		key: 'rankingPoint',
		 responsive: ['md'],
	  },
	  {
		title: () => (<div>{setLocale(locale, 'users.address')}</div>),
		dataIndex: 'walletAddress',
		key: 'walletAddress',
		render: (item) => (
			<>
				<Typography.Link   ellipsis style={{width: 200}} href={`https://arbiscan.io/address/${item}`} target="_blank" copyable>
					{item}
				</Typography.Link>
			</>
		)
	  },
	 	  {
		title: () => (<div>{setLocale(locale, 'users.country')}</div>),
		dataIndex: 'country',
		key: 'country',
		responsive: ['md'],	  
	  },
	 	 	  {
		title: () => (<div>{setLocale(locale, 'users.division')}</div>),
		dataIndex: 'division',
		key: 'division',
				  responsive: ['md'],	  
	  },
		  {
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
			  responsive: ['md'],	  
	  },
	  {
		title: () => (<div>{setLocale(locale, 'users.team')}</div>),
		dataIndex: 'team',
		key: 'team',
		  responsive: ['md'],	  
	  },
	];
	
	useEffect(()=>{
		 (hits.length != 0) && setLoading(false);
	 },[hits])
	 
	 
	
	return (
		<>
			<Card bodyStyle={{'padding': '0px'}}>
				<Table columns={columns} 
					dataSource={hits} 
					loading={loading} 
					rowKey='walletAddress'
					pagination={{ position: ['none', 'none'] }}
					/>
			</Card>
		</>
	)
}

const CustomHits = connectHits(Hits)

export default CustomHits