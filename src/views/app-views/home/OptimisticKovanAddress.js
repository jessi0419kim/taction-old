import React from 'react'
import { Card, Button } from 'antd';
import PropTypes from "prop-types";
import { ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import {OTACAddress, OCoopDataAddress, OTACLockupAddress, OTACEventsAddress} from 'services/AddAndABISrc_op_kovan'



const OptimisticKovanAddress = ({ title, tacBalance, status, address, prefix, extra }) => {
	return (
		<Card title='Optimistic-Kovan L1'>
         <Button className="mb-2 bt-2"   size='small'  block>
			<a href={`https://kovan.etherscan.io/address/0x22f24361d548e5faafb36d1437839f080363982b`} target="_blank"> L1ChugSplashProxy</a>
		 </Button>

		</Card>
	)
}

OptimisticKovanAddress.propTypes = {
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

export default OptimisticKovanAddress