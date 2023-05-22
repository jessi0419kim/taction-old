import  React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { 
  CloseCircleTwoTone,
	CloseCircleOutlined,
	CheckCircleTwoTone,
	CheckCircleOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import { Spin, Button, Modal, message } from 'antd';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import walletServices from 'services/walletServices'
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import {SELECTED_NODE} from 'configs/NodeConfig'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService'



const RegisteredNo = () => {

			
	return(
		<>
		 <Button className="mb-2 bt-2" type="primary" icon= {<CloseCircleOutlined />} size='small' danger block>
			User Registration
		 </Button>
		</>
	)
}


const IsUserRegistered = ({walletAddress}) => {
    console.log(walletAddress)
	
	const [isRegistered, setIsRegistered] = useState(false)

	
	const checkIfRegistered= async() => {
		const web3 = await web3Optimism
		const ocoopdata_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);		
		const checkUser = await ocoopdata_contract.methods.getUser(walletAddress).call()

		setIsRegistered(checkUser[0])
	}
	
	
    useEffect(()=>{
	  checkIfRegistered();
	},[])


  return (
	 <>
		{!isRegistered &&
		    <Button className="mb-2 bt-2" type="primary"   size='small' loading block> User Confirmation</Button>}  
		{isRegistered && (isRegistered=='0x0000000000000000000000000000000000000000') &&
			<RegisteredNo />}
		{isRegistered && (isRegistered !=='0x0000000000000000000000000000000000000000') && 
			<Button className="mb-2 bt-2" type="primary"   size='small' icon= {<CheckCircleOutlined />} ghost block> User Confirmation</Button>}
	 </>
  )
}


export default IsUserRegistered
 

