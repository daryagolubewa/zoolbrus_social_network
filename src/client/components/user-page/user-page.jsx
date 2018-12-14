import React, { Component } from 'react';
import './user-page.css';
import {
  Button, FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap';
import avatar from '../../public/images/noavatar.png';

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

export default class UserPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShowChange = this.handleShowChange.bind(this);
    this.addNewRole = this.addNewRole.bind(this)

    this.state = {
      showChange: false,
      links: [],
      appName: '',
      name: '',
      discription: '',
      company: '',
      newRole: '',
      role: 'elbrus'
    };
  }

  handleShowChange() {
    this.setState({ showChange: true });
  }

  changeRole(e) {
    const newRole = e.target.value;
    console.log(newRole)
    this.setState({ newRole });
  }

  async addNewRole() {
    const { newRole, role } = this.state;
    if (newRole !== '') {
      const res = await fetch('/api/users/:id/changerole', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          email: 'yasha@lava.ru',
          role
        })
      });
      console.log(res)
      this.setState({ role, showChange: false, newRole: '' });
      return res;
    }
    return this.setState({ showChange: false });
  }

  

  async componentDidMount() {
    const fetchFunc = async () => {
      const res = await fetch('/api/users/:id', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email: 'yasha@lava.ru' })
      });
      const fullRes = await res.json();
      this.setState({
        email: 'yasha@lava.ru',
        links: fullRes.user.links,
        name: fullRes.user.name,
        discription: fullRes.user.discription,
        company: fullRes.user.company,
        role: fullRes.user.role
      });
      return res;
    };
    fetchFunc();
  }

  render() {
    return (
    <div className="profile-page">
      <div className="content">
        <div className="sidebar">
          <img src={ avatar } className="avatar" />
          <div className="buttonSend">
            <Button bsStyle="primary">Отправить сообщение</Button>
          </div>
        </div>
        <div className="name">
          <h3 >{ this.state.name }</h3>
          <div className="role">
            <p className="whatRole">Роль:</p>
            <p className="isRole">{ this.state.role }</p>
            { this.renderIsElbrus() }
          </div>
          <div className="role">
            <p className="whatRole">О себе:</p>
            <p className="isRole">
              { this.state.discription }
            </p>
          </div>
          <div className="role">
            <p className="whatRole">Место работы:</p>
            <p className="isRole">{ this.state.company }</p>
          </div>
          <div className="role">
            <p className="whatRole">Ссылки:</p>
            <p className="isRole">
            { this.state.links.map(elem => <p><a href={elem}>{elem}</a></p>) }
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  }

  renderIsElbrus() {
    if(this.state.role === 'elbrus') {
      if(!this.state.showChange){
        return (
          <Button 
          bsStyle="primary" 
          bsSize="small"
          onClick={this.handleShowChange}>Сменить роль</Button>
        )
      } else {
        return (
          <div>
            <FieldGroup
            id="formControlsFile"
            type="text"
            className="formLink"
            onChange={this.changeRole}
            />
            <Button
            onClick={this.addNewRole}
            bsStyle="primary"
            bsSize="small"
            >
              Сохранить
            </Button>
          </div>
        )
      }
    } else {
      return (<div></div>)
    }
  }
}
