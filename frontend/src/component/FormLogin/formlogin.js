import React, {useState, useEffect} from "react";
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import Login from "../Login/login";
import Register from "../Register/register";
import formcustom from './formcustom.css';
import logo from './../../assets/img/Logo.png'
import SvgSteam from "../Svg/svgsteam";
import SvgTwitch from "../Svg/svgtwitch";
import SvgMetamask from "../Svg/svgmetamask";
import SvgClose from "../Svg/svgclose";

function FormLogin(props) {

    useEffect(() => {
    }, []);

    return (
        <Modal className="p-0 min-w-full" show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className="show-grid p-0 modal-body">
                <Container fluid>
                    <Row className="flex flex-col-reverse md:flex md:flex-row">
                        <Col md={6} sm={12} className="py-[24px] px-[40px]">
                            <Row>
                                <Col className="flex">
                                    <div className={`login-register-set ${props.register===false? "login-register-set-active":""}`} onClick={()=>props.setRegister(false)}>Login</div>
                                    <div className={`login-register-set ${props.register===true? "login-register-set-active":""}`} onClick={()=>props.setRegister(true)}>Register</div>
                                    {/* <Button className="default-btn login-register-nav-btn">LOGIN</Button>
                                    <Button className="default-btn" >REGISTER</Button> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>{
                                    props.register ? (
                                        <Register setModalShow={props.setModalShow}></Register>
                                        )
                                    :
                                    (
                                        <Login setModalShow={props.setModalShow}></Login>
                                    )
                                }
                                </Col>
                            </Row>
                            <Row className="pt-[8px]">
                                <Col>
                                    <p className="text-center py-1">Or Continue with</p>
                                </Col>
                            </Row>
                            <Row className="pt-[8px]">
                                <Col xs={6} md={6} className="pr-[3px]">
                                    <button className="default-btn wallet-button">
                                        <SvgSteam></SvgSteam>STEAM
                                    </button>
                                </Col>
                                <Col xs={6} md={6} className="pl-[3px]">
                                    <button className="default-btn wallet-button">
                                        <SvgTwitch></SvgTwitch>TWITCH
                                    </button>
                                </Col>
                            </Row>
                            <Row className="pt-[8px]">
                                <Col xs={6} md={6} className="pr-[3px]">
                                    <button className="default-btn wallet-button">
                                        <SvgMetamask></SvgMetamask>
                                        METAMASk
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} sm={12} className="register-modal-img flex flex-col justify-between">
                            <Row>
                                <Col>
                                    <Row>
                                        <Col className="flex justify-end">
                                            <div className="pt-3" onClick={() => props.setModalShow(false)}>
                                                <SvgClose></SvgClose>
                                            </div>
                                            {/* <button type="button" onClick={() => props.setModalShow(false)} className="modal-close-btn" aria-label="Close"></button> */}
                                        </Col>
                                    </Row>
                                    <Row className="pt-[5px] justify-content-md-center">
                                        <Col sm={12} md={6}>
                                            <Row className="sm:justify-center">
                                                <img src={logo} alt="Logo" className="md: logo-img-login-modal"/>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="text-center text-lg">
                                        <p className="">
                                        The World's First NFT Casino
                                        </p>      
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="text-center text-sm pb-[15px]">
                                <Col>
                                    <p>
                                        By accessing the site, I attest that I am at least 18 years old and have read the Terms & Conditions.
                                    </p>
                                    <br></br>
                                    <p>
                                        I also acknowledge understanding that our Crypto Trading is not gambling, and therefore not covered by our gaming license.
                                    </p> 
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
  
export default FormLogin;
  