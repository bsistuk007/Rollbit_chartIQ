import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import SvgProfile from '../Svg/svgprofile';
import { updateUserProfile } from "./../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
    const [isPrivate, setPrivate] = useState();
    const dispatch = useDispatch();
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success, error } = userUpdateProfile;

    useEffect(() => {
        setPrivate(userInfo.isPrivate);
    }, []);

    const changePrivate = () => {
        setPrivate(!isPrivate);
        const temp = !isPrivate;
        // isPrivate = !isPrivate;
        dispatch(updateUserProfile({ id: userInfo._id, isPrivate: temp, type: 'private'}));
        notify('success')
    }

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

    return (
        <>
            <ToastContainer/>
            <div className='uppercase italic flex mb-4 '>
                <SvgProfile></SvgProfile>
                Profile
            </div>
            <Container className='pl-[0px]'>
                <Row className='pt-4'>
                    <Col>
                        <Form>
                        <Form.Check 
                                type="checkbox"
                                id="default-checkbox"
                                label="PRIVATE PROFILE"
                                className='text-sm'
                                checked={isPrivate}
                                onChange={ changePrivate }
                            />
                        </Form>
                    </Col>
                </Row>
            </Container>
        
        </>
    );
}
  
export default Profile;