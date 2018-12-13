import React, { Component } from 'react';
import './profile-page.css';
import {
  Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap';
// import Type from "prop-types";
import FormProfilePage from './change-profile-page';
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

export default class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShowChange = this.handleShowChange.bind(this);
    this.handleCloseChange = this.handleCloseChange.bind(this);
    this.handleShowLink = this.handleShowLink.bind(this);
    this.addNewLink = this.addNewLink.bind(this);

    this.state = {
      showChange: false,
      showLink: false,
      links: [],
      appName: '',
      name: '',
      discription: '',
      company: '',
      newLink: ''
    };
  }

  handleCloseChange() {
    this.setState({ showChange: false });
  }

  handleShowChange() {
    this.setState({ showChange: true });
  }

  handleShowLink() {
    this.setState({ showLink: true });
  }

  addFormLink = (e) => {
    const newLink = e.target.value;
    this.setState({ newLink });
  }

  async addNewLink() {
    const { newLink, links } = this.state;
    if (newLink !== '') {
      links.push(newLink);
      const res = await fetch('/api/profile/addlink', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          email: 'yasha@lava.ru',
          links
        })
      });
      this.setState({ links, showLink: false, newLink: '' });
      return res;
    }
    return this.setState({ showLink: false });
  }

  deleteLink = async (link) => {
    const { links } = this.state;
    const numberOfLink = links.indexOf(link);
    links.splice(numberOfLink, 1);
    const res = await fetch('/api/profile/deletelink', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        email: 'yasha@lava.ru',
        newLinks: links
      })
    });

    this.setState({ links });
    return res;
  }

  async componentDidMount() {
    const fetchFunc = async () => {
      const res = await fetch('/api/profile', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email: 'yasha@lava.ru' })
      });
      const fullRes = await res.json();
      this.setState({
        email: 'yasha@lava.ru',
        links: fullRes.userProfile.links,
        name: fullRes.userProfile.name,
        discription: fullRes.userProfile.discription,
        company: fullRes.userProfile.company,
        role: fullRes.userProfile.role
      });
      return res;
    };
    fetchFunc();
  }

  changeCompany = (company) => {
    this.setState({ company });
  }

  changeDiscription = (discription) => {
    this.setState({ discription });
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
              {
                this.state.links.map(elem => <p>
                    <a href={elem}>{elem}</a>
                    <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={ () => { this.deleteLink(elem); } }
                    className="delete-link-button"
                    >
                      X
                    </Button>
                  </p>)
              }
              { this.renderAddLink() }
              { this.renderAddLinkButton() }
              </p>
            </div>
          </div>
          <div>
            <Button
            bsStyle="primary"
            bsSize="small"
            onClick={ this.handleShowChange }
            >
              Редактировать профиль
            </Button>

            <Modal
            show={ this.state.showChange }
            onHide={ this.handleCloseChange }
            className="chage-profile-form"
            >
              <Modal.Body>
                <FormProfilePage
                show={ this.handleCloseChange }
                discription={ this.state.discription }
                company={ this.state.company }
                changeCompany={ this.changeCompany }
                changeDiscription={ this.changeDiscription}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={ this.handleCloseChange }>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }

  renderAddLink() {
    if (this.state.showLink) {
      return (
        <div>
          <FieldGroup
          id="formControlsFile"
          type="text"
          className="formLink"
          onChange={this.addFormLink}
          />
          <Button
          onClick={this.addNewLink}
          bsStyle="primary"
          bsSize="small"
          >
            Добавить новую ссылку
          </Button>
        </div>
      );
    }
    return (
      <div></div>
    );
  }

  renderAddLinkButton() {
    if (this.state.showLink === false) {
      return (
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.handleShowLink}
        >
            Добавить ссылку
        </Button>
      );
    }
    return (
      <div></div>
    );
  }
}
