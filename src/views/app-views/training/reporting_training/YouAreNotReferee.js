import React , {useEffect, useState} from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select } from 'antd';
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import {OTACAddress, OTACABI , 
		OCoopDataAddress, OCoopDataABI,
		OTACLockupAddress, OTACLockupABI, 
		OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_rinkeby'
import walletServices from 'services/walletServices'


const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');


const YouAreNotReferee = () => {
	
	const setReferee = async() => {

		const web3 = await walletServices(walletType)
		
		const OCoopdata_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
		console.log(OCoopdata_contract.methods)
		
		await OCoopdata_contract.methods.setUserAllowedMatches(walletAddress, 99)
						  .send({ from: walletAddress, gas: "1000000"})
						  .on("transactionHash", async (Txhash) => {				
					           console.log(Txhash)
							 txHashNotification(Txhash)
						  })
						  .on('error', function(error){
							console.log( error)
							errorNotification(error.message)
						  })
	}
	
	
		const setAdmin = async() => {

		const web3 = await walletServices(walletType)
		
		const OCoopdata_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);		
		await OCoopdata_contract.methods.addAdmin(walletAddress)
						  .send({ from: walletAddress, gas: "1000000"})
						  .on("transactionHash", async (Txhash) => {				
					           console.log(Txhash)
							 txHashNotification(Txhash)
						  })
						  .on('error', function(error){
							console.log( error)
							errorNotification(error.message)
						  })
	}
	
	
	
	
	
	return(
		<>		
		<div className="mt-5">
		 <Row  justify="center" gutter={16}>
      		 <Col xs={24} sm={24} md={24} lg={16}>
				 <h1  style={{fontSize: "72px", fontWeight: "700", color: "#15151f", marginBottom: "24px",  textAlign: "center"}}>
					 You are not allowed as a referee</h1>
				 <p style={{fontSize: "20px", fontWeight: "500", color: "#737379", textAlign: "center"}}>
					 Please contact TKD-COOP to be TKD-COOP authorized official referee.
				     <br/>
					 Let's Bring Taekwondo online together
				 </p>		
			 </Col>					 
          </Row>
		</div>	
	</>
	)
}


export default YouAreNotReferee
