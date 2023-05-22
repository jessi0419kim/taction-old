import {onConnectByPortis} from './PortisService'
import {onConnectByMetamask} from './MetamaskService'


const walletServices = async(walletType) => {
	let web3
	
	switch (walletType) {
						  case 'metamask':
							web3 = await onConnectByMetamask();
							break;
						  case 'portis':
							web3 = await onConnectByPortis();
							break;
						  default:
							console.log('No selected wallet');
						}
	
	return web3
}

export default walletServices