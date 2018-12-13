import React, { Component } from 'react';
import './user-page.css';
import { Button } from 'react-bootstrap';
import avatar from '../../public/images/noavatar.png';


export default class UserPage extends Component {
    state = {
      showChange: false,
      showLink: false,
      links: [],
      appName: '',
      name: '',
      discription: '',
      company: '',
      newLink: ''
    };

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
}
