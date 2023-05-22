import React from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Card, Button } from 'antd';
import PropTypes from "prop-types";
import IntlMessage from "components/util-components/IntlMessage";
import { ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI, ATACTreasuryAddress} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import {SELECTED_NODE} from 'configs/NodeConfig'

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();


const OtactionAddress = ({ title, tacBalance, status, address, prefix, extra }) => {
	 const locale = useSelector((state) => state.theme.locale)
	
	return (
		<Card title={ setLocale(locale, 'contract.address')} >
         <Button className="mb-2 bt-2"   size='small'  block>
			<a href={`https://arbiscan.io/address/${ATACAddress}`} target="_blank" rel="noreferrer"> TAC Contract </a>
		 </Button>
		 <Button className="mb-2 bt-2"    size='small'  block>
			<a href={`https://arbiscan.io/address/${ACoopDataAddress}`} target="_blank" rel="noreferrer"> CoopData Contract </a>
		 </Button>
		<Button className="mb-2 bt-2"   size='small'  block>
			<a href={`https://arbiscan.io/address/${ATACLockupAddress}`} target="_blank" rel="noreferrer"> TAC Lockup Contract </a>
		 </Button>
		 <Button className="mb-2 bt-2"   size='small' block>
			 <a href={`https://arbiscan.io/address/${ATACEventsAddress}`} target="_blank" rel="noreferrer"> TAC Events Contract </a>
		 </Button>
		<Button className="mb-2 bt-2"   size='small' block>
			 <a href={`https://arbiscan.io/address/${ATACTreasuryAddress}`} target="_blank"> TAC Treasury Contract </a>
		 </Button>
		</Card>
	)
	
}

OtactionAddress.propTypes = {
  	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	tacBalance: PropTypes.number,
	address: PropTypes.string,
	status: PropTypes.string,
	prefix: PropTypes.element,
	extra: PropTypes.object
};

export default OtactionAddress