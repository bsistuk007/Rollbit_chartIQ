import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Container, Row } from 'react-bootstrap';
import "./../FormLogin/formcustom.css"
import { useDispatch, useSelector } from "react-redux";
import StarCharacter from "../Common/starcharacter";
import { login } from "./../../actions/userActions";
import validator from 'validator'
import SvgLoading from "../Svg/svgloading";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [facode, setFACode] = useState("");
    const [message, setMessage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);

    const dispatch = useDispatch();
    const history= useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

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
        if (validator.isEmpty(value)) {
            setPasswordMessage('This field is required');
        } else {
            setPasswordMessage(null)
        }
    }

    useEffect(() => {
        if (userInfo) {
            props.setModalShow(false);
            history.push('/');
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(email === "" || password === "") {
            if(email === "") {
                setEmailMessage('This field is required');
            }
            if(password === ""){
                setPasswordMessage('This field is required');
            }
            return;
        }
        dispatch(login(email, password));
    };

    // const login = () => {
    //     dispatch({type: SET_PROFILE, payload: true})
    //     localStorage.setItem('loginFlag', true);
    //     props.setModalShow(false);
    // }

    return (
        <Form className="mt-[10px]" onSubmit={submitHandler}>
            <Container className="p-0">
                <Row>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>EMAIL <StarCharacter></StarCharacter></Form.Label>
                        <Form.Control 
                            className="form-input-login leading-9" 
                            type="email" 
                            placeholder="youremail@domain.com" 
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}    
                        />
                        {emailMessage && <div className="text-[#ff4949] mt-2 text-[14px]">{emailMessage}</div>}
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
                        {error && <div className="text-[#ff4949] mt-2 text-[14px]">{error}</div>}
                        {message && <div className="text-[#ff4949] mt-2 text-[14px]">{message}</div>}
                        <Form.Text className="text-muted">
                            Forgot password?
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="2facode">
                        <Form.Label>2FA CODE</Form.Label>
                        <Form.Control 
                            className="form-input-login leading-9" 
                            type="text" 
                            placeholder="Code"
                            value={facode}
                            onChange={(e) => setFACode(e.target.value)} 
                        />
                        <Form.Text className="text-muted">
                            Required if you enabled two-factor authentication
                        </Form.Text>
                    </Form.Group>
                </Row>
                <Row>
                    <p className="mb-[14px]">
                        This site is protected by reCAPTCHA and the GooglePrivacy Policy andTerms of Service apply.
                    </p>
                </Row>
                <Row className="px-[10.5px]">
                    <button type="submit" className="default-btn yellow-btn">{loading && <SvgLoading width="20" height="20"></SvgLoading>}LOGIN</button>
                </Row>
            </Container>
        </Form>
    );
}
  
export default Login;
  