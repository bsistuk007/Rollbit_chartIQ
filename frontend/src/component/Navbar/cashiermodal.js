import React, {useState, useEffect} from "react";
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import CashierContent from "../Cashier/cashiercontent";
import CashierType from "../Cashier/cashiertype";
import SvgClose from "../Svg/svgclose";


function CashierModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <Modal className="min-w-full" show={props.show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className="show-grid modal-body pt-4 pb-5">
                <Container fluid>
                    <Row >
                        <Col className="flex justify-end">
                            <div className="modal-close" onClick={() => props.setCashierModalShow(false)}>
                                <SvgClose ></SvgClose>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CashierType></CashierType>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CashierContent></CashierContent>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
  
export default CashierModal;
  