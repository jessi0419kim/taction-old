import Web3 from 'web3'
import Portis from "@portis/web3";

const myLocalPOANode = {
  nodeUrl: 'https://kovan.optimism.io',
  chainId: 69,
};

export const portis = new Portis("24362e3c-2da0-445c-a0ee-b1e33da455ce", myLocalPOANode);

export const onConnectByPortis = async () => {
		
	  const web3 = new Web3(portis.provider);
	  console.log("Web3 instance is", web3);

	  return web3	
 }