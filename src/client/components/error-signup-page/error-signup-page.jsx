import React, { Component } from 'react';

export default class ErrorSignupPage extends Component {
  render() {
    return (
      <div>
        <p>Что-то пошло не так :(</p>
        <p>Такой пользователь уже зарегистрирован</p>
        <p>Пожалуйста, попробуйте ещё раз.</p>
      </div>
    );
  }
}
