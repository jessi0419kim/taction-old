import React , {useEffect, useState} from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Modal, Form, Input, InputNumber, message, Select, Image } from 'antd';
import { useSelector, useDispatch  } from 'react-redux'
import {  CopyOutlined,  FolderOpenOutlined,    EllipsisOutlined,   StopTwoTone, } from '@ant-design/icons';
import IntlMessage from "components/util-components/IntlMessage";

import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'configs/contractAddress/AddAndABISrc_mainnet';
import walletServices from 'services/walletServices'
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService';
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const { Option } = Select;
const cryptoList = ['TAC', 'ETH'];




const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const Mainnet = () => {
	const [selectedCrypto, setSelectedCrypto] = useState('TAC')
	 const [loading, setLoading] = useState(false);
	 const [form] = Form.useForm();
	 const locale = useSelector((state) => state.theme.locale)
	 
	const cryptoChanger = (value) => {
		setSelectedCrypto(value)
	}
	 
	 const sendEther = async (recipient, amounts_wei) => {	  
		 const web3 = await walletServices(walletType)
		 
		 if(web3){ 
			await web3.eth.sendTransaction({
			  from: walletAddress,
			  to: recipient,
			  value: amounts_wei,
			  gas: 1000000
			})
			.on("transactionHash", (Txhash)=> {
			 setLoading(false);
			 txHashNotification(Txhash)
			})
			.on("confirmation", function(receipt) {
			 console.log("confirmation");
			 console.log(receipt)
			})
			.on('error', function(error){
			setLoading(false);
			errorNotification(error.message)
			console.log( error)
			})	
		 }
		 
	 }
	 
	 const sendTAC = async(recipient, amounts_wei) => {
		 const web3 = await walletServices(walletType)
		  
		 const Tac_contract =  new web3.eth.Contract(TACABI, TACAddress);
		 
		 if(web3){ 
			 await Tac_contract.methods
				.transfer(recipient, amounts_wei)
					.send({from: walletAddress, gas: 1500000 })
				.on("transactionHash", (Txhash)=> {
				 setLoading(false);
				 txHashNotification(Txhash)
				})
				.on("confirmation", function(receipt) {
				 console.log("confirmation");
				 console.log(receipt)
				})
				.on('error', function(error){
				setLoading(false);
				errorNotification(error.message)
				console.log( error)
				})					 
		 } 
	 }
	 
	 
	 const onFinish = async (values) => {
		 setLoading(true)

		 const web3 = await web3Optimism
		 const amounts_wei = web3.utils.toWei(values.amounts, 'ether')
		 const recipient = values.recipient
		
		if(selectedCrypto == 'TAC'){
			await sendTAC(recipient, amounts_wei)
		}else if(selectedCrypto == 'ETH'){
			await sendEther(recipient, amounts_wei)
		}

	 }
	
	const selectAfter = (
		  <Select defaultValue="TAC" className="select-after" onChange={cryptoChanger}>
			<Option value="TAC">TAC</Option>
			<Option value="ETH">ETH</Option>
		  </Select>
		);
	
	return(
	<>
		<Row justify="center" gutter={16}>
		    <Col xs={24} sm={24} md={24} lg={8}>
				<Card title={setLocale(locale, 'wallet.transfer')} description='transfer' >
					<Form id="myForm" layout="vertical" onFinish={onFinish} form={form}>		
						<Form.Item name="network" label="Network" colon={false}>
								<Input disabled={true} placeholder=" Mainnet"
									prefix= {<Image width={20} src="https://s3.amazonaws.com/token-icons/eth.png" preview={false}/>}
									/>
						</Form.Item>
						 <Form.Item name="recipient" label="Recipient Address " colon={false}
										rules={[
											  {
												required: true,
												message: 'Please input the address of recipient!',
											  },
											]}
										>
										<Input />
						</Form.Item>	
						 <Form.Item name="amounts" label="Amount" colon={false}
										rules={[
											  {
												required: true,
												message: 'Please input the amounts of TAC!',
											  },
											]}
										>
									<Input type="number" addonAfter={selectAfter}/>
						</Form.Item>			
						<Button form="myForm"  key="submit" htmlType="submit" type="primary" loading={loading} block> Submit </Button>
					</Form>				
				</Card>
			</Col>	
		</Row>
	</>
	)
}

export default Mainnet