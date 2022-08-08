import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Container, Row } from 'react-bootstrap';
import "./../FormLogin/formcustom.css"
import StarCharacter from "../Common/starcharacter";
import { register } from "./../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator'
import SvgLoading from "../Svg/svgloading";


function Register(props) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [userNameMessage, setUserNameMessage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    // const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            props.setModalShow(false);
            history.push('/');
        }
    }, [userInfo]);
    
    const validateUserName = (value) => {
        setUserName(value);
        if (validator.isLength(value, {
            min: 3, max: 72
        })) {
            setUserNameMessage(null);
        } else {
            setUserNameMessage('Must be at least 3 characters');
        }
    }

    const validateEmail = (value) => {
        setEmail(value);
        if (validator.isEmpty(value)) {
            setEmailMessage('This field is required')
        } else {
            setEmailMessage(null)
        }
    }

    const validatePassword = (value) => {
        setPassword(value);
        if (validator.isLength(value, {
            min: 5, max: 72
        })) {
            setPasswordMessage(null);
        } else {
            setPasswordMessage('Must be at least 5 characters');
        }
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(userName === "" || email === "" || password === "") {
            if(userName === ""){
                setUserNameMessage('This field is required');
            }
            if(email === "") {
                setEmailMessage('This field is required');
            }
            if(password === ""){
                setPasswordMessage('This field is required');
            }
            return;
        }
        if(passwordMessage == null){
            dispatch(register(userName, email, password));
        }
    };

    return (
        <Form className="mt-[10px]" onSubmit={submitHandler}>
            <Container className="p-0">
                <Row>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>USERNAME<StarCharacter></StarCharacter></Form.Label>
                        <Form.Control 
                            className="form-input-login leading-9" 
                            type="text" 
                            placeholder="Username" 
                            value={userName}
                            onChange={(e)=>validateUserName(e.target.value)}
                        />
                        {userNameMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{userNameMessage}</div>}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>EMAIL<StarCharacter></StarCharacter></Form.Label>
                        <Form.Control 
                            className="form-input-login leading-9" 
                            type="email" 
                            placeholder="youremail@domain.com"
                            value={email}
                            onChange={(e)=>validateEmail(e.target.value)} 
                        />
                        {emailMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{emailMessage}</div>}
                        {error && <div className="text-[#ff4949] mt-2 text-[14px]">{error}</div>}
                        {message && <div className="text-[#ff4949] mt-2 text-[14px]">{message}</div>}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="userPassword">
                        <Form.Label>PASSWORD<StarCharacter></StarCharacter></Form.Label>
                        <Form.Control 
                            className="form-input-login leading-9" 
                            type="password" 
                            placeholder="********" 
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                        />
                        {passwordMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{passwordMessage}</div>}
                    </Form.Group>
                </Row>
                <Row>
                    <p className="mb-[14px]">
                        This site is protected by reCAPTCHA and the GooglePrivacy Policy andTerms of Service apply.
                    </p>
                </Row>
                <Row className="px-[10.5px]">
                    
                    <button type="submit" className="default-btn yellow-btn">{loading && <SvgLoading width="20" height="20"></SvgLoading>}START PLAYING</button>
                    {/* <Button type="submit" className="default-btn yellow-btn">START PLAYING</Button> */}
                </Row>
            </Container>
        </Form>
    );
}
  
export default Register;
  