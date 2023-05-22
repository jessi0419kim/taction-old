import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Spin, message, Typography } from 'antd';
import axios from 'axios'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
// import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'services/AddAndABISrc_mainnet';
//import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_mainnet';
import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'configs/contractAddress/AddAndABISrc_mainnet';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import WalletWidget from './WalletWidget';
import AssetWideget from './AssetWideget';
import PriceChart from './PriceChart'
import OtactionAddress from './OtactionAddress';
import {SELECTED_NODE} from 'configs/NodeConfig';
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService';


const Arbitrum = () => {
	
	const walletAddress = localStorage.getItem('auth_token');
	const walletType = localStorage.getItem('wallet_type');
	
	//price
	const [etherPrice, setEtherPrice] = useState(null)
	const [tacPrice, setTacPrice] = useState(null)
	const [atacPrice, setAtacPrice] = useState(null)
	const [atacPriceForETH, setATacPriceForETH] = useState(null)
	
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

	//getting OETH & OTAC BAlance by Alchemy API   optimism KOVAN
	
	const getOETHBalance = async() => {

		const web3 = await web3Optimism
		const balance_temp_wei = await web3.eth.getBalance(walletAddress); //Will give value in.
		const balance_temp_ether = await web3.utils.fromWei(balance_temp_wei, 'ether');	
		const balance_temp_int = parseFloat(balance_temp_ether)
		setOetherBalance(balance_temp_int.toFixed(8))
	}
	
	const getOTACBalance = async() => {
		
		const web3 = await web3Optimism
		const otac_contract =  new web3.eth.Contract(ATACABI, ATACAddress);
		const otacLockup_contract = new web3.eth.Contract(ATACLockupABI, ATACLockupAddress);
		
		
		//get unLocked OTAC from arbitrum
		const otacUnlocked_temp_wei = await otac_contract.methods.balanceOf(walletAddress).call()
		const otacUnlocked_temp_ether = await web3.utils.fromWei(otacUnlocked_temp_wei, 'ether');  //typeof : string
		const otacUnlocked_temp_int = parseInt(otacUnlocked_temp_ether)
		setOtacUnLockedBalance(otacUnlocked_temp_int)
		
		 //get locked OTAC from arbitrum
		const otacLocked_temp_wei = await otacLockup_contract.methods.getTACLocked(walletAddress).call()
		const otacLocked_temp_ether = await web3.utils.fromWei(otacLocked_temp_wei, 'ether');  //typeof : string
		const otacLocked_temp_int = parseInt(otacLocked_temp_ether)
		setOtacLockedBalance(otacLocked_temp_int)
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

	const getATACPriceForETH = async() => {
		const APIURL = 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal'

		//https://thegraph.com/hosted-service/subgraph/ianlapham/arbitrum-minimal
		
		const tokensQuery = `
		  query {
				  token(id:"0xfa51b42d4c9ea35f1758828226aaedbec50dd54e") {
					derivedETH
				  }
				}
			`
		
		const client = new ApolloClient({
		  uri: APIURL,
		  cache: new InMemoryCache(),
		})

		client
		  .query({
			query: gql(tokensQuery),
		  })
		  .then((data) => setATacPriceForETH(data.data.token.derivedETH))
		  .catch((err) => {
			console.log('Error fetching data: ', err)
		  })
	}
	
	
	useEffect(()=>{
		getOETHBalance();
		//getETHBalance();
		getETHPrice();
		getATACPriceForETH();
		getTACPrice();
		//getTACBalance();
		getOTACBalance();
	},[])
	
	useEffect(()=>{
		const temp = (atacPriceForETH*etherPrice).toFixed(2);
		setAtacPrice(temp)
	},[atacPriceForETH, etherPrice])
	
	return(
	<>
		<Row justify="center" gutter={16}>
		    <Col xs={24} sm={24} md={24} lg={8}>
		 <WalletWidget etherPrice={etherPrice}  tacPrice={atacPrice}  oetherBalance={oetherBalance}  otacLockedBalance={otacLockedBalance} otacUnLockedBalance=		{otacUnLockedBalance}/>
			</Col>	
		</Row>
		<Row justify="center" gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>		
				<PriceChart atacPrice={atacPrice}/>
			</Col>	
		</Row>	
		<Row justify="center" gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>			
					<AssetWideget etherPrice={etherPrice}  tacPrice={atacPrice}  oetherBalance={oetherBalance}  otacLockedBalance={otacLockedBalance} otacUnLockedBalance={otacUnLockedBalance}/>
			</Col>	
		</Row>	
		<Row justify="center" gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>		
				<OtactionAddress />
			</Col>	
		</Row>	
	</>
	
	)
	
}


export default Arbitrum