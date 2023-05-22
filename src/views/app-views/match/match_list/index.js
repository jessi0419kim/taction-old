import React , {useEffect, useState} from "react";
import IntlMessage from "components/util-components/IntlMessage";
import {test, approveMatchToconfirm} from 'redux/actions/Match'
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_TOKEN, GET_NUM_MATCHES} from 'redux/constants/Auth'; 
import {getAllApprovedMatches} from 'redux/actions/Match';



import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { Card, Table, Tag, Tooltip, message, Button, Tabs } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';

import AllMatches from './AllMatches'
import MyMatches from './MyMatches'

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();


const { TabPane } = Tabs;
const MatchList = () => {
	

	const locale = useSelector((state) => state.theme.locale)
	
	return (
	<>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{setLocale(locale, 'match.history')} </h2>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab={setLocale(locale, 'match.allMatches')} key="1">
							<AllMatches />
						</TabPane>
						<TabPane tab={setLocale(locale, 'match.myMatches')} key="2">
							<MyMatches />
						</TabPane>						
					</Tabs>
				</div>
		</>
	)
}

export default MatchList
