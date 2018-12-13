import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import connect from 'react-redux/es/connect/connect';
import Type from 'prop-types';
import {
  Col, Form, FormGroup, FormControl, Button, ControlLabel
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
      postLoginSuccess(userJson);
      doRoute(PAGES.home.path);
    } catch (e) {
      postLoginError();
    }
  };

  render() {
    return (
      <div className='login-page'>
          <Form horizontal>
            <ControlLabel>Введите данные для входа</ControlLabel>
            <FormGroup className="form-info">
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
                <Button type="submit" bsStyle="primary" onClick={this.handleLogin}>Войти</Button>
              </Col>
            </FormGroup>
          </Form>
      </div>
    );
  }
}

const VisibleLoginPage = connect(
  null,
  mapDispatchToProps
)(LoginPage);
export default VisibleLoginPage;
