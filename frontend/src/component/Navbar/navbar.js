
import React, { useState } from 'react';

import FormLogin from '../FormLogin/formlogin';
import {useDispatch, useSelector } from 'react-redux';
import MainDropDown from './maindropdown';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from '../Logo/logo';
import Balance from './balance';
// import Cashier from './cashier';
import CashierModal from './cashiermodal';
// import SvgProfile from '../Svg/svgprofile';
import SvgCashier from '../Svg/svgcashier';

function Navbar() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [register, setRegister] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [login, setLogin] = useState(false);
    const [cashierModalShow, setCashierModalShow] = useState(false);
    const authLocalFlag = localStorage.getItem('loginFlag');


    return (
        <>
            <FormLogin show={modalShow} register={register} setRegister={setRegister} setModalShow={setModalShow} />
            <CashierModal show={cashierModalShow} setCashierModalShow={setCashierModalShow} />

            <Container fluid>
                {userInfo ? (
                    <Row className='navbar-font'>
                        <Col md={4} sm={4} xs={4}>
                            <Logo></Logo>
                        </Col>
                        <Col md={4} sm={1} xs={1} className="flex justify-end md:justify-center">
                            {/* <div className='pt-3 flex'> */}
                            <div className='pt-3 hidden md:flex'>
                                <Balance></Balance>
                                <div className='hidden md:block'>
                                    <button className="default-btn yellow-btn tracking-normal" onClick={() => {setCashierModalShow(true);}}>CASHIER</button>
                                </div>
                                {/* <button>
                                    <SvgProfile></SvgProfile>
                                </button> */}
                            </div>
                        </Col>

                        <Col md={4} sm={1} xs={1} className="hidden md:block">
                            <div className='flex float-right pt-3'>
                                <MainDropDown type='normal'></MainDropDown>
                            </div>
                        </Col>
                        <Col sm={7} xs={7} className="pt-3 flex justify-end md:hidden">
                            <Balance></Balance>
                            <button className='svg-button mx-1' onClick={() => {setCashierModalShow(true);}}>
                                <SvgCashier width={20}>
                                </SvgCashier>
                            </button>
                            <MainDropDown type='small'></MainDropDown>
                            {/* <button className='svg-button ml-2'>
                                <SvgProfile width={20}></SvgProfile>
                            </button> */}

                        </Col>

                    </Row>
                ) : (
                    <Row>
                        <Col md={4} sm={4} xs={4}>
                            <Logo></Logo>
                        </Col>
                        <Col md={8} sm={8} xs={8} className="flex float-right pt-3 justify-end">
                            <div>
                                <button className="default-btn transparent-btn" onClick={() => {setModalShow(true); setRegister(false)}}>LOGIN</button>
                            </div>
                            <div>
                                <button className="default-btn yellow-btn" onClick={() => {setModalShow(true); setRegister(true)}}>REGISTER</button>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
            {/* <div className="text-sm md:text-base">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
                        <div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    </div>
                </div>
            </div> */}
      </>
    );
}
  
export default Navbar;
  