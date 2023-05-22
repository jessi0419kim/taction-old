import React from 'react'
import { Card, Button } from 'antd';
import PropTypes from "prop-types";
import { ArrowUpOutlined, ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from 'configs/contractAddress/AddAndABISrc_mainnet';

const TactionAddress = ({ title, tacBalance, status, address, prefix, extra }) => {
	return (
		<Card title='Contract Address'>
         <Button className="mb-2 bt-2"   size='small'  block>
			<a href={`https://etherscan.io/address/${TACAddress}`} target="_blank"> TAC Contract </a>
		 </Button>
		 <Button className="mb-2 bt-2"    size='small'  block>
			<a href={`https://etherscan.io/address/${CoopDataAddress}`} target="_blank"> CoopData Contract </a>
		 </Button>
		<Button className="mb-2 bt-2"   size='small'  block>
			<a href={`https://etherscan.io/address/${TACLockupAddress}`} target="_blank"> TAC Lockup Contract </a>
		 </Button>
		 <Button className="mb-2 bt-2"   size='small' block>
			 <a href={`https://etherscan.io/address/${TACVotingAddress}`} target="_blank"> TAC Voting Contract </a>
		 </Button>
		<Button className="mb-2 bt-2"   size='small' block>
			 <a href='https://etherscan.io/address/0x1e1276a0b78934a17a15a84a6c246829eaa877f7' target="_blank"> Advisor LockUp Contract </a>
		 </Button>	
		</Card>
	)
}

TactionAddress.propTypes = {
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

export default TactionAddress