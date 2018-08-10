import React from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './admin.less'
export default class Admin extends React.Component{

    render(){
        return (
            <Row className="container">
                <Col span="4" className="nav-left">
                    <NavLeft>NavLeft</NavLeft>
                </Col>
                <Col span="20" className="main">
                    <Header>Header</Header>
                    <Row className="content">
                        Content
                    </Row>
                    <Footer>Footer</Footer>
                </Col>
            </Row>
        );
    }
}