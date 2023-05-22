import Web3 from 'web3'
import Portis from "@portis/web3";


// const myLocalPOANode = {
//   nodeUrl: 'https://kovan.optimism.io',
//   chainId: 69,
// };

//https://developer.offchainlabs.com/docs/public_testnet
//Arbitrum-Testnet

// const myLocalPOANode = {
//   nodeUrl: 'https://rinkeby.arbitrum.io/rpc',
//   chainId: 421611,
// };

//https://developer.offchainlabs.com/docs/mainnet

const myLocalPOANode = {
  nodeUrl: 'https://arb1.arbitrum.io/rpc',
  chainId: 42161,
};


export const portis = new Portis("72d754bc-b373-4ab0-b758-1bf2461433bb", myLocalPOANode);




export const onConnectByPortis = async () => {
		
	  const web3 = new Web3(portis.provider);
	  console.log("Web3 instance is", web3);

	  return web3	
 }