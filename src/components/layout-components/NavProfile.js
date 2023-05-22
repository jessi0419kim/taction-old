import React, {useState, useEffect} from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from 'react-redux'
import { 
  EditOutlined, 
  SettingOutlined, 
  ShopOutlined, 
  QuestionCircleOutlined, 
  LogoutOutlined ,
	UserAddOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';
import FirebaseService from 'services/FirebaseService'
import { db } from 'auth/FirebaseAuth';
import {OTACAddress, OTACABI, OCoopDataAddress, OCoopDataABI, OTACLockupABI, OTACLockupAddress, OTACEventsAddress, OTACEventsABI} from 'services/AddAndABISrc_arbi_mainnet'
import { getAlchemyHTTPS, web3Optimism, web3Mainnet} from 'services/AlchemyService'

const menuItem = [
	{
		title: "Edit Profile",
		icon: EditOutlined ,
		path: "/app/editProfile"
    },
]

export const NavProfile = ({signOut}) => {
	const walletAddress = localStorage.getItem('auth_token');
	const walletType = localStorage.getItem('wallet_type');
	
	const [profileImgSrc, setProfileImgSrc] = useState(null)
    const [userName, setUserName] = useState(null)
	const [isAdmin, setIsAdmin] = useState(true)
		
	// const getUserInfoFromFB = async() => {	
	// 	await db.collection("users").doc(walletAddress).onSnapshot((doc) => {
	// 		setUserName(doc.data().name) 
	// 		setProfileImgSrc(doc.data().profileImage)
	// 	})
	// }
	
	// const checkIfAdmin = async () => {
	// 	const web3 = await web3Optimism
	// 	const ocoop_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
	// 	const checkAdmin = await ocoop_contract.methods.admins(walletAddress).call()
	// setIsAdmin(checkAdmin)
	// }
																   
																   
	
	const onSignOut = async() => {
		signOut()
	}
	
  const profileImg = "/img/avatars/thumb-1.jpg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImgSrc} />
          <div className="pl-3">
            <h4 className="mb-0">{userName}</h4>
            <span className="text-muted">{walletType}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.legth + 1} onClick={e => onSignOut()}>
            <span className="font-weight-semibold text-danger">
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
		{isAdmin &&
			<Menu.Item key={20} >
			<a href={"/app/dashboard/admin"}>
            <span className="font-weight-semibold text-info">
              <UserAddOutlined className="mr-3" width="2rem"/>
              <span>Admin</span>
            </span>
		    </a>
          </Menu.Item>
		}	
        </Menu>
      </div>
    </div>
  );
	
	useEffect(()=>{
		let isComponentMounted = true;
		const getUserInfoFromFB = async() => {	
				await db.collection("users").doc(walletAddress).onSnapshot((doc) => {
					if (isComponentMounted) {
						setUserName(doc.data().name) 
					    setProfileImgSrc(doc.data().profileImage)
					}
					
				})
			}
			
		getUserInfoFromFB()
		
		return () => {
        isComponentMounted = false;
      };
	},[])
	
	// useEffect(()=>{
	// 	let isComponentMounted = true;
		
	// 	const checkIfAdmin = async () => {
	// 	const web3 = await web3Optimism
	// 	const ocoop_contract =  new web3.eth.Contract(OCoopDataABI, OCoopDataAddress);
	// 	const checkAdmin = await ocoop_contract.methods.admins(walletAddress).call()
		
	// 	if (isComponentMounted) {
	// 	  setIsAdmin(checkAdmin)
	// 	}
	// }
		
	// 	checkIfAdmin()
		
	// 	return () => {
	// isComponentMounted = false;
	// };
	// },[])
	
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar src={profileImgSrc} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut})(NavProfile)
