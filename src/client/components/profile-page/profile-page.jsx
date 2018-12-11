import React, { Component } from 'react';
import './profile-page.css';
import { Button, Modal } from 'react-bootstrap';
import FormProfilePage from './change-profile-page';
import avatar from '../../public/images/noavatar.png';

export default class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  changeDiscription = () => {

  }

  discription = () => (
    <div>
      <p>«Саня, верни сотку» относится к
        категории абстрактных мемов, за
        которыми практически нет никакого
        смысла (так же, как мемы «Чечня
        круто», «Ало вы шо ебобо» и другие).
        </p>
      <p>Эту надпись, сделанную шрифтом
        «Лобстер», чаще всего помещают на
        картинки с изображением публичных
        людей или животных. Другие варианты:
        «Саня, где сотка», «Сань, верни сотку», «Когда Саня не вернул сотку».
        </p>
      <p>Часто под эту фразу подбираются
        картинки, на которых кто-то за
        кем-то гонится или обращается
        с вопросом.
        </p>
    </div>
  )

  render() {
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
            <h1 >Александр Евгеньевич Вайнер</h1>
            <div className='role'>
              <h3 className='whatRole'>Роль:</h3>
              <h3 className='isRole'>Студент</h3>
            </div>
            <div className='role'>
              <h3 className='whatRole'>Телефон:</h3>
              <h3 className='isRole'>89247011170</h3>
            </div>
            <div className='role'>
              <h3 className='whatRole'>О себе:</h3>
              <h3 className='isRole'>
                {this.discription()}
              </h3>
            </div>
            <div className='role'>
              <h3 className='whatRole'>Место работы:</h3>
              <h3 className='isRole'>Звезда смерти</h3>
            </div>
            <div className='role'>
              <h3 className='whatRole'>Ссылки:</h3>
              <h3 className='isRole'><ul>
                <li>hdsfhsdkjjjfkjkjsfd</li>
                <li>klsajlkfasaslksflksamdf</li>
                <li>nsdklkdljsngjdsngkj</li>
              </ul></h3>
            </div>
          </div>
          <div>
            <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>Редактировать профиль</Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
                <FormProfilePage />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
