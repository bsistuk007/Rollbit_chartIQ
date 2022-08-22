import React, {useState, useEffect} from "react";
import { Modal, Container, Row, Col } from 'react-bootstrap';
// import { ProgressBar } from "react-toastify/dist/components";
import SvgClose from "../Svg/svgclose";
import ProgressBar from "./progressbar";


function IpRestrictModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        setTimeout(()=>{
            props.setIpModalShow(false)
        }, 10000)
    }, [])

    return (
        <Modal className="" show={props.show} onHide={handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className="show-grid pt-4 pb-2">
                <Container>
                    <Row >
                        <Col className="flex justify-end">
                            <div className="modal-close" onClick={() => props.setIpModalShow(false)}>
                                <SvgClose ></SvgClose>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="text-[16px] italic">
                            ACCESS RESTRICTED
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-[#B1B6C6]">
                            Due to licensing restrictions, we're unable to serve players from your country. If you're using a VPN, please deactivate it and try again.
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                           <ProgressBar></ProgressBar>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
  
export default IpRestrictModal;
  