(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[27],{1051:function(e,t,n){"use strict";n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return o}));var a=n(2),r=(n(0),n(530)),s=(n(102),function(e){r.a.info({message:"TxHash Published",duration:0,description:Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:"TxHash : "}),Object(a.jsx)("a",{href:"https://arbiscan.io/tx/".concat(e),target:"_blank",children:e})]}),onClick:function(){console.log("Notification Clicked!")}})}),i=function(e){r.a.error({message:"Transaction denied",duration:0,description:Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("p",{children:e})}),onClick:function(){console.log("Notification Clicked!")}})},o=function(e){r.a.error({message:"Not Enough TAC",duration:0,description:Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:"You should have more than 10TAC to confirm the match."}),Object(a.jsx)("span",{children:"Current Balance : "}),Object(a.jsxs)("span",{className:"text-danger",children:[e," TAC"]})]}),onClick:function(){console.log("Notification Clicked!")}})}},1062:function(e,t,n){"use strict";var a=n(18),r=n.n(a),s=n(140),i=n(1071),o=n(1072),u=function(){var e=Object(s.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t,e.next="metamask"===e.t0?3:"portis"===e.t0?7:11;break;case 3:return e.next=5,Object(o.a)();case 5:return n=e.sent,e.abrupt("break",12);case 7:return e.next=9,Object(i.a)();case 9:return n=e.sent,e.abrupt("break",12);case 11:console.log("No selected wallet");case 12:return e.abrupt("return",n);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.a=u},1071:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return p}));var a=n(18),r=n.n(a),s=n(140),i=n(536),o=n.n(i),u=n(1106),c=new(n.n(u).a)("72d754bc-b373-4ab0-b758-1bf2461433bb",{nodeUrl:"https://arb1.arbitrum.io/rpc",chainId:42161}),p=function(){var e=Object(s.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new o.a(c.provider),console.log("Web3 instance is",t),e.abrupt("return",t);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},1072:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return b}));var a=n(18),r=n.n(a),s=n(140),i=n(1115),o=n.n(i),u=n(536),c=n.n(u),p=n(102),l=n(1051),d=localStorage.getItem("auth_token"),y=(localStorage.getItem("wallet_type"),function(){var e;switch(p.a){case"kovan-optimistic":e="0x45";break;case"optimistic":e="0xa";break;case"rinkeby":e="0x4";break;case"arbitrum-testnet":e="0x66eeb";break;case"arbitrum-mainnet":e="0xa4b1";break;default:console.log("No selected wallet")}return e}),m=function(){var e=Object(s.a)(r.a.mark((function e(){var t,n,a,s,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=y(),e.next=3,o()();case 3:if(!(n=e.sent)){e.next=29;break}return e.next=7,n.request({method:"eth_chainId"});case 7:if(e.sent!=t){e.next=24;break}return e.next=11,n.request({method:"eth_requestAccounts"});case 11:if(i=e.sent,a=i[0],console.log("\ub85c\uadf8\uc778\uc815\ubcf4",a),console.log(d),a!=d){e.next=20;break}return s=new c.a(n),e.abrupt("return",s);case 20:Object(l.a)("\ub85c\uadf8\uc778 \uc815\ubcf4\uc640 \uba54\ud0c0\ub9c8\uc2a4\ud06c \uacc4\uc815\uc774 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."),Object(l.a)("The selected account of Metamask does not match with the user's info. ");case 22:e.next=27;break;case 24:console.log("\uc11c\ubc84\uac00 ".concat(p.a,"\uc73c\ub85c \uc120\ud0dd\ub418\uc5b4 \uc788\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.")),Object(l.a)("\uba54\ud0c0\ub9c8\uc2a4\ud06c\uc5d0\uc11c \uc11c\ubc84\ub97c ".concat(p.a,"\uc73c\ub85c \ubcc0\uacbd\ud574\uc8fc\uc138\uc694.")),Object(l.a)("Please set the RPC-node as ".concat(p.a,"."));case 27:e.next=31;break;case 29:console.error("Please install MetaMask!"),Object(l.a)("Please install MetaMask!");case 31:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(s.a)(r.a.mark((function e(){var t,n,a,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=y(),e.next=3,o()();case 3:if(!(n=e.sent)){e.next=35;break}return e.next=7,n.request({method:"eth_chainId"});case 7:if(e.sent!=t){e.next=16;break}return e.next=11,n.request({method:"eth_requestAccounts"});case 11:return s=e.sent,a=s[0],e.abrupt("return",a);case 16:return e.prev=16,e.next=19,n.request({method:"wallet_switchEthereumChain",params:[{chainId:"0xa4b1"}]});case 19:e.next=35;break;case 21:if(e.prev=21,e.t0=e.catch(16),4902!==e.t0.code){e.next=34;break}return e.prev=24,e.next=27,n.request({method:"wallet_addEthereumChain",params:[{chainId:"0xa4b1",chainName:"Arbitrum One",rpcUrls:["https://arb1.arbitrum.io/rpc"],nativeCurrency:{name:"AETH",symbol:"AETH",decimals:18},blockExplorerUrls:["https://arbiscan.io"]}]});case 27:e.next=32;break;case 29:e.prev=29,e.t1=e.catch(24),console.error(e.t1);case 32:e.next=35;break;case 34:alert("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html");case 35:case"end":return e.stop()}}),e,null,[[16,21],[24,29]])})));return function(){return e.apply(this,arguments)}}()},2084:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(18),s=n.n(r),i=n(140),o=n(85),u=n(0),c=n(174),p=(n(1172),[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"winner",type:"address"},{internalType:"address",name:"loser",type:"address"},{internalType:"address",name:"referee",type:"address"}],name:"awardTAC",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"athlete",type:"address"},{internalType:"address",name:"referee",type:"address"}],name:"awardTrainingTAC",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint16",name:"_multiplier",type:"uint16"},{internalType:"address",name:"_coopDataContract",type:"address"},{internalType:"address",name:"_votingPoolContract",type:"address"},{internalType:"address",name:"_eventsContract",type:"address"},{internalType:"address",name:"_lockupContract",type:"address"}],name:"changeParameters",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_amount",type:"uint256"},{internalType:"address",name:"_to",type:"address"}],name:"claim",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"coopDataContract",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"creatorAddress",outputs:[{internalType:"address payable",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"eventsContract",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"lockupContract",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"multiplier",outputs:[{internalType:"uint16",name:"",type:"uint16"}],stateMutability:"view",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"sender",type:"address"},{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"votingPoolContract",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"}]),l=(n(1071),n(1072),n(1051)),d=(n(1062),n(1173),n(143),n(1115)),y=n.n(d),m=n(536),b=n.n(m);n(79),t.default=function(){var e=localStorage.getItem("auth_token"),t=(localStorage.getItem("wallet_type"),Object(u.useState)(null)),n=Object(o.a)(t,2),r=(n[0],n[1],Object(u.useState)(null)),d=Object(o.a)(r,2),m=(d[0],d[1],function(){var t=Object(i.a)(s.a.mark((function t(){var n,a,r,o,u,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y()();case 2:if(!(n=t.sent)){t.next=12;break}return a=new b.a(n),t.next=7,n.request({method:"eth_requestAccounts"});case 7:r=t.sent,o=r[0],console.log(o),t.next=14;break;case 12:console.error("Please install MetaMask!"),Object(l.a)("Please install MetaMask!");case 14:return u=a.utils.toWei("1000","ether"),c=new a.eth.Contract(p,"0xC3E9d4d1f91626291F3B7590C8c13C6370C7d3B9"),t.next=18,c.methods.claim(u,e).send({type:"0x2",from:e,gas:"0x186a0"}).on("transactionHash",function(){var e=Object(i.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(l.c)(t),console.log(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).on("error",(function(e){Object(l.a)(e.message),console.log(e)}));case 18:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}());return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h1",{children:"TACTION for Arbitrum is still Under Construction"}),Object(a.jsx)("h3",{children:"To Claim TAC for rinkeby, Please press the button below."}),Object(a.jsx)(c.a,{className:"mb-2 bt-2",type:"primary",size:"small",onClick:function(){return m()},children:"ClaimTAC-rinkeby"})]})}}}]);