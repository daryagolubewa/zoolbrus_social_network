import React, { Component } from 'react';
import {
  Col, Form, FormGroup, FormControl, Button, ControlLabel
} from 'react-bootstrap';
import './signup-page.css';

export default class SignupPage extends Component {
  render() {
    return (
            <Col className="signup-page">
                <Form horizontal>
                    <ControlLabel>Введите данные для регистрации</ControlLabel>
                    <FormGroup controlId="formHorizontalEmail" className="form-info">
                        <Col sm={2}>
                           ФИО
                        </Col>
                        <Col md={7}>
                            <FormControl type="email" placeholder="Введите полное имя"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col lg={2}>
                            Email
                        </Col>
                        <Col md={4}>
                            <FormControl type="email" placeholder="Введите email"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col sm={2}>
                            Password
                        </Col>
                        <Col md={4}>
                            <FormControl type="password" placeholder="Введите пароль"/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" bsStyle="primary">Зарегистрироваться</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
    );
  }
}
