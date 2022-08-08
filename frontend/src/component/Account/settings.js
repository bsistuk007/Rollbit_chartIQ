import React, { useState, useEffect } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import StarCharacter from '../Common/starcharacter';
import SvgSetting from '../Svg/svgsetting';
import validator from 'validator'
import SvgLoading from "../Svg/svgloading";
import { updateUserProfile } from "./../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Settings() {
    const [newEmail, setNewEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [oldPasswordMessage, setOldPasswordMessage] = useState(null);
    const [newPasswordMessage, setNewPasswordMessage] = useState(null);
    
    const dispatch = useDispatch();
    const history = useHistory();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success, error } = userUpdateProfile;

    const notify = (message) => toast.success(message, {
        position: "bottom-left",
        autoClose: 5000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const validateNewEmail = (value) => {
        setNewEmail(value);
        if (validator.isEmpty(value)) {
            setEmailMessage('This field is required');
            return false;
        } 
        if (!validator.isEmail(value)) {
            setEmailMessage('email address is invalid');
            return false;
        }
        setEmailMessage(null);
        return true;
    }

    const validateOldPassword = (value) => {
        setOldPassword(value);
        if (validator.isEmpty(value)) {
            setOldPasswordMessage('This field is required');
            return false;
        }
        setOldPasswordMessage(null);
        return true;
    }

    const validateNewPassword = (value) => {
        setNewPassword(value);
        if (validator.isEmpty(value)) {
            setNewPasswordMessage('This field is required');
            return false;
        }
        if (!validator.isLength(value, {
            min: 5, max: 72
        })) {
            setNewPasswordMessage('Must be at least 5 characters');
            return false;
        }
        setNewPasswordMessage(null);
        return true;
    }

    const changeEmail = () => {
        if(validateNewEmail(newEmail)) {
            dispatch(updateUserProfile({ id: userInfo._id, newEmail, type: 'email'}));
        }
    }
    
    const changePassword = () => {
        validateOldPassword(oldPassword);
        if(validateNewPassword(newPassword) && validateOldPassword(oldPassword)) {
            dispatch(updateUserProfile({ id: userInfo._id, newPassword, oldPassword, type: 'password'}));
            // if(success == true){
            //     notify('success')
            //     console.log(loading);
            // }
        }
    }

    useEffect(() => {
        if(success)
            notify('success')
    }, [success])

    return (
        <>
            {/* <button onClick={()=>{notify("123")}}>Notify!</button> */}
            <ToastContainer 
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className='uppercase italic flex mb-4 '>
                <SvgSetting></SvgSetting>
                Settings
            </div>
            <div>
                <div className='mb-4'>
                    <span className='uppercase italic font-extrabold text-[18px] '>Change Email</span>
                    <OverlayTrigger
                        key="top"
                        placement="top"
                        trigger={`click`}
                        overlay={
                            <Tooltip id={`tooltip-top`} >
                                {userInfo.email}
                            </Tooltip>
                        }
                        >
                        <button className="setting-email-tooltip-btn">Show Current Email</button>
                        {/* <Button variant="secondary">Show Current Email</Button> */}
                    </OverlayTrigger>
                </div>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label className='text-sm uppercase text-[#B1B6C6]'>New Email <StarCharacter></StarCharacter></Form.Label>
                        <div className="setting-email-box">
                            <input className='setting-email-input-box text-[16px]' type="email" name="email" value = {newEmail} onChange={(e)=>validateNewEmail(e.target.value)} placeholder="youremail@email.com"/>
                            <button className="default-btn yellow-btn uppercase !h-[30px]" onClick={changeEmail}>Change Email</button>
                        </div>
                        {error === "email is already used" && <div className="text-[#ff4949] mt-2 text-[14px]">{error}</div>}
                        {emailMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{emailMessage}</div>}

                    </Form.Group>
                <div>
                        {/* <Form.Control className="form-input-login leading-10 pl-5" type="email" placeholder="youremail@domain.com" /> */}
                </div>
            </div>
            <div className='mt-12'>
                <p className='uppercase italic font-extrabold text-[18px] mb-4 '>Verify Your Email</p>
                <div className='mb-3'>
                    <span className='text-sm'>
                        Status:
                        <span className='text-[#FF4949]'>
                            {' '}
                            Unverified
                        </span>
                    </span>
                </div>
                <div className='mb-4'>
                    <button className="default-btn yellow-btn uppercase">Send Verification Email</button>
                </div>
            </div>

            <div className='mt-12'>
                <p className='uppercase italic font-extrabold text-[18px] mb-4'>Change Password</p>
                <div>
                    <Form.Group className="mb-3" controlId="userOldPwd">
                        <Form.Label className='text-sm uppercase text-[#B1B6C6]'>Old Password <StarCharacter></StarCharacter></Form.Label>
                        <Form.Control className="form-input-login leading-10 pl-5" type="password" placeholder="" onChange={(e)=>validateOldPassword(e.target.value)}/>
                        {oldPasswordMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{oldPasswordMessage}</div>}
                    </Form.Group>
                </div>
                <div>
                    <Form.Group className="mb-3" controlId="userNewPwd">
                        <Form.Label className='text-sm uppercase text-[#B1B6C6]'>
                            New Password
                            <StarCharacter></StarCharacter>
                        </Form.Label>
                        <Form.Control className="form-input-login leading-10 pl-5" type="password" placeholder="" onChange={(e)=>validateNewPassword(e.target.value)}/>
                        {newPasswordMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{newPasswordMessage}</div>}
                        {error != "email is already used" && <div className="text-[#ff4949] mt-2 text-[14px]">{error}</div>}
                    </Form.Group>
                    <div>
                        <button className="default-btn yellow-btn uppercase" onClick={changePassword}>
                            {loading && <SvgLoading></SvgLoading>}
                            Change Password
                        </button>
                    </div>
                </div>
                
            </div>

            <div className='my-12'>
                <p className='uppercase italic font-extrabold text-[18px] mb-4'>Two-Factor Authentication</p>
                <div>
                    <p className='text-sm text-[#B1B6C6]'>
                        Using two-factor authentication is highly recommended because it protects your account with both your password and your phone.
                    </p>
                    <p className='text-sm mt-4'>
                        While 2FA is enabled, you will not be able to login via Steam.
                    </p>
                    <div className='mt-4'>
                        <button className="default-btn yellow-btn uppercase">Enable 2FA</button>
                    </div>
                </div>
            </div>
        </>
    );
}
  
export default Settings;