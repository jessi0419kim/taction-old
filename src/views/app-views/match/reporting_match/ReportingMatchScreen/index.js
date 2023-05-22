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

//import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_rinkeby'
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import walletServices from 'services/walletServices'
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const { Option } = Select;
const ReportingMatchScreen = () => {
	
	const dispatch = useDispatch()
    // modal related states
	const [isModalVisible, setIsModalVisible] = useState(false);
	const modalOff = () => {setIsModalVisible(false);};	
	
	//player related states
	const [winnerInfo, setWinnerInfo] = useState('')
	const [loserInfo, setLoserInfo] = useState('')
	const updateWinnerInfo = (hit) => {
		   console.log(hit)
		  setWinnerInfo(hit)
	  }
    const updateLoserInfo = (hit) => {
		  setLoserInfo(hit)
	  }	
	const [form] = Form.useForm();
	
	const onDiscard = () => {
			 setWinnerInfo('');
			 setLoserInfo('');
			  form.setFieldsValue({
				 winnerPoints:'',
				  winnerRankingPoint: '',
				  loserRankingPoint: '',
				 loserPoints: '',
				  matchResult: '',
				});
			}
	
	const onFinish = async (values) => {
		
			const web3 = await walletServices(walletType)
			
			if(web3){
			  const OcoopData_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
		
			  const winnerAddress = values.winnerAddress
			  const winnerPoints =  values.winnerPoints
			  const winnerRankingPoint = parseInt(values.winnerRankingPoint) 
			  const loserAddress = values.loserAddress
			  const loserPoints = values.loserPoints
			  const loserRankingPoint = parseInt(values.loserRankingPoint)
			  const refereeAddress = walletAddress
			  const matchResult = values.matchResult
			  
			let suggestedGas 
			await OcoopData_contract.methods.proposeMatch(winnerAddress,winnerPoints,loserAddress,loserPoints,refereeAddress, matchResult ).estimateGas({from: walletAddress})
				.then(function(gasAmount){
				 	suggestedGas = parseInt(gasAmount*1.3)
					console.log(gasAmount)
					console.log(suggestedGas)
				})
			  
			  if (!winnerAddress || !loserAddress){
				  message.warn('Please select both Winner and Loser')
			  }else if(winnerAddress == values.loserAddress){
				  message.warn('Winner and Loser should not be a same person') 
			  }else if(winnerAddress == refereeAddress){
				   message.warn('Winner and Referee should not be a same person') 
			  }else if(loserAddress == refereeAddress){
				   message.warn('Loser and Referee should not be a same person') 
			  }else{
				        setIsModalVisible(true)
            			await OcoopData_contract.methods.proposeMatch(winnerAddress,winnerPoints,loserAddress,loserPoints,refereeAddress, matchResult )
						  .send({ from: refereeAddress, gas: suggestedGas})
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
	
	useEffect(() => {
		form.setFieldsValue({
		winnerAddress: winnerInfo.walletAddress,
		winnerRankingPoint: winnerInfo.rankingPoint,
		loserAddress: loserInfo.walletAddress,
		loserRankingPoint: winnerInfo.rankingPoint,	
		refereeAddress: walletAddress
		});
	}, [winnerInfo, loserInfo]);
	
	
	
	return (
	<>		
		 <Form layout="vertical" onFinish={onFinish} form={form}>
			<PageHeaderAlt className="border-bottom" >
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">Reporting Match</h2>
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
				 <Card title="Match Result">
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

					 <Form.Item name="matchResult" label = "Result of Match"
						rules={[
							  {
								required: true,
								message: 'Please select result of match!',
							  },
							]}						 
						 >  
						<Select
							  placeholder="Select Result of Match"
							  allowClear
							>
							  <Option value="Normal">Normal</Option>
							  <Option value="KO">KO</Option>
							  <Option value="RSC">RSC</Option>
							  <Option value="DQ">DQ</Option>	
							  <Option value="SUB">SUB</Option>
							</Select>
					</Form.Item>
				 </Card>
			 </Col>			 
       		 <Col xs={24} sm={24} md={24} lg={7}>
				 <Card title="WIN">
					<Form.Item name="winnerPoints" label="Score" colon={false}
						rules={[
							  {
								required: true,
								message: 'Please input Score of winner!',
							  },
							]}
						>
						<InputNumber min={0} max={999} />
					</Form.Item>	
				
					<div className='mb-2'> 
					  <span className="text-danger">* </span>
					  <span className="text-dark font-weight-semibold"> Select Player</span>
					</div>
					 <Form.Item name="winnerAddress"  style={{display:'none'}} >  
						<Input  disabled={true} bordered={true} />
					</Form.Item>
					 <Form.Item name="winnerRankingPoint"  style={{display:'none'}} >  
						<Input  disabled={true} bordered={true} />
					</Form.Item>
			    	
					<InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>				
						<CustomSearchBox/>
						<CustomHits updateInfo={updateWinnerInfo} clearsQuery/>
					 </InstantSearch>
					 	{winnerInfo && <UserInfoCard userInfo={winnerInfo}/>}
				 </Card>
			 </Col>
			 <Col xs={24} sm={24} md={24} lg={7}>
			  <Card title="LOSE">
				<Form.Item name="loserPoints" label="Score" colon={false}
					rules={[
							  {
								required: true,
								message: 'Please input Score of loser!',
							  },
							]}
					>  
				    <InputNumber min={0} max={999}   />
					</Form.Item>
				  	 
				    <Form.Item name="loserAddress" style={{display:'none'}}  >  
						<Input  disabled={true} bordered={true} />
					</Form.Item>
					<Form.Item name="loserRankingPoint"  style={{display:'none'}} >  
						<Input  disabled={true} bordered={true} />
					</Form.Item>			  
					<div className='mb-2'> 
					  <span className="text-danger">* </span>
					  <span className="text-dark font-weight-semibold"> Select Player</span>
					</div>
				  <InstantSearch 	indexName={ALGOLIA_INDEX_NAME}	searchClient={searchClient}  >
						<CustomSearchBox />
						<CustomHits updateInfo={updateLoserInfo}/>
				  </InstantSearch>
				  {loserInfo && <UserInfoCard userInfo={loserInfo}/>}
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

export default ReportingMatchScreen

	



	