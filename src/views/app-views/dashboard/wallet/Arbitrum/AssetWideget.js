import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import axios from 'axios'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag,Spin } from 'antd';
import PropTypes from "prop-types";
import { ArrowUpOutlined, ArrowDownOutlined, CopyOutlined, FolderOpenOutlined, StopTwoTone, EllipsisOutlined,LockOutlined, UnlockOutlined,LoadingOutlined, BankOutlined, ApiOutlined  } from '@ant-design/icons';
import CryptoStatus from 'components/shared-components/CryptoStatus'
import {onConnectByPortis} from 'services/walletServices/PortisService'
import {onConnectByMetamask} from 'services/walletServices/MetamaskService'
import IntlMessage from "components/util-components/IntlMessage";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import CountDown from './CountDown'


const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const AssetWideget = (props) => {
    const locale = useSelector((state) => state.theme.locale)
	const {etherPrice, tacPrice,  oetherBalance, otacLockedBalance, otacUnLockedBalance} = props;

	
	return(
		<Card title={ setLocale(locale, 'wallet.myAssets')} 
			  extra={
				<>
					<a className="mr-2"  href="https://bridge.arbitrum.io/" target="_self"> <ApiOutlined /> {setLocale(locale, 'wallet.bridge')} </a>
				    <a href="https://app.uniswap.org/#/swap?inputCurrency=0xfa51b42d4c9ea35f1758828226aaedbec50dd54e" target="_self"> <BankOutlined />  {setLocale(locale, 'wallet.exchange')} </a>
				</>
					} 
			>
				<CryptoStatus name={setLocale(locale, 'coin.eth-arbitrum') } 
					src={'/img/crypto/arbitrum.png'}
					amount={oetherBalance } coin={'ETH'} price={etherPrice} cryptoBalanceDollar={oetherBalance*etherPrice}/>	
				<CryptoStatus name={setLocale(locale, 'coin.tac-arbitrum.free')} 
					src={'/img/crypto/tac-arbitrum-free.png'} 
					amount={otacUnLockedBalance } coin={'TAC'} price={tacPrice} cryptoBalanceDollar={otacUnLockedBalance*tacPrice}/>	
				<CryptoStatus name={setLocale(locale, 'coin.tac-arbitrum.locked')} 
					src={'/img/crypto/tac-arbitrum-lock.png'} 
					amount={otacLockedBalance } coin={'TAC'} price={tacPrice} cryptoBalanceDollar={otacLockedBalance*tacPrice}/>
				{(otacLockedBalance>0) && <CountDown /> }
		</Card>
	
	)
}






export default AssetWideget