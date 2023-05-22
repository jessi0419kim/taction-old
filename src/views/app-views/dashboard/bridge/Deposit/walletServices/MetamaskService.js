import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import {SELECTED_NODE} from 'configs/NodeConfig'
import {errorNotification} from 'components/shared-components/Notifications'


export const onConnectByMetamask = async () => {
	const provider = await detectEthereumProvider();
	let web3

	
	if (provider) {

		web3 = new Web3(provider);	
		const chainId = await provider.request({
		method: 'eth_chainId'
	    })
	
		if(chainId == '0x1'){ 
			return web3	
		  
		} else{
		  console.log(`서버가 ${SELECTED_NODE}으로 선택되어 있지 않습니다.`)
		   errorNotification(`메타마스크에서 서버를 ${SELECTED_NODE}으로 변경해주세요.`)
		   errorNotification(`Please set the RPC-node as ${SELECTED_NODE}.`)
		}
	

	} else {

	  // if the provider is not detected, detectEthereumProvider resolves to null
	  console.error('Please install MetaMask!')
		errorNotification('Please install MetaMask!')
	}
   
  
 }