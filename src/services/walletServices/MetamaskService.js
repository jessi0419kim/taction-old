import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'
import {SELECTED_NODE} from 'configs/NodeConfig'
import {errorNotification} from 'components/shared-components/Notifications'

const walletAddress = localStorage.getItem('auth_token');
const walletType = localStorage.getItem('wallet_type');

const  checkChainId = () => {
	
	 let chainId
		switch (SELECTED_NODE) {
						case "kovan-optimistic":
							chainId = '0x45';
							break;
						case 'optimistic':
							chainId = '0xa';
							break;
						case 'rinkeby':
							chainId = '0x4';
							break;
						case 'arbitrum-testnet':
							 chainId = '0x66eeb'
							break;
						case 'arbitrum-mainnet':
							 chainId = '0xa4b1'
							break;
						  default:
							console.log('No selected wallet');
						}
	
	return chainId
}


export const onSignInByMetamask = async () => {
	const selectedChainId = checkChainId()
	const provider = await detectEthereumProvider();
	let account

	if (provider) {
		
	  const chainId = await provider.request({method: 'eth_chainId'})


	  if(chainId == selectedChainId){ //16진법 0x45는 10진법으로 69
		const accounts = await provider.request({ method: 'eth_requestAccounts' });
		account = accounts[0];
			  
		   return account	
		  
		} else{
		  console.log(`서버가 ${SELECTED_NODE}으로 선택되어 있지 않습니다.`)
		   errorNotification(`메타마스크에서 서버를 ${SELECTED_NODE}으로 변경해주세요.`)
		   errorNotification(`Please set the RPC-node as ${SELECTED_NODE}.`)
	}
	

	} else {
	  console.error('Please install MetaMask!')
	}
 }

export const onConnectByMetamask = async () => {
	const selectedChainId = checkChainId()
	const provider = await detectEthereumProvider();
	let account
	let web3

	if (provider) {
		  const chainId = await provider.request({
			method: 'eth_chainId'
		  })
		  
		   if(chainId == selectedChainId){ //16진법 0x45는 10진법으로 69
			   const accounts = await provider.request({ method: 'eth_requestAccounts' });
			   account = accounts[0];
			   
			   console.log("로그인정보", account)
			   console.log(walletAddress)
			   
			   if(account==walletAddress){
				 web3 = new Web3(provider);

			   	 return web3
			   }else{
				  errorNotification(`로그인 정보와 메타마스크 계정이 일치하지 않습니다.`)
				  errorNotification(`The selected account of Metamask does not match with the user's info. `)
			   }
	
			} else{
			  console.log(`서버가 ${SELECTED_NODE}으로 선택되어 있지 않습니다.`)
			   errorNotification(`메타마스크에서 서버를 ${SELECTED_NODE}으로 변경해주세요.`)
			   errorNotification(`Please set the RPC-node as ${SELECTED_NODE}.`)
		}
			
		
		
		// const accounts = await provider.request({ method: 'eth_requestAccounts' });
		// const account = accounts[0];
		// console.log(account)
		
	

	} else {

	  // if the provider is not detected, detectEthereumProvider resolves to null
	  console.error('Please install MetaMask!')
		errorNotification('Please install MetaMask!')
	}
   
 }

export const onSIgnInByMetamaskModule = async() => {
	 const provider = await detectEthereumProvider();
	 let account
	 
	 const accounts = await provider.request({ method: 'eth_requestAccounts' });
	 account = accounts[0];
	
	 return account	
	
}

export const onSignInByMetamask1 = async () =>{
	 const selectedChainId = checkChainId()
	 const provider = await detectEthereumProvider();
	 let account
	
	 // MetaMask injects the global API into window.ethereum
	 if (provider) {
	  const chainId = await provider.request({method: 'eth_chainId'})
	   //아비트럼 맞으면 로그인하고
	    if(chainId == selectedChainId){
		     const accounts = await provider.request({ method: 'eth_requestAccounts' });
		     account = accounts[0];
		     return account	
		//그게 아니면 	
	    }else{
			try {
     		   // check if the chain to connect to is installed. 아비트럼으로 채인 변경 시도
				await provider.request({
				  method: 'wallet_switchEthereumChain',
				  params: [{ chainId: '0xa4b1' }], // chainId must be in hexadecimal numbers
				});
		    }catch(error){
			   // This error code indicates that the chain has not been added to MetaMask
			   // if it is not, then install it into the user MetaMask
				if (error.code === 4902) {
					try {
						  await provider.request({
								 method: 'wallet_addEthereumChain',
								 params: [
										  {
										  chainId: '0xa4b1',
										  chainName: 'Arbitrum One',
										  rpcUrls: ['https://arb1.arbitrum.io/rpc'],
										  nativeCurrency: {
													  name: 'AETH',
													  symbol: 'AETH', // 2-6 characters long
													  decimals: 18,
													 },
										  blockExplorerUrls: ['https://arbiscan.io'],
										},
									  ],
						 });
					  } catch (addError) {
							 console.error(addError);
						 }		  
				}
		    else {
		  		alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
		    } 	
			
		   
	    }	
	}

			
}
		    
	 
	 
}
	