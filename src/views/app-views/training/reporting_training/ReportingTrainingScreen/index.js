import React , {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select, Modal } from 'antd';
import {LoadingOutlined,} from '@ant-design/icons';

//algolia-related
import { InstantSearch, SearchBox, Hits, ClearRefinements  } from 'react-instantsearch-dom';
import CustomSearchBox from "./CustomSearchBox"
import CustomHits from "./CustomHits"
import {searchClient, ALGOLIA_INDEX_NAME } from 'services/AlgoliaService'

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import UserInfoCard from "./UserInfoCard"
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import walletServices from 'services/walletServices'
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const { Option } = Select;



const ReportingTrainingScreen = () => {
	
	const trainingData = ['Poomsae', 'Kicks', 'Etc'];
	const dispatch = useDispatch()
    // modal related states
	const [isModalVisible, setIsModalVisible] = useState(false);
	const modalOff = () => {setIsModalVisible(false);};	
	
	//player related states
	const [traineeInfo, setTraineeInfo] = useState('')
	const updateTraineeInfo = (hit) => {
		  setTraineeInfo(hit)
	  }

	const [form] = Form.useForm();
	
	const onDiscard = () => {
			 setTraineeInfo('');

			  form.setFieldsValue({
				  matchResult: '',
				});
			}
	
	const onFinish = async (values) => {
		    console.log(values)
			const web3 = await walletServices(walletType)
			
			if(web3){
			  const OcoopData_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
		
				
			  const traineeAddress = values.traineeAddress
			  const refereeAddress = walletAddress
			  const trainingResult = values.trainingResult
			  
			  	let suggestedGas 
			await OcoopData_contract.methods.recordTraining(traineeAddress, trainingResult ).estimateGas({from: walletAddress})
				.then(function(gasAmount){
				 	suggestedGas = parseInt(gasAmount*1.3)
					console.log(gasAmount)
					console.log(suggestedGas)
				})
			  
			if (!traineeAddress){
				  message.warn('Please select User')
			  }else if(traineeAddress == refereeAddress){
				   message.warn('Trainee and Referee should not be a same person') 
			  }else{
				    setIsModalVisible(true)
					await OcoopData_contract.methods.recordTraining(traineeAddress, trainingResult )
						  .send({ from: walletAddress,
								  gas: suggestedGas
								})
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
			  }			  	
			}	  
		}
	
	
	useEffect(()=>{
		form.setFieldsValue({
		traineeAddress: traineeInfo.walletAddress,
		refereeAddress: walletAddress,
		});
	},[traineeInfo])
	
	
	return (
	<>		
		 <Form layout="vertical" onFinish={onFinish} form={form}>
			<PageHeaderAlt className="border-bottom" >
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">Reporting Training</h2>
							<div className="mb-3">
								<Button className="mr-2" htmlType="button" onClick={onDiscard}>Discard</Button>
								<Button type="primary"  htmlType="submit" >
									Report
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
			
		{/* player Information */}
		<div className="mt-3">
		 <Row  justify="center" gutter={16}>
      		 <Col xs={24} sm={24} md={24} lg={7}>
				 <Card title="Training Result">
					<Form.Item name="refereeAddress" label="Referee" colon={false}
						rules={[
							  {
								required: true,
								message: 'Please input the refereeAddress!',
							  },
							]}
						>
						<Input disabled />
					</Form.Item>	

					{/*} <Form.Item name="trainingResult" label = "Training Result"
										rules={[
							   {
								required: true,
								message: 'Please input the result of training!',
							   },
							 ]}  			 
						 >  
						<Input />
					</Form.Item> */}
					 <Form.Item name="trainingResult" label = "Training Result" >  
							  <Select
								placeholder="Select Result of Match"
							  >
								<Option value="0">Poomsae</Option>
								<Option value="1">Kicks</Option>
								<Option value="2">Etc</Option>
							  </Select>
					</Form.Item>
				 </Card>
			 </Col>			 
       		 <Col xs={24} sm={24} md={24} lg={7}>
				 <Card title="Player">
					<div className='mb-2'> 
					  <span className="text-danger">* </span>
					  <span className="text-dark font-weight-semibold"> Select Player</span>
					</div>
					 <Form.Item name="traineeAddress"  style={{display:'none'}} >  
						<Input  disabled={true} bordered={true} />
					</Form.Item>
			    	
					<InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>				
						<CustomSearchBox/>
						<CustomHits updateInfo={updateTraineeInfo} clearsQuery/>
					 </InstantSearch>
					 	{traineeInfo && <UserInfoCard userInfo={traineeInfo}/>}
				 </Card>
			 </Col>
          </Row>
		</div>
	  </Form>	
		
		<Modal title="Reporting Match" 
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

export default ReportingTrainingScreen 

	



	