import Onboard from 'bnc-onboard'
import Web3 from 'web3'
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";

let web3;

export const onboard = Onboard({
  dappId: "019d1016-4105-463d-83d4-ca7b5de2b8ec",       // [String] The API key created by step one above
  networkId: 69,  // kovan-optimism(69)     optimism(10)
  networkName: 'optimism-kovan',
  subscriptions: {
    wallet: wallet => {
       web3 = new Web3(wallet.provider)
    }
  },
  walletSelect: {
	  wallets: [
		      { walletName: "metamask", preferred: true },
			  {
				walletName: "fortmatic",
				apiKey: "pk_test_21053F9741DC0E5B",
				preferred: true
			  },
			  {
				walletName: "portis",
				apiKey: "0fccffb3-5cff-4c61-8cca-59ee4e9e9894",
				preferred: true,
			  },
	  ]
  }
});

