import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag,Spin } from 'antd';
import axios from 'axios'
import PropTypes from "prop-types";
import { ArrowUpOutlined, ArrowDownOutlined, CopyOutlined, FolderOpenOutlined, StopTwoTone, EllipsisOutlined,LockOutlined, UnlockOutlined,LoadingOutlined, BankOutlined  } from '@ant-design/icons';
import CryptoStatus from 'components/shared-components/CryptoStatus'
import {onConnectByPortis} from 'services/walletServices/PortisService'
import {onConnectByMetamask} from 'services/walletServices/MetamaskService'
import IntlMessage from "components/util-components/IntlMessage";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";



const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const AssetWidgetMainnet = (props) => {
	const locale = useSelector((state) => state.theme.locale)
	const {etherPrice, tacPrice,  etherBalance, tacLockedBalance, tacUnLockedBalance} = props;
	
	
	return(
		<Card title={ setLocale(locale, 'wallet.myAssets')} 
			  extra={<a href="https://app.uniswap.org/#/swap?inputCurrency=0xdeeb6091a5adc78fa0332bee5a38a8908b6b566e&use=V2" target="_self">
					<BankOutlined /> {setLocale(locale, 'wallet.exchange')} 
				</a>} >

			    {/*Mainnet */}
				<CryptoStatus name={setLocale(locale, 'coin.eth-mainnet')} 
					src={'https://s3.amazonaws.com/token-icons/eth.png'} 
					amount={etherBalance } coin={'ETH'} price={etherPrice} cryptoBalanceDollar={etherBalance*etherPrice}/>		

				<CryptoStatus name={setLocale(locale, 'coin.tac-mainnet.free')} 
					src={'/img/crypto/tac-mainnet-free.png'} 
					amount={tacUnLockedBalance } coin={'TAC'} price={tacPrice} cryptoBalanceDollar={tacUnLockedBalance*tacPrice}/>	
			<CryptoStatus name={setLocale(locale, 'coin.tac-mainnet.locked')} 
					src={'/img/crypto/tac-mainnet-lock.png'} 
					amount={tacLockedBalance } coin={'TAC'} price={tacPrice} cryptoBalanceDollar={tacLockedBalance*tacPrice}/>	
		</Card>
	
	)
}



export default AssetWidgetMainnet