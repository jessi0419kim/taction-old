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
import IntlMessage from "components/util-components/IntlMessage";
import {SELECTED_NODE} from 'configs/NodeConfig'
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService'

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');


const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const RegisteredNo = () => {
		    const [isModalVisible, setIsModalVisible] = useState(false);
			const [isPending, setIsPending]= useState(false)
		    const [isConfirmed, setIsConfirmed] = useState(false)
			const modalOff = () => setIsModalVisible(false);	
	        
	
			const registerUser = async () => {
				    setIsModalVisible(true)
					const web3 = await walletServices(walletType)
				
					if(web3){
						const ocoopdata_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);
						await ocoopdata_contract.methods.setUser()
							 .send({  from: walletAddress, 
									 gas:'0x16e360'
								   })
						  .on("transactionHash", async (Txhash) =>{
							 console.log("pending");
							console.log(Txhash)
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
					}
				}	
			
	return(
		<>
		
			{!isPending && !isConfirmed &&
		     <Button className="mb-2 bt-2" type="primary" icon= {<CloseCircleOutlined />} size='small' onClick={()=>{registerUser()}} danger block>User Registration</Button>
			}
		    {isPending && !isConfirmed && <Button className="mb-2 bt-2" type="primary"  size='small' loading block >Pending</Button>}
		    {isConfirmed && <Button className="mb-2 bt-2" type="primary"   size='small' icon= {<CheckCircleOutlined />} ghost block> User Confirmation</Button>}
		  <Modal title="Registering User" 
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


const IsUserRegistered = () => {
    const locale = useSelector((state) => state.theme.locale)
	
	const [isRegistered, setIsRegistered] = useState(false)

	
	const checkIfRegistered= async() => {
		const web3 = await web3Optimism
		// const alchemyHTTPS = getAlchemyHTTPS()
		//  const web3 = await createAlchemyWeb3(alchemyHTTPS);  
		const ocoopdata_contract =  new web3.eth.Contract(ACoopDataABI, ACoopDataAddress);		
		const checkUser = await ocoopdata_contract.methods.getUser(walletAddress).call()
		
		console.log('checkUser', checkUser[0])
		setIsRegistered(checkUser[0])
	}
	
	
    useEffect(()=>{
	  checkIfRegistered();
	},[])


  return (
	 <>
		{!isRegistered &&
		    <Button className="mb-2 bt-2" type="primary"   size='small' loading block> {setLocale(locale, 'isUserRegistered.Loading')}</Button>}  
		{isRegistered && (isRegistered=='0x0000000000000000000000000000000000000000') &&
			<RegisteredNo />}
		{isRegistered && (isRegistered !=='0x0000000000000000000000000000000000000000') && 
			<Button className="mb-2 bt-2" type="primary"   size='small' icon= {<CheckCircleOutlined />} ghost block> {setLocale(locale, 'isUserRegistered.Confirmed')}</Button>}
	 </>
  )
}


export default IsUserRegistered
 

