import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Spin, message, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, CopyOutlined, FolderOpenOutlined, StopTwoTone, EllipsisOutlined, LoadingOutlined, SlidersOutlined, LineChartOutlined } from '@ant-design/icons';
import IntlMessage from "components/util-components/IntlMessage";
import { UniswapSVG, FacebookSVG} from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import IsUserRegistered from './IsUserRegistered'
import IsTACApproved from './IsTACApproved'
import {SELECTED_NODE} from 'configs/NodeConfig'
import { db } from 'auth/FirebaseAuth';
const { Paragraph } = Typography;

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const WalletWidgetOption = () => {
       
	
	return(
  <Menu>
	<Menu.Item key="0" onClick={ () => message.warning('Under Construction')}>
      <span>
        <div className="d-flex align-items-center">
          <FolderOpenOutlined />
          <span className="ml-3 ">Open Wallet</span>
        </div>
      </span>
    </Menu.Item>	
    <Menu.Item key="1" onClick={ () => {}  }>
      <span>
        <div className="d-flex align-items-center">
			<a href='https://info.uniswap.org/#/arbitrum/tokens/0xfa51b42d4c9ea35f1758828226aaedbec50dd54e' target="_blank">
			  <SlidersOutlined />
	         <span className="ml-3 ">UniSwap </span>
			</a>	
        </div>
      </span>
    </Menu.Item>
	 <Menu.Item key="2" onClick={ () => {}  }>
      <span>
        <div className="d-flex align-items-center">
			<a href='https://app.zerion.io/invest/asset/TAC-0xdeeb6091a5adc78fa0332bee5a38a8908b6b566e' target="_blank">
			  <LineChartOutlined />
	         <span className="ml-3 ">Zerion </span>
			</a>	
        </div>
      </span>
    </Menu.Item>	
			
  </Menu>
)
} 

const CardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
    <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
      <EllipsisOutlined />
    </a>
  </Dropdown>
)

const WalletWidget = (props) => {
	 const locale = useSelector((state) => state.theme.locale)
	 
	const {etherPrice, tacPrice,  oetherBalance, otacLockedBalance, otacUnLockedBalance} = props;
	const walletAddress = localStorage.getItem('auth_token');
	const walletType = localStorage.getItem('wallet_type');
	const [OTACBalance, setOTACBalance] = useState(null);
	const [userName, setUserName] = useState(null)

	const getUserInfoFromFB = async() => {
		
		await db.collection("users").doc(walletAddress).onSnapshot((doc) => {
			setUserName(doc.data().name) 
		})
	}
	
	useEffect(()=>{	 
		getUserInfoFromFB()
	 },[])
	
	 useEffect(()=>{	 
		 setOTACBalance((otacLockedBalance + otacUnLockedBalance))
	 },[otacLockedBalance, otacUnLockedBalance])
	


	return (
		<Card title={setLocale(locale, 'wallet.ofWallet')} description='헬로?'  extra={CardDropdown(WalletWidgetOption())}>
			<div className= 'd-flex mt-0'>
				<div>
						<div className="d-flex align-items-center">	
							<span className = 'mb-0' style={{fontSize: '40px', fontWeight: '600', letterSpacing: '-1px' , color: '#15151f'}}>{String.fromCharCode(parseInt('20AE',16))}</span>
							<span className = 'mb-0' style={{fontSize: '36px', fontWeight: '600', letterSpacing: '-1px' , color: '#15151f'}}>{OTACBalance? Math.floor(OTACBalance) : 0}</span>
							<span className = 'mb-0' style={{fontSize: '36px', fontWeight: '600', letterSpacing: '-1px' , color: '#d0d0d2'}}>.</span>
							<span className = 'mb-0' style={{fontSize: '36px', fontWeight: '600', letterSpacing: '-1px' , color: '#d0d0d2'}}>
							{(OTACBalance !=null)?  ((OTACBalance-Math.floor(OTACBalance))*1000) : 0}</span>				
							
							{(OTACBalance !=null)?
							<span className = 'ml-3' style={{fontSize: '20px', fontWeight: '500', letterSpacing: '-0.4px', color: '#1cc760'}} >${OTACBalance*tacPrice}</span>
								: <LoadingOutlined className = 'ml-3' style={{ fontSize: 24, color:'#1cc760'}} spin />
							} 	
						</div>
				        <div className="avatar-status d-flex align-items-center">
							<Typography.Link  className="text-gray-light mt-0" 
								type="secondary" 
								href={`https://arbiscan.io/address/${walletAddress}`} 
								target="_blank" 
								copyable={{ text: walletAddress }}>
							 {walletAddress.substring(0, 14)+'...'+walletAddress.substring(29, 41)}
							</Typography.Link>	
						</div>
				</div>
			</div>
			<div className="mt-3">
				<IsUserRegistered />
				<IsTACApproved />	
			</div>
		</Card>
	)
}


export default WalletWidget


		