import React, {useState, useEffect} from 'react'
import { Spin, Button, Modal, message } from 'antd';
import OtactionAddress from './OtactionAddress'
import OptimisticKovanAddress from './OptimisticKovanAddress'
import {OTACAddress, OTACABI , 
		OCoopDataAddress, OCoopDataABI,
		OTACLockupAddress, OTACLockupABI, 
		OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_op_kovan'
import {TACAddress, TACABI} from 'services/AddAndABISrc_rinkeby'
import {L1ChugSplashProxyAddress, L1ChugSplashProxyABI } from 'services/L1ChugSplashProxy'
import {OVML1StandardBridgeAddress, OVML1StandardBridgeABI } from 'services/OVML1StandardBridge'
import {onConnectByPortis} from 'services/walletServices/PortisService'
import {onConnectByMetamask} from 'services/walletServices/MetamaskService'
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import walletServices from 'services/walletServices'
import axios from 'axios'
import { db } from 'auth/FirebaseAuth';
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'

import FirebaseService from 'services/FirebaseService'



const Home = () => {
	
	const walletAddress = localStorage.getItem('auth_token');
	const walletType = localStorage.getItem('wallet_type');
	const [balance, setBalance] = useState(null)
	
	const [name, setName] = useState(null)
	

	
	
	const depositToKovanOptimism = async() => {
		const address = walletAddress//"0x0C00D314465231bcCA8c980091E75faBd98AF84A"
		const amount = "1"
		const gas = '0x493E0'
		const web3 = await onConnectByPortis()
		const OVML1StandardBridge_contract =  new web3.eth.Contract(OVML1StandardBridgeABI, OVML1StandardBridgeAddress);
		
		console.log(OVML1StandardBridge_contract.methods.depositETH)
		await OVML1StandardBridge_contract.methods.depositETH(amount, gas)
						  .send({ from: address})
						  .on("transactionHash", async (Txhash) => {				
					           console.log(Txhash)
						  })
						  .on('error', function(error){
							console.log( error)
						  })
	}
	


	
	const claimTACfromRinkeby = async() => {
		const provider = await detectEthereumProvider();
		let web3

		if (provider) {

			web3 = new Web3(provider);

			const accounts = await provider.request({ method: 'eth_requestAccounts' });
			const account = accounts[0];
			console.log(account)

		} else {

		  // if the provider is not detected, detectEthereumProvider resolves to null
		  console.error('Please install MetaMask!')
			errorNotification('Please install MetaMask!')
		}

			const amount = web3.utils.toWei('1000', 'ether');
			const tac_contract =  new web3.eth.Contract(TACABI, TACAddress);
	
		    await tac_contract.methods.claim(amount, walletAddress)
		    .send({type: "0x2", from: walletAddress, gas: '0x186a0'})
		    .on("transactionHash", async (Txhash) => {	
		    txHashNotification(Txhash)
		    console.log(Txhash)
		    })
		    .on('error', function(error){
		    errorNotification(error.message)
		    console.log( error)
		    })
		
	}
	
	 
	 
	return (
		<>
		<h1>TACTION for Arbitrum is still Under Construction</h1>
		<h3>To Claim TAC for rinkeby, Please press the button below.</h3>
		
				<Button className="mb-2 bt-2" type="primary" size='small' onClick={()=>claimTACfromRinkeby()}>
			ClaimTAC-rinkeby
		 </Button>
		</>
	)
	
}

export default Home
