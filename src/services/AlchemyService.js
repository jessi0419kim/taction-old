import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {SELECTED_NODE} from 'configs/NodeConfig'



export const getAlchemyHTTPS = () => {
 switch(SELECTED_NODE) {
  case "kovan-optimistic":
    return "https://opt-kovan.g.alchemy.com/v2/IV8B0e9LDyhI71sw0z44gm8FU6QIFFmt"
  case "optimistic":
    return  "https://opt-mainnet.g.alchemy.com/v2/VVNzXL4q92UgMKFiZiLbOIR_zwrshAzc"
  case "arbitrum-testnet":
	return "https://arb-rinkeby.g.alchemy.com/v2/U11weflfrF4nihG93RLN2fJdYupRlwgQ"
  case "arbitrum-mainnet":
	return "https://arb-mainnet.g.alchemy.com/v2/yYXdqo8M-U2jkUhv8wu1a-5KNyFlTbJW"
  default:
   console.log('error');
 }
}


export const web3Optimism = createAlchemyWeb3(getAlchemyHTTPS(SELECTED_NODE))


export const web3Mainnet = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/FNdsGeoI4AJXrjTI4Dprvcw1T89BusTl");