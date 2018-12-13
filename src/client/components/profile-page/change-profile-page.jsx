import React, { Component } from 'react';
import './profile-page.css';
import {
  Button,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl
} from 'react-bootstrap';
import Type from 'prop-types';


function FieldGroup({
  id, label, help, ...props
}) {
  return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
  );
}


export default class FormProfilePage extends Component {
  static propTypes = {
    discription: Type.string,
    company: Type.string,
    links: Type.array
  };

  state = {
    discription: this.props.discription,
    company: this.props.company
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeProfile = async () => {
    const {
      discription,
      company
    } = this.state;
    let res = await fetch('/api/profile/change', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        email: 'yasha@lava.ru',
        discription,
        company
      })
    });
    res = await res.json();
    this.setState({ company: res });
  }

  render() {
    return (
      <div>
        <FieldGroup
        id="formControlsFile"
        type="file"
        label="Аватарка"
        help="Выберите аватарку"
        />

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Места работы</ControlLabel>
          <FormControl
          componentClass="textarea"
          placeholder="Введите ваши места работы"
          defaultValue={ this.state.company }
          name="company"
          onChange={ this.handleChange }
          />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>О себе</ControlLabel>
          <FormControl
          componentClass="textarea"
          placeholder="Введите информацию о себе"
          defaultValue={this.state.discription}
          name="discription"
          onChange={ this.handleChange }
          />
        </FormGroup>

        <Button
        type="submit"
        onClick={ () => {
          this.changeProfile();
          this.props.show();
          this.props.changeCompany(this.state.company);
          this.props.changeDiscription();
        }
        }>
          Сохранить изменения
        </Button>
      </div>
    );
  }
}
