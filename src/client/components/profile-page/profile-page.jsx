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
    this.handleCloseLink = this.handleCloseLink.bind(this);

    this.state = {
      showChange: false,
      showLink: false,
      links: [
        'hdsfhsdkjjjfkjkjsfd',
        'hdsfhsdkjjjfkjkjsfd',
        'hdsfhsdkjjjfkjkjsfd'
      ]
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

  handleCloseLink() {
    this.setState({ showLink: false });
  }

  handleShowLink() {
    this.setState({ showLink: true });
  }

  changeDiscription = () => {

  }

  addLink = (e) => {
    const newLink = e.target.value;
    // console.log(newLink);
    const allLinks = this.state.links.push(newLink);
    this.setState({ links: allLinks });
  }


  render() {
    const {
      name,
      discription,
      work,
      links
    } = this.props;
    return (
      <div className='profile-page'>
        <div className='content'>
          <div className='sidebar'>
            <img src={avatar} className='avatar' />
            <div className='buttonSend'>
              <Button bsStyle="primary">Отправить сообщение</Button>
            </div>
          </div>
          <div className='name'>
            <h1 >{name}</h1>
            <div className='role'>
              <h3 className='whatRole'>Роль:</h3>
              <h3 className='isRole'>Студент</h3>
            </div>
            <div className='role'>
              <h3 className='whatRole'>О себе:</h3>
              <h3 className='isRole'>
                {discription}
              </h3>
            </div>
            <div className='role'>
              <h3 className='whatRole'>Место работы:</h3>
              <h3 className='isRole'>{work}</h3>
            </div>
            <div className='role'>
              <h3 className='whatRole'>Ссылки:</h3>
              <h3 className='isRole'><ul>
                { links.map(elem => <li><a href={elem}>{elem}</a></li>) }
              </ul>
              <Button
              bsStyle="primary"
              onClick={this.handleShowLink}>
                Добавить ссылку
              </Button>
              <Modal
              show={this.state.showLink}
              onHide={this.handleCloseLink}>
                <Modal.Body>
                  <FieldGroup
                      id="formControlsFile"
                      type="text"
                      label="Аватарка"
                      help="Выберите аватарку"
                      className="formLink"
                  />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    onClick={this.handleCloseLink}
                    bsStyle="primary"
                    onChange={this.addLink}>
                      Добавить новую ссылку
                    </Button>
                </Modal.Footer>
              </Modal>
              </h3>
            </div>
          </div>
          <div>
            <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.handleShowChange}>
              Редактировать профиль
            </Button>

            <Modal
            show={this.state.showChange}
            onHide={this.handleCloseChange}>
              <Modal.Body>
                <FormProfilePage
                name={name}
                discription={discription}
                work={work}
                links={links}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleCloseChange}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
