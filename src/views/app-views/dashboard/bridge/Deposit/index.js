import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select, Modal } from 'antd';
import DepositPanel from './DepositPanel'
import axios from 'axios'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService';
import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'configs/contractAddress/AddAndABISrc_mainnet';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';


import {SELECTED_NODE} from 'configs/NodeConfig';


const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const Deposit = () => {
	
//price
	const [etherPrice, setEtherPrice] = useState(null)
	const [tacPrice, setTacPrice] = useState(null)
	
	//ether-mainnet balance
	const [etherBalance, setEtherBalance] = useState(null)
	
	
	//ehter-optimism kovan balance
	const [aetherBalance, setAetherBalance] = useState(null)
	
	
	//TAC-mainnet balances
	const [tacLockedBalance, setTacLockedBalance] = useState(null)
	const [tacUnLockedBalance, setTacUnLockedBalance] = useState(null)
	
	//TAC-optimism-kovan balance
	const [atacLockedBalance, setAtacLockedBalance] = useState(null)
	const [atacUnLockedBalance, setAtacUnLockedBalance] = useState(null)

	//getting AETH & ATAC BAlance by Alchemy API   Arbitrum
	
	const getAETHBalance = async() => {

		const web3 = await web3Optimism
		const balance_temp_wei = await web3.eth.getBalance(walletAddress); //Will give value in.
		const balance_temp_ether = await web3.utils.fromWei(balance_temp_wei, 'ether');	
		const balance_temp_int = parseFloat(balance_temp_ether)
		setAetherBalance(balance_temp_int.toFixed(8))
	}
	
	const getATACBalance = async() => {
		
		const web3 = await web3Optimism
		const atac_contract =  new web3.eth.Contract(ATACABI, ATACAddress);
		const atacLockup_contract = new web3.eth.Contract(ATACLockupABI, ATACLockupAddress);
		
		
		//get unLocked ATAC from arbitrum
		const atacUnlocked_temp_wei = await atac_contract.methods.balanceOf(walletAddress).call()
		const atacUnlocked_temp_ether = await web3.utils.fromWei(atacUnlocked_temp_wei, 'ether');  //typeof : string
		const atacUnlocked_temp_int = parseInt(atacUnlocked_temp_ether)
		setAtacUnLockedBalance(atacUnlocked_temp_int)
		
		 //get locked ATAC from arbitrum
		const atacLocked_temp_wei = await atacLockup_contract.methods.getTACLocked(walletAddress).call()
		const atacLocked_temp_ether = await web3.utils.fromWei(atacLocked_temp_wei, 'ether');  //typeof : string
		const atacLocked_temp_int = parseInt(atacLocked_temp_ether)
		setAtacLockedBalance(atacLocked_temp_int)
	}
	
	//getting ETH & TAC BAlance by Alchemy API
	
	const getETHBalance = async() => {
		
		const web3 = await web3Mainnet
		
		const balance_temp_wei = await web3.eth.getBalance(walletAddress); //Will give value in.
		const balance_temp_ether = await web3.utils.fromWei(balance_temp_wei, 'ether');	
		const balance_temp_int = parseFloat(balance_temp_ether)
		setEtherBalance(balance_temp_int.toFixed(8))
	}
	
	
	const getTACBalance = async() => {
	
		const web3 = await web3Mainnet
		const tacLockup_contract =  new web3.eth.Contract(TACLockupABI, TACLockupAddress);
 		const tac_contract =  new web3.eth.Contract(TACABI, TACAddress);
	
		 //get unlocked tac from mainnet
		const tacUnlocked_temp_wei = await tac_contract.methods.balanceOf(walletAddress).call()
		const tacUnlocked_temp_ether = await web3.utils.fromWei(tacUnlocked_temp_wei, 'ether');  //typeof : string
		const tacUnlocked_temp_int = parseInt(tacUnlocked_temp_ether)
		setTacUnLockedBalance(tacUnlocked_temp_int)
		
		 //get locked tac from mainnet
		const tacLocked_temp_wei = await tacLockup_contract.methods.getTACLocked(walletAddress).call()
		const tacLocked_temp_ether = await web3.utils.fromWei(tacLocked_temp_wei, 'ether');  //typeof : string
		const tacLocked_temp_int = parseInt(tacLocked_temp_ether)
		setTacLockedBalance(tacLocked_temp_int)
	}
	
	
	//getting prices from Uniswap
	
	const getETHPrice = async() => {
	
		const coinInfoFromGecko = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
        const ethPrice =coinInfoFromGecko.data['ethereum']['usd']
		setEtherPrice(ethPrice)
	}
	
	const getTACPrice = async() => {

		const coinInfoFromGecko = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xdeeb6091a5adc78fa0332bee5a38a8908b6b566e&vs_currencies=usd`)
        const tacPrice =coinInfoFromGecko.data['0xdeeb6091a5adc78fa0332bee5a38a8908b6b566e']['usd']
		setTacPrice(tacPrice)
		
	}
	
	
	useEffect(()=>{
		getAETHBalance();
		getETHBalance();
		getETHPrice();
		getTACPrice();
		getTACBalance();
		getATACBalance();
	},[])
	
	return(
	<>
	 <DepositPanel  aetherBalance={aetherBalance}  atacUnLockedBalance={atacUnLockedBalance} etherBalance={etherBalance} tacUnLockedBalance={tacUnLockedBalance}/>
	</>
	)
	
}


export default Deposit