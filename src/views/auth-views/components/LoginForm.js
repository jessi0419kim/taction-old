import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button} from "antd";
import PropTypes from 'prop-types';
import { 
	signIn, 
	showLoading, 
	showAuthMessage, 
	hideAuthMessage, 
	signInwithWallet
} from 'redux/actions/Auth';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import {portis} from 'services/walletServices/PortisService'
//import {errorNotification, txHashNotification} from 'components/shared-components/Notifications'
import {onConnectByMetamask, onSignInByMetamask, onSignInByMetamask1} from 'services/walletServices/MetamaskService'



export const LoginForm = (props, provider, web3, ) => {

    const dispatch = useDispatch()
	let history = useHistory();

	const { 
		otherSignIn, 
		//showForgetPassword, 
		hideAuthMessage,
		//onForgetPasswordClick,
		showLoading,
		extra, 
		signIn, 
		token, 
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect
	} = props


	const onLogin = values => {
		showLoading()
		signIn(values);
	};



	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
			setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
	});
	

	

	
	const onConnectPortis = async() => {
		portis.onLogin((walletAddress) => {
		 console.log(walletAddress)
		  dispatch(signInwithWallet({walletAddress, walletType: 'portis'}))   
		})
	    portis.showPortis()

	}
	
	const onConnectMetamask = async() => {
	
		const walletAddress = await onSignInByMetamask1()
		if(walletAddress){
			dispatch(signInwithWallet({walletAddress, walletType: 'metamask'}))   
		}else{
			console.log('로그인 실패')
	
		}
		
	}
	
	
	return(
		<>
			<Button className="mt-3" type="primary" block onClick={() => onConnectPortis()}>
			   Portis
			</Button>
			<Button className="mt-3" type="primary" block onClick={() => onConnectMetamask()}>
			   Metamask
			</Button>	
		    	<div className="my-4">
					<div className="text-center">
					 <Button type='text'>
					   <a className="text-muted" href={`https://tkd-coop.notion.site/TAC-eebcbb679c5749fda84c1dbf158ea967`} target="_blank">자주하는 질문(FAQ)</a>
				     </Button>
					</div>
				</div>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
