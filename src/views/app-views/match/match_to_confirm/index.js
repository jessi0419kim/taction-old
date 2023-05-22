import React , {useEffect, useState} from "react";
import { Spin, Button, Modal, message } from 'antd';
import walletServices from 'services/walletServices'
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import ConfirmScreen from "./ConfirmScreen"

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const MatchToConfirm = () => {
	
	

	return(
	<>
		 <ConfirmScreen  />
	</>
	
	)
}






export default MatchToConfirm