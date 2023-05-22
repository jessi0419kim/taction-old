export const L1GatewayRouterAddress = '0x32f39fa08c1E0bbA551CBDa4197e543C53b3fC53'
export const L1GatewayRouterABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newDefaultGateway","type":"address"}],"name":"DefaultGatewayUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"l1Token","type":"address"},{"indexed":true,"internalType":"address","name":"gateway","type":"address"}],"name":"GatewaySet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"_userFrom","type":"address"},{"indexed":true,"internalType":"address","name":"_userTo","type":"address"},{"indexed":false,"internalType":"address","name":"gateway","type":"address"}],"name":"TransferRouted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":true,"internalType":"uint256","name":"_seqNum","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"_data","type":"bytes"}],"name":"TxToL2","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newSource","type":"address"}],"name":"WhitelistSourceUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"l1ERC20","type":"address"}],"name":"calculateL2TokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"counterpartGateway","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultGateway","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"finalizeInboundTransfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getGateway","outputs":[{"internalType":"address","name":"gateway","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"getOutboundCalldata","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inbox","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_defaultGateway","type":"address"},{"internalType":"address","name":"_whitelist","type":"address"},{"internalType":"address","name":"_counterpartGateway","type":"address"},{"internalType":"address","name":"_inbox","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"l1TokenToGateway","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_maxGas","type":"uint256"},{"internalType":"uint256","name":"_gasPriceBid","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"outboundTransfer","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"postUpgradeInit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newL1DefaultGateway","type":"address"},{"internalType":"uint256","name":"_maxGas","type":"uint256"},{"internalType":"uint256","name":"_gasPriceBid","type":"uint256"},{"internalType":"uint256","name":"_maxSubmissionCost","type":"uint256"}],"name":"setDefaultGateway","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_gateway","type":"address"},{"internalType":"uint256","name":"_maxGas","type":"uint256"},{"internalType":"uint256","name":"_gasPriceBid","type":"uint256"},{"internalType":"uint256","name":"_maxSubmissionCost","type":"uint256"},{"internalType":"address","name":"_creditBackAddress","type":"address"}],"name":"setGateway","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_gateway","type":"address"},{"internalType":"uint256","name":"_maxGas","type":"uint256"},{"internalType":"uint256","name":"_gasPriceBid","type":"uint256"},{"internalType":"uint256","name":"_maxSubmissionCost","type":"uint256"}],"name":"setGateway","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_token","type":"address[]"},{"internalType":"address[]","name":"_gateway","type":"address[]"},{"internalType":"uint256","name":"_maxGas","type":"uint256"},{"internalType":"uint256","name":"_gasPriceBid","type":"uint256"},{"internalType":"uint256","name":"_maxSubmissionCost","type":"uint256"}],"name":"setGateways","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newSource","type":"address"}],"name":"updateWhitelistSource","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
	  
export const L1GatewayRouterRealAddress = '0x72Ce9c846789fdB6fC1f34aC4AD25Dd9ef7031ef'
export const L1GatewayRouterRealABI = [{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]