import React, { Component } from 'react';
import './profile-page.css';
import {
  Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap';
import Type from 'prop-types';
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
      links: [
        'hdsfhsdkjjjfkjkjsfd',
        'hdsfhsdkjjjfkjkjsfd',
        'hdsfhsdkjjjfkjkjsfd'
      ],
      newLink: ''
    };
  }

  static propTypes = {
    appName: Type.string,
    name: Type.string,
    discription: Type.string,
    work: Type.string,
    links: Type.array
  };

  static defaultProps = {
    appName: 'nice appname',
    name: 'Александр Евгеньевич Вайнер',
    discription: '«Саня, верни сотку» относится к категории абстрактных мемов, за которыми практически нет никакого смысла (так же, как мемы «Чечня круто», «Ало вы шо ебобо» и другие).',
    work: 'Звезда смерти',
    links: [
      'hdsfhsdkjjjfkjkjsfd',
      'hdsfhsdkjjjfkjkjsfd',
      'hdsfhsdkjjjfkjkjsfd'
    ]
  };

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

  addNewLink() {
    const { newLink, links } = this.state;
    if (newLink !== '') {
      links.push(newLink);
      this.setState({ links, showLink: false, newLink: '' });
    } else {
      this.setState({ showLink: false });
    }
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

  deleteLink = (link) => {
    const { links } = this.state;
    const numberOfLink = links.indexOf(link);
    links.splice(numberOfLink, 1);
    this.setState({ links });
  }


  render() {
    const {
      name,
      discription,
      work
    } = this.props;
    return (
      <div className='profile-page'>
        <div className='content'>
          <div className='sidebar'>
            <img src={ avatar } className='avatar' />
            <div className='buttonSend'>
              <Button bsStyle="primary">Отправить сообщение</Button>
            </div>
          </div>
          <div className='name'>
            <h3 >{ name }</h3>
            <div className='role'>
              <p className='whatRole'>Роль:</p>
              <p className='isRole'>Студент</p>
            </div>
            <div className='role'>
              <p className='whatRole'>О себе:</p>
              <p className='isRole'>
                { discription }
              </p>
            </div>
            <div className='role'>
              <p className='whatRole'>Место работы:</p>
              <p className='isRole'>{ work }</p>
            </div>
            <div className='role'>
              <p className='whatRole'>Ссылки:</p>
              <p className='isRole'>
              {
                this.state.links.map(elem => <p>
                    <a href={elem}>{elem}</a>
                    <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={ () => { this.deleteLink(elem); } }
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
            onHide={ this.handleCloseChange }>
              <Modal.Body>
                <FormProfilePage
                discription={ discription }
                work={ work }
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
}
