import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import connect from 'react-redux/es/connect/connect';
import Type from 'prop-types';
import { PAGES } from '../../routes/pages';
import {
  postLoginStartAC,
  postLoginSuccessAC,
  postLoginErrorAC
} from '../../redux/actions/login-actions';

const mapDispatchToProps = dispatch => bindActionCreators({
  doRoute: push,
  postLoginStart: postLoginStartAC,
  postLoginSuccess: postLoginSuccessAC,
  postLoginError: postLoginErrorAC
}, dispatch);

class LoginPage extends Component {
  static propTypes = {
    doRoute: Type.func,
    postLoginStart: Type.func,
    postLoginSuccess: Type.func,
    postLoginError: Type.func
  };

  static defaultProps = {
  };

  state = {
    login: ''
  };

  handleLoginChange = (e) => {
    this.setState({ login: e.target.value });
  };

  handleLogIn = async () => {
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
          login: this.state.login
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
    console.log('state', this.state);
    return (
      <div className='info-page'>
        <h1>Login Page</h1>
        <input onChange={ this.handleLoginChange } />
        <button onClick={ this.handleLogIn }>Log In</button>
      </div>
    );
  }
}

const VisibleLoginPage = connect(
  null,
  mapDispatchToProps
)(LoginPage);
export default VisibleLoginPage;
