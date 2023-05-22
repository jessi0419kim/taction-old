import React , {useEffect, useState} from "react";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select, Modal } from 'antd';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import {OTACAddress, OTACABI , 
		OCoopDataAddress, OCoopDataABI,
		OTACLockupAddress, OTACLockupABI, 
		OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_rinkeby'
import { web3Optimism} from 'services/AlchemyService'
import walletServices from 'services/walletServices'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import {errorNotification, notEnoughTACNotification, txHashNotification} from 'components/shared-components/Notifications'

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const event = () => {
	
	const addAdmin = async () => {
			const web3 = await walletServices(walletType)
	     	const event_contract =  new web3.eth.Contract(OTACEventsABI, OTACEventsAddress);

			
				    await event_contract.methods.addAdmin(walletAddress)
						.send({ from: walletAddress,  gas:'0x1e8480'})
					  .on("transactionHash", async (Txhash) =>{
						 console.log("pending");
						 txHashNotification(Txhash)
						
					  })
					  .on("confirmation", function(receipt) {
						 console.log("confirmation");
						 console.log(receipt)
					  })
					  .on('error', function(error){
						errorNotification(error.message)
						console.log( error)
					})	
	}
	
	
	const hostingEvent = async() => {
		
		const startTime = 1663964195
		const eventName = '이벤트테스트'
		
		const web3 = await walletServices(walletType)
		const event_contract =  new web3.eth.Contract(OTACEventsABI, OTACEventsAddress);
		
		await event_contract.methods.hostEvent(startTime, eventName )
						  .send({ from: walletAddress,  })
						  .on("transactionHash", async (Txhash) => {	
								txHashNotification(Txhash)
					           console.log(Txhash)
						  })
						  .on('error', function(error){
							errorNotification(error.message)
							console.log( error)
						  })
	}
	
	
	const tacApproval = async () => {
		const web3 = await walletServices(walletType)
		const event_contract =  new web3.eth.Contract(OTACEventsABI, OTACEventsAddress);

					const otac_contract =  new web3.eth.Contract(OTACABI, OTACAddress);
				    await otac_contract.methods
					  .approve(OTACEventsAddress, "10000000000000000000000")
						.send({ from: walletAddress,  gas:'0x1e8480'})
					  .on("transactionHash", async (Txhash) =>{
						 console.log("pending");
						 txHashNotification(Txhash)
						
					  })
					  .on("confirmation", function(receipt) {
						 console.log("confirmation");
						 console.log(receipt)
					  })
					  .on('error', function(error){
						errorNotification(error.message)
						console.log( error)
		
					})
	}
	
	const getEvents = async () => {
				const web3 = await web3Optimism
				const event_contract =  new web3.eth.Contract(OTACEventsABI, OTACEventsAddress);
		
				const checkEvent = await event_contract.methods.getEvent(0)
		        console.log(checkEvent.call())
				const test = await checkEvent.call()
				console.log(test)      
	}
	
		const approveEvent = async () => {
			const web3 = await walletServices(walletType)
	     	const event_contract =  new web3.eth.Contract(OTACEventsABI, OTACEventsAddress);
			const eventId = 1
			const numMatches = 99
			
				    await event_contract.methods.approveEvent(eventId, numMatches)
						.send({ from: walletAddress,  gas:'0x1e8480'})
					  .on("transactionHash", async (Txhash) =>{
						 console.log("pending");
						 txHashNotification(Txhash)
						
					  })
					  .on("confirmation", function(receipt) {
						 console.log("confirmation");
						 console.log(receipt)
					  })
					  .on('error', function(error){
						errorNotification(error.message)
						console.log( error)
					})	
	}
		
		const addStaff = async () => {
			const web3 = await walletServices(walletType)
	     	const event_contract =  new web3.eth.Contract(OTACEventsABI, OTACEventsAddress);
			const eventId = 1
			const staffAddress = "0x8d716c5e5be5e22529c6ae48373cad5b1f1cef87"
			
				    await event_contract.methods.addStaff(eventId, staffAddress)
						.send({ from: walletAddress,  gas:'0x1e8480'})
					  .on("transactionHash", async (Txhash) =>{
						 console.log("pending");
						 txHashNotification(Txhash)
						
					  })
					  .on("confirmation", function(receipt) {
						 console.log("confirmation");
						 console.log(receipt)
					  })
					  .on('error', function(error){
						errorNotification(error.message)
						console.log( error)
					})	
	}	
		
		const getTournamentStaff = async() => {
			const web3 = await web3Optimism
	     	const event_contract =  new web3.eth.Contract(OTACEventsABI, OTACEventsAddress);
			const staffAddress = "0x8d716c5e5be5e22529c6ae48373cad5b1f1cef87"
			

			
			const checkEvent = await event_contract.methods.tournamentStaff(staffAddress)
				const test = await checkEvent.call()
				console.log(test)      
			
			
			
		}
		
	
	return(
		<>
			<PageHeaderAlt className="border-bottom" >
					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">Hosting Event</h2>
							<div className="mb-3">
								<Button type="primary"  onClick={hostingEvent} >
									Hosting
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
								<Button type="primary"  onClick={tacApproval} >
									tac approval
								</Button>
								<Button type="primary"  onClick={addAdmin} >
									add Admin
								</Button>
								<Button type="primary"  onClick={getEvents} >
									get event
								</Button>
								<Button type="primary"  onClick={approveEvent} >
									Approve Event
								</Button>
								<Button type="primary"  onClick={addStaff} >
									Add Staff
								</Button>
		
								<Button type="primary"  onClick={getTournamentStaff} >
									get staff info
								</Button>
		</>
		
		
	)
}


export default event