import React, { useState } from "react";

import { Container, Row, Col } from 'react-bootstrap';
import Lists from '../lists.js';

const AccountPageLayout = ({children}) => {
    const [register, setRegister] = useState(false)

    return (
        <Container className='pl-[20px]' fluid>
            <Row className='mt-8'>
                <Col md={3} lg={2} className="hidden text-left md:block ">
                    <Lists></Lists>
                </Col>
                <Col md={8} sm={10} xs={12} className="pl-5">
                    <div className='text-lg ml-2'>
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountPageLayout;