import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select, Modal } from 'antd';

import {L1GatewayRouterAddress, L1GatewayRouterABI, L1GatewayRouterRealAddress, L1GatewayRouterRealABI} from 'configs/contractAddress/L1GatewayRouter'
import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'configs/contractAddress/AddAndABISrc_mainnet';
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import walletServices from './walletServices'
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService';

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');



const DepositPanel = ({aetherBalance, atacUnLockedBalance, etherBalance, tacUnLockedBalance}) => {
	
	
	const [selectedCoin, setSelectedCoin] = useState('TAC')
	const [isModalVisible, setIsModalVisible] = useState(false);
	const modalOff = () => {setIsModalVisible(false);};	
	const modalOn = () => {setIsModalVisible(true);};
	
	
	
	
	const sendTx = async(amountWei, _maxGas, _gasPriceBid, _data)=> {
		
		
		try{
			const web3 = await walletServices(walletType)
			
			// const L1GatewayRouterReal = new web3.eth.Contract(L1GatewayRouterABI, L1GatewayRouterRealAddress);
			// const test = await L1GatewayRouterReal.methods
			// console.log(test)
			
			const L1GatewayRouter =  new web3.eth.Contract(L1GatewayRouterABI, L1GatewayRouterRealAddress);
			await L1GatewayRouter.methods.outboundTransfer(TACAddress, walletAddress, amountWei, _maxGas, _gasPriceBid, _data)
				 .send({ from: walletAddress, type: "0x2", gas: "250000" })
				 .on("transactionHash", async (Txhash) => {	
				 txHashNotification(Txhash)
				 console.log(Txhash)
				 setIsModalVisible(false)
				 })
				 .on('error', function(error){
				 errorNotification(error.message)
				 console.log( error)
				 setIsModalVisible(false)
				 })
		}catch{
			console.log('web3 is not injected correctly')
		}
		
		
	}
	
	
	const onDeposit = async(values) =>{
		const amount = String(values.amount)
		
		const amountWei = web3Mainnet.utils.toWei(amount, 'ether')
		const _maxGas = '444930'
		const _gasPriceBid = '1879139728'
		const _data = '0x0000000000000000000000000000000000000000000000000000014c7af105dc00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000'

		sendTx(amountWei, _maxGas, _gasPriceBid, _data)
	}
	

	
	return(
	<>
	<Form layout="vertical" onFinish={onDeposit} >
		<Row justify="center" gutter={16}>
		    <Col xs={24} sm={24} md={24} lg={8}>
					<Card title='Deposit Bridge' description='Deposit Bridge'>
						<Card title='Layer 1' extra={<Button onClick={()=>{modalOn()}}>{selectedCoin}</Button>}>
							<span>My Balance : </span>
							{(selectedCoin=='TAC')?
								<span>{tacUnLockedBalance} </span>:
								<span>{etherBalance} </span>
								}
							<span>{selectedCoin}</span>
								<Form.Item className="mt-3"  name="amount"  colon={false}
												rules={[
										  {
											required: true,
											message: 'Please input amount!',
										  },
										]}
									>
								  <InputNumber placeholder="Enter amount here" style={{width: '100%',}}/>
								</Form.Item>	
							</Card>
							<Card title='Layer 2' description='Layer2'>
								<span>My Balance : </span>
								{(selectedCoin=='TAC')?
								<span>{atacUnLockedBalance} </span>:
								<span>{aetherBalance} </span>
								}
								<span>{selectedCoin}</span>
							</Card>
					<Button type="primary"  htmlType="submit" block>Deposit</Button>
				</Card>	
			</Col>	
		</Row>
	  </Form>	
		<Modal title="Choose Token" 
		   visible={isModalVisible} 
		   onCancel={modalOff}  
		   maskClosable={false} centered={true}
		   footer={[<Button key="Cancle" onClick={modalOff}> Cancel </Button>]}
		   >
			<Button className='mt-3' block 
				onClick={()=>{
					setSelectedCoin('ETH');
					modalOff()
				}}>Ethereum</Button>
			<Button className='mt-3' block 
				onClick={()=>{
					setSelectedCoin('TAC');
					modalOff()
				}}>Taekwondo Access Credit</Button>
		</Modal>
   </>
	)
	
}


export default DepositPanel