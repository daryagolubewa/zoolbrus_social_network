import React, { Component } from 'react';
import './profile-page.css';
import {
  Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap';
// import Type from "prop-types";
import ChangeProfile from './change-profile-page';
import noavatar from '../../public/images/noavatar.png';
import { selectLoginUser } from '../../redux/selectors/login-selectors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import {
  postLoginStartAC,
  postLoginSuccessAC,
  postLoginErrorAC
} from '../../redux/actions/login-actions';




const mapStateToProps = state => ({
  login: selectLoginUser(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  doRoute: push,
  postLoginStart: postLoginStartAC,
  postLoginSuccess: postLoginSuccessAC,
  postLoginError: postLoginErrorAC
}, dispatch);

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

class Profile extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShowChange = this.handleShowChange.bind(this);
    this.handleCloseChange = this.handleCloseChange.bind(this);
    this.handleShowLink = this.handleShowLink.bind(this);
    this.addNewLink = this.addNewLink.bind(this);

    this.state = {
      showChange: false,
      showLink: false,
      avatar: '',
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
          id: this.props.login._id,
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
        id: this.props.login._id,
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
        body: JSON.stringify({ id: this.props.login._id })
      });
      const fullRes = await res.json();
      console.log(fullRes)
      this.setState({
        avatar: fullRes.userProfile.avatar,
        email: fullRes.userProfile.email,
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

  changediscription = (discription) => {
    this.setState({ discription });
  }

  render() {
    // console.log(this.state.avatar)
    return (
      <div className="profile-page">
        <div className="content">
          <div className="sidebar">
            <img src={ noavatar } className="avatar" />
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
              <div className="isRole">
              {
                this.state.links.map(elem => 
                  <div className="profile-page__link">
                    <a href={elem} className="profile-page__view-link">{elem}</a>
                    <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={ () => { this.deleteLink(elem); } }
                    className="delete-link-button"
                    >
                      X
                    </Button>
                  </div>
                )
              }
              { this.renderAddLink() }
              { this.renderAddLinkButton() }
              </div>
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
                <ChangeProfile
                show={ this.handleCloseChange }
                discription={ this.state.discription }
                company={ this.state.company }
                changeCompany={ this.changeCompany }
                changeDiscription={ this.changeDiscription}
                />
              </Modal.Body>
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
          className="profile-page__link-button"
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

const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
export default ProfilePage;