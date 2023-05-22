import React , {useEffect, useState} from "react";
import { useSelector, useDispatch  } from 'react-redux'
import IntlMessage from "components/util-components/IntlMessage";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import {  Tooltip, message , Tabs } from 'antd';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { 
  CopyOutlined,
  FolderOpenOutlined,  
  EllipsisOutlined, 
  StopTwoTone, 
} from '@ant-design/icons';
import Arbitrum from "./Arbitrum"
import Mainnet from "./Mainnet"


const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const { TabPane } = Tabs;
const Transfer = () => {
	  const locale = useSelector((state) => state.theme.locale)
	
	return(
	<>
		<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab={ setLocale(locale, 'Arbitrum')} key="1">
						 	<Arbitrum />
						</TabPane>
						{/*<TabPane tab={ setLocale(locale, 'Mainnet')} key="2">
							<Mainnet />
						</TabPane>		*/}				
					</Tabs>
				</div>
					
    </>
	
	)
}


export default Transfer