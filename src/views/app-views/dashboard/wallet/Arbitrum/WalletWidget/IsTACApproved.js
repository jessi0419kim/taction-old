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
import IntlMessage from "components/util-components/IntlMessage";
import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import {SELECTED_NODE} from 'configs/NodeConfig'
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();


const ApprovedNo = () => {

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isPending, setIsPending]= useState(false)
	const [isConfirmed, setIsConfirmed] = useState(false)
	const modalOff = () => setIsModalVisible(false);	

	const approveTAC = async () => {
			setIsModalVisible(true)

				try{
					const web3 = await walletServices(walletType)
					const otac_contract =  new web3.eth.Contract(ATACABI, ATACAddress);
				    await otac_contract.methods
					  .approve(ACoopDataAddress, "10000000000000000000000")
						.send({ from: walletAddress,  gas:'0x16e360'})
					  .on("transactionHash", async (Txhash) =>{
						 console.log("pending");
						 setIsPending(true)
						 txHashNotification(Txhash)
						 modalOff()
					  })
					  .on("confirmation", function(receipt) {
						setIsConfirmed(true)
						 console.log("confirmation");
						 console.log(receipt)
					  })
					  .on('error', function(error){
						errorNotification(error.message)
						console.log( error)
						modalOff()
					  })
				}catch{
					 console.log('something is wrong')
				}
					
		
		}

	return(
		<>
			{!isPending && !isConfirmed &&
			<Button className="mb-2 bt-2" type="primary" icon= {<CloseCircleOutlined />} size='small' onClick={()=>{approveTAC()}} danger block>TAC Approval</Button>
			}
		    {isPending && !isConfirmed && <Button className="mb-2 bt-2" type="primary"  size='small' loading block >Pending</Button>}
		    {isConfirmed && <Button className="mb-2 bt-2" type="primary"   icon= {<CheckCircleOutlined />} size='small'  block ghost >TAC Approved</Button>}
			<Modal title="Approving TAC" 
				   visible={isModalVisible} 
				   onCancel={modalOff}  
				   maskClosable={false} centered={true}
				   footer={[<Button key="Cancle" onClick={modalOff}> Cancel </Button>]}
			>
			  <LoadingOutlined /> 
			  <span className="ml-2"> Now Loading Wallet.</span>
			  <p>It might take a few seconds to show your wallet successfully</p>
			</Modal>
		</>
	)
}



const IsTACApproved = () => {
	    const locale = useSelector((state) => state.theme.locale)

	
	const [isApproved, setIsApproved] = useState(false)
		
	const checkIfApproved = async (address) => {
		
		const web3 = await web3Optimism
		// const alchemyHTTPS = getAlchemyHTTPS()
		//  const web3 = await createAlchemyWeb3(alchemyHTTPS);  	
		const otac_contract =  new web3.eth.Contract(ATACABI, ATACAddress);		
		const checkUser = await otac_contract.methods.allowance(walletAddress, ACoopDataAddress).call()
		
		setIsApproved(checkUser)
	}
	
    useEffect(()=>{
	  checkIfApproved();
	},[])

  return (
     <>
	  {!isApproved && <Button className="mb-2 bt-2" type="primary"   size='small' loading block> {setLocale(locale, 'isTacApproved.Loading')}</Button>}
	  {isApproved && (isApproved== 0) && <ApprovedNo />}
	  {isApproved && (isApproved > 0) && <Button className="mb-2 bt-2" type="primary"   icon= {<CheckCircleOutlined />} size='small'  block ghost > {setLocale(locale, 'isTacApproved.Confirmed')}</Button>}
     </>
  )
}




export default IsTACApproved

