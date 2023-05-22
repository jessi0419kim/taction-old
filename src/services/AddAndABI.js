import Web3 from 'web3'
import Web3Modal from "web3modal";
import Portis from "@portis/web3";

import { TACVotingABI, TACVotingAddress,CoopDataABI, CoopDataAddress, TACLockupABI, TACLockupAddress, TACABI, TACAddress, AdvisorLockUpAddress, AdvisorLockUpABI} from './AddAndABISrc';

export let provider = true;
export let web3 = null;
export let accounts = null;

// export const providerOptions = {

// 	portis: {
//     package: Portis, // required
//     options: {
//       id: "0fccffb3-5cff-4c61-8cca-59ee4e9e9894"
//     }
//   },
// 	// fortmatic: {
// 	// package: Fortmatic, // required
// 	// options: {
// 	// key: "FORTMATIC_KEY" // required
// 	// }
// 	// }
//  };

// export const web3Modal = new Web3Modal({
// 	    network: "rinkeby",
//         cacheProvider: false, // optional
//         providerOptions // required
//       });


export const AdvisorLockUpContract = {}
export const CoopDataContract = {}
export const TacContract = {}
export const TacLockupContract = {}