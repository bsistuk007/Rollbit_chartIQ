
import React, {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Content from './content.js';
import Lists from './lists.js';

function AccountLayout() {
    const [register, setRegister] = useState(false)

    // useEffect(() => {
    //     //componentWillmount
    // }, [])

    return (
        <Container className='pl-[20px]' fluid>
            <Row className='mt-8'>
                <Col md={3} lg={2} className="hidden text-left md:block ">
                    <Lists></Lists>
                </Col>
                <Col md={8} sm={10} xs={12} className="pl-5">
                    <Content></Content>
                </Col>
            </Row>
        </Container>
        // <div className='flex'>
        //     <List></List>
        //     <Content></Content>
        // </div>
    );
}
  
export default AccountLayout;
  