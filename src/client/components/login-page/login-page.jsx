import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { push } from 'connected-react-router';
// import connect from 'react-redux/es/connect/connect';
// import Type from 'prop-types';
// import { PAGES } from '../../routes/pages';
// import {
//   postLoginStartAC,
//   postLoginSuccessAC,
//   postLoginErrorAC
// } from '../../redux/actions/login-actions';
//
// const mapDispatchToProps = dispatch => bindActionCreators({
//   doRoute: push,
//   postLoginStart: postLoginStartAC,
//   postLoginSuccess: postLoginSuccessAC,
//   postLoginError: postLoginErrorAC
// }, dispatch);
import {
  Col, Form, FormGroup, FormControl, Button, ControlLabel
} from 'react-bootstrap';
import './login-page.css';

//
export default class LoginPage extends Component {
//   static propTypes = {
//     doRoute: Type.func,
//     postLoginStart: Type.func,
//     postLoginSuccess: Type.func,
//     postLoginError: Type.func
//   };
//
//   static defaultProps = {
//   };
//
//   state = {
//     login: ''
//   };
//
//   handleLoginChange = (e) => {
//     this.setState({ login: e.target.value });
//   };
//
//   handleLogIn = async () => {
//     const {
//       postLoginError,
//       postLoginStart,
//       postLoginSuccess,
//       doRoute
//     } = this.props;
//     try {
//       postLoginStart();
//       const user = await fetch(PAGES.API.postLogin.path, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json; charset=utf-8'
//         },
//         body: JSON.stringify({
//           login: this.state.login
//         })
//       });
//       const userJson = await user.json();
//       console.log('userJson', userJson);
//       postLoginSuccess(userJson);
//       doRoute(PAGES.home.path);
//     } catch (e) {
//       console.error(e);
//       postLoginError();
//     }
//   };
//
  render() {
    console.log('state', this.state);
    return (
        <Col className='login-page'>
        <Form horizontal>
            <ControlLabel>Войти на сайт</ControlLabel>
            <FormGroup controlId="formHorizontalEmail" className="form-info">
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
                    <Button type="submit" bsStyle="primary">Войти</Button>
                </Col>
            </FormGroup>
        </Form>
        </Col>
    // {/*<Col className='login-page'>*/}
    //   {/*<h1>Войти на сайт</h1>*/}
    //   {/*<input onChange={ this.handleLoginChange } />*/}
    //   {/*<button onClick={ this.handleLogIn }>Log In</button>*/}
    // {/*</Col>*/}
    );
  }
}
//
// const VisibleLoginPage = connect(
//   null,
//   mapDispatchToProps
// )(LoginPage);
// export default VisibleLoginPage;
