import  React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { 
  CloseCircleTwoTone,
	CloseCircleOutlined,
	CheckCircleTwoTone,
	CheckCircleOutlined,
	LoadingOutlined
} from '@ant-design/icons';
import { Spin, Button, Modal, message } from 'antd';
import {ATACAddress, ATACABI, ACoopDataAddress, ACoopDataABI, ATACLockupABI, ATACLockupAddress, ATACEventsAddress, ATACEventsABI} from 'configs/contractAddress/AddAndABISrc_arbitrum';
import walletServices from 'services/walletServices'
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import {SELECTED_NODE} from 'configs/NodeConfig'
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";



const ApprovedNo = () => {


	return(
		<>
		 <Button className="mb-2 bt-2" type="primary" icon= {<CloseCircleOutlined />} size='small'  danger block>
			TAC Approval
		 </Button>
		</>
	)
}



const IsTACApproved = ({walletAddress}) => {

	
	const [isApproved, setIsApproved] = useState(false)
		
	const checkIfApproved = async (address) => {
		
		const web3 = await web3Optimism	
		const otac_contract =  new web3.eth.Contract(ATACABI, ATACAddress);		
		const checkUser = await otac_contract.methods.allowance(walletAddress, ACoopDataAddress).call()
		
		setIsApproved(checkUser)
	}
	
    useEffect(()=>{
	  checkIfApproved();
	},[])

  return (
     <>
	  {!isApproved && <Button className="mb-2 bt-2" type="primary"   size='small' loading block>TAC Appoval</Button>}
	  {isApproved && (isApproved== 0) && <ApprovedNo />}
	  {isApproved && (isApproved > 0) && <Button className="mb-2 bt-2" type="primary"   icon= {<CheckCircleOutlined />} size='small'  block ghost >TAC Approved</Button>}
     </>
  )
}




export default IsTACApproved

