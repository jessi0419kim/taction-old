import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Spin, message, Typography } from 'antd';
import axios from 'axios'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'configs/contractAddress/AddAndABISrc_mainnet';

import WalletWidgetMainnet from './WalletWidgetMainnet';
import AssetWidgetMainnet from './AssetWidgetMainnet';
import TactionAddress from './TactionAddress';

const Mainnet = () => {
	
	const walletAddress = localStorage.getItem('auth_token');
	const walletType = localStorage.getItem('wallet_type');
	
	//price
	const [etherPrice, setEtherPrice] = useState(null)
	const [tacPrice, setTacPrice] = useState(null)
	
	//ether-mainnet balance
	const [etherBalance, setEtherBalance] = useState(null)
	
	
	//ehter-optimism kovan balance
	const [oetherBalance, setOetherBalance] = useState(null)
	
	
	//TAC-mainnet balances
	const [tacLockedBalance, setTacLockedBalance] = useState(null)
	const [tacUnLockedBalance, setTacUnLockedBalance] = useState(null)
	
	//TAC-optimism-kovan balance
	const [otacLockedBalance, setOtacLockedBalance] = useState(null)
	const [otacUnLockedBalance, setOtacUnLockedBalance] = useState(null)

	
	//getting ETH & TAC BAlance by Alchemy API
	
	const getETHBalance = async() => {
		
		//const web3 = await web3Mainnet
		const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/FNdsGeoI4AJXrjTI4Dprvcw1T89BusTl");		
		const balance_temp_wei = await web3.eth.getBalance(walletAddress); //Will give value in.
		const balance_temp_ether = await web3.utils.fromWei(balance_temp_wei, 'ether');	
		const balance_temp_int = parseFloat(balance_temp_ether)
		setEtherBalance(balance_temp_int.toFixed(8))
	}
	
	
	const getTACBalance = async() => {
		
		//const web3 = await web3Mainnet
		const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/FNdsGeoI4AJXrjTI4Dprvcw1T89BusTl");		
		
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
		getETHBalance();
		getETHPrice();
		getTACPrice();
		getTACBalance();
	},[])
	
	
	return(
	<>
				<Row justify="center" gutter={16}>
		    <Col xs={24} sm={24} md={24} lg={8}>
		        <WalletWidgetMainnet etherPrice={etherPrice}  tacPrice={tacPrice}  etherBalance={etherBalance}  tacLockedBalance={tacLockedBalance} tacUnLockedBalance={tacUnLockedBalance}/>
			</Col>	
		</Row>
		<Row justify="center" gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>		
			  <AssetWidgetMainnet etherPrice={etherPrice}  tacPrice={tacPrice}  etherBalance={etherBalance}  tacLockedBalance={tacLockedBalance} tacUnLockedBalance={tacUnLockedBalance}/>
			</Col>	
		</Row>
		<Row justify="center" gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>		
				<TactionAddress />
			</Col>	
		</Row>	
		</>
	
	)
	
}


export default Mainnet