import React, {useEffect, useState, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_TOKEN,} from 'redux/constants/Auth'; 
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import {updateUserInfo} from "redux/actions/Auth";
import { Row, Col, Button, Card, Avatar, Dropdown, Table, Menu, Tag, Form, Input, InputNumber, message, Select, Upload} from 'antd';
import countryList from 'react-select-country-list'
import { InboxOutlined } from '@ant-design/icons';
import FirebaseService from 'services/FirebaseService'
import { storage, db } from 'auth/FirebaseAuth';
const { Option } = Select;
const { Dragger } = Upload;



const EditProfileImage = () => {
		const walletAddress = localStorage.getItem('auth_token');
	const walletType = localStorage.getItem('wallet_type');

	const [form] = Form.useForm();
	const [profileImageSrc, setProfileImageSrc] = useState("")
	const [updateLoading, setUpdateLoading] = useState(false)
	
	const loadUserInfo = async () => {
		await db.collection("users").doc(walletAddress)
    	.onSnapshot((doc) => {
			setProfileImageSrc(doc.data().profileImage)
        console.log("Current data: ", doc.data().profileImage);
		});
		}
	
	useEffect(()=>{
		loadUserInfo()
	},[])
	
	const metadata = {
	  contentType: 'image/jpeg',
	};
	
	const uploadToStorage = async (file) => {
		const storageRef = storage.ref();
		const fileRef = storageRef.child(walletAddress);
   		await fileRef.put(file, metadata);
	}
	

	const customUpload = async ({ onError, onSuccess, file }) => {
    const metadata = {
        contentType: 'image/jpeg'
    }
    const storageRef = storage.ref();
    const imgFile = storageRef.child(walletAddress);
    try {
      const image = await imgFile.put(file, metadata);
	  const imageURL = await imgFile.getDownloadURL()
	  console.log(imageURL)
	  await db.collection("users").doc(walletAddress).update({ profileImage: imageURL,
													 }).catch(function(error) {
													 console.error("Error adding document: ", error);
													 });
								
      onSuccess(null, image);
    } catch(e) {
      onError(e);
    }
  };
	
	const props = {
	  name: 'file',
	  multiple: false,
	  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	  onChange(info) {
		const { status } = info.file;
		if (status !== 'uploading') {
		  console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			
		  message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
		  message.error(`${info.file.name} file upload failed.`);
		}
	  },
	};


		
	return (
		<>		
			<Card title="Profile Image">
				
			
			<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="center" alignItems="center">
							<Avatar className="mb-3" size={128} src={profileImageSrc} />
						</Flex>
					</div>

			  <Dragger {...props}  customRequest={customUpload}>
				<p className="ant-upload-drag-icon">
				  <InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
				  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
				  band files
				</p>
			  </Dragger>
			</Card>
		</>
	)
}

export default EditProfileImage
