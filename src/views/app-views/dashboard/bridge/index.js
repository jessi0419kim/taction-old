import React , {useEffect, useState} from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import {  Tooltip, message , Tabs } from 'antd';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import Deposit from "./Deposit"
import Withdrawal from "./Withdrawal"


const { TabPane } = Tabs;
const Bridge = () => {
	
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
						<TabPane tab="Deposit" key="1">
						 	<Deposit />
						</TabPane>
						<TabPane tab="Withdrawal" key="2">
							<Withdrawal />
						</TabPane>						
					</Tabs>
				</div>
					
    </>
	
	)
}


export default Bridge