import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import connect from 'react-redux/es/connect/connect';
import Type from 'prop-types';
import {
  Col, Form, FormGroup, FormControl, Button, ControlLabel, Row
} from 'react-bootstrap';
import { PAGES } from '../../routes/pages';
import {
  postLoginStartAC,
  postLoginSuccessAC,
  postLoginErrorAC
} from '../../redux/actions/login-actions';
import './login-page.css';

const mapDispatchToProps = dispatch => bindActionCreators({
  doRoute: push,
  postLoginStart: postLoginStartAC,
  postLoginSuccess: postLoginSuccessAC,
  postLoginError: postLoginErrorAC
}, dispatch);


class LoginPage extends Component {
  static propTypes = {
    doRoute: Type.func.isRequired,
    postLoginStart: Type.func.isRequired,
    postLoginSuccess: Type.func.isRequired,
    postLoginError: Type.func.isRequired
  };

  static defaultProps = {};

  state = {
    email: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const {
      postLoginError,
      postLoginStart,
      postLoginSuccess,
      doRoute
    } = this.props;
    try {
      postLoginStart();
      const user = await fetch(PAGES.API.postLogin.path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });
      const userJson = await user.json();
      console.log('userJson', userJson);
      postLoginSuccess(userJson);
      doRoute(PAGES.home.path);
    } catch (e) {
      console.error(e);
      postLoginError();
    }
  };

  render() {
    // console.log('state', this.state);
    return (
      <div className='login-page'>
        <Row className="show-grid">
          <h2>Login Page</h2>
        </Row>
        <Row className="show-grid">
          <Form horizontal>
            <FormGroup className="form-info">
            </FormGroup>
            <FormGroup className="form-info">
              <Col componentClass={ControlLabel} lg={2}>Email</Col>
              <Col lg={4}>
                <FormControl
                  name='email'
                  type='email'
                  placeholder='Введите email'
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} lg={2}>Password</Col>
              <Col lg={4}>
                <FormControl
                  name='password'
                  type='password'
                  placeholder='Введите пароль'
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col lgOffset={2} lg={4}>
                <Button type='submit' bsStyle='primary' onClick={this.handleLogin}>Войти</Button>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </div>
    );
  }
}

const VisibleLoginPage = connect(
  null,
  mapDispatchToProps
)(LoginPage);
export default VisibleLoginPage;
