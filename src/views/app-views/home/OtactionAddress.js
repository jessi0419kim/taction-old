import React from 'react'
import { Card, Button } from 'antd';
import PropTypes from "prop-types";
import { ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import {OTACAddress, OCoopDataAddress, OTACLockupAddress, OTACEventsAddress} from 'services/AddAndABISrc_op_kovan'



const OtactionAddress = ({ title, tacBalance, status, address, prefix, extra }) => {
	return (
		<Card title='Contract Address(tac-optimistic-kovan)'>
         <Button className="mb-2 bt-2"   size='small'  block>
			<a href={`https://kovan-optimistic.etherscan.io/address/${OTACAddress}#code`} target="_blank"> OTAC Contract </a>
		 </Button>
		 <Button className="mb-2 bt-2"    size='small'  block>
			<a href={`https://kovan-optimistic.etherscan.io/address/${OCoopDataAddress}#code`} target="_blank"> OCoopData Contract </a>
		 </Button>
		<Button className="mb-2 bt-2"   size='small'  block>
			<a href={`https://kovan-optimistic.etherscan.io/address/${OTACLockupAddress}#code`} target="_blank"> OTAC Lockup Contract </a>
		 </Button>
		 <Button className="mb-2 bt-2"   size='small' block>
			 <a href={`https://kovan-optimistic.etherscan.io/address/${OTACEventsAddress}#code`} target="_blank"> OTAC Events Contract </a>
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