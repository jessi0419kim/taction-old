import React, {useEffect, useState, useMemo} from 'react'

import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select, Modal } from 'antd';
import {LoadingOutlined,} from '@ant-design/icons';
import { AUTH_TOKEN,} from 'redux/constants/Auth'; 
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import walletServices from 'services/walletServices'
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'


const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');


const ManageAdmin = () => {
	const [form] = Form.useForm();
	
	const [isModalVisible, setIsModalVisible] = useState(false);
	const modalOff = () => {setIsModalVisible(false);};	
	
	const onFinish = async (values)=>{
		setIsModalVisible(true)
		const adminAddress = values.adminAddress

		const web3 = await walletServices(walletType)
		const OcoopData_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
		await OcoopData_contract.methods.addAdmin(adminAddress)
						  .send({ from: walletAddress, gas: '0x16e360' })
						  .on("transactionHash", async (Txhash) => {	
							txHashNotification(Txhash)
					        console.log(Txhash)
							setIsModalVisible(false)
							modalOff()
						  })
						  .on('error', function(error){
							errorNotification(error.message)
							console.log( error)
							setIsModalVisible(false)
							modalOff()
						  })
	}
	
	
	return(
	<>
	   <Row justify="center" gutter={16}>
		    <Col xs={24} sm={24} md={24} lg={12}>
		        <Card title='Managing Admin(관리자 등록)' description='헬로?' >
					<Form layout="vertical" onFinish={onFinish} form={form}>
						<Form.Item name="adminAddress" label="Admin's address(관리자 지갑 주소)" colon={false}
							rules={[
								  {
									required: true,
									message: 'Please input the Admin`s address!',
								  },
								]}
							>
							<Input />
						</Form.Item>	
					
						<div className="mb-3">
						<Button type="primary"  htmlType="submit" >
							Report
						</Button>
					    </div>		
					</Form>
		    	</Card>
			</Col>	
	    </Row>
		<Modal title="Manage Admin" 
		   visible={isModalVisible} 
		   onCancel={modalOff}  
		   maskClosable={false} centered={true}
		   footer={[<Button key="Cancle" onClick={modalOff}> Cancel </Button>]}
		   >
		  <LoadingOutlined /> 
		  <span className="ml-2"> Now Loading Wallet.</span>
		  <p>It might take a few seconds to show your wallet successfully</p>
		</Modal>
	</>
	
	)
}


export default ManageAdmin