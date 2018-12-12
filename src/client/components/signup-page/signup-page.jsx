import React, { Component } from 'react';
import {
  Col, Form, FormGroup, FormControl, Button, ControlLabel
} from 'react-bootstrap';
import ErrorSignupPage from '../error-signup-page/error-signup-page';
import './signup-page.css';

export default class SignupPage extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    show: true
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


handleClick = async (e) => {
  e.preventDefault();
  const userName = this.state.name;
  const userEmail = this.state.email;
  const userPass = this.state.password;
  const res = await fetch('/api/users/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ name: userName, email: userEmail, password: userPass })
  });

  // const user = await res.text();
  if (res.status === 200) {
    window.location.replace('/');
  } else {
    this.setState({ show: false });
  }
}


showForm = () => {
  if (this.state.show) {
    return (
        <div>
          <Form horizontal>
            <ControlLabel>Введите данные для регистрации</ControlLabel>
            <FormGroup className="form-info">
              <Col sm={2}>
                ФИО
              </Col>
              <Col md={7}>
                <FormControl type="name" name="name" placeholder="Введите полное имя" onChange={ this.handleChange } />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col lg={2}>
                Email
              </Col>
              <Col md={4}>
                <FormControl type="email" name="email" placeholder="Введите email" onChange={ this.handleChange } />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col sm={2}>
                Password
              </Col>
              <Col md={4}>
                <FormControl type="password" name="password" placeholder="Введите пароль" onChange={ this.handleChange } />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit" bsStyle="primary" onClick={ this.handleClick }>Зарегистрироваться</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
    );
  }

  return (
        <div>
          <ErrorSignupPage />
        </div>
  );
}

render() {
  console.log(this.state);
  return (
            <Col className="signup-page">
              { this.showForm() }
            </Col>
  );
}
}
