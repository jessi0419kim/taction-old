import React, {useEffect, useState, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import {updateUserInfo} from "redux/actions/Auth";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select, Tabs} from 'antd';
import ManageAdmin from "./ManageAdmin"
import ManageReferee from "./ManageReferee"


const { TabPane } = Tabs;
const Admin = () => {
	
	return(
	   <>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">Administration </h2>
						</Flex>
					</div>
				</PageHeaderAlt>
		<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="Managing Referee" key="1">
							<ManageReferee />
						</TabPane>						
						<TabPane tab="Managing Admin" key="2">
							<ManageAdmin />
						</TabPane>
					
					</Tabs>
				</div>
		</>
	)
}



export default Admin