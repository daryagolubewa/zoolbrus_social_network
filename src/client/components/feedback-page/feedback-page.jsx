import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import './feedback-page.css';

export default class FeedbackPage extends Component {
  state = {
    email: '',
    message: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendEmail = async () => {
    const {
      email,
      message
    } = this.state;
    const res = await fetch('/api/feedback', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        email,
        message
      })
    });
    if (res.status === 200) {
      this.setState({ email: '', message: '' });
      window.location.replace('/');
    } else {
      alert('Введите правильно ваш почтовый адрес.');
    }
  }

  render() {
    return (
      <div className='feedback-page'>
        <h1 className="title">Обратная связь</h1>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Почтовый адрес</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>@</InputGroup.Addon>
            <FormControl
            type="email"
            name="email"
            placeholder="Введите ваш почтовый адрес"
            name="email"
            onChange={ this.handleChange }
            />
          </InputGroup>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Текст письма</ControlLabel>
          <FormControl
          componentClass="textarea"
          placeholder="Введите информацию о себе"
          name="message"
          onChange={ this.handleChange }
          />
        </FormGroup>

        <Button
        type="submit"
        onClick={ this.sendEmail }>
          Отправить
        </Button>
      </div>
    );
  }
}
