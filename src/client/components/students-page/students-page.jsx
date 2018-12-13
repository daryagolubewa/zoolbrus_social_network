import React, { Component } from 'react';
import {
  Col, Panel, ListGroup, ListGroupItem, Image, Button
} from 'react-bootstrap';
import './students-page.css';
import noavatar from '../../public/images/noavatar.png';

export default class StudentsPage extends Component {
  render() {
    return (
            <div className='students-page'>
                <h1>Наши студенты </h1>
                <div className="student-mini-profile row">
                  <div className="student-mini-picture col-lg-3">
                    <Image src={ noavatar } circle className="student-mini-profile-pic"/>
                  </div>
                  <div className="student-mini-info">
                    <Col lg={7} className="student-post-block">
                      <Panel bsStyle="default">
                        <Panel.Heading>
                          <Panel.Title componentClass="h3" className="student-user-name">
                            {/* <Link to={'/users/:id'}> */}
                            {/* <Image src={danya} circle className="mini-profile-pic"/> */}
                            Василий Иванов
                            {/* </Link> */}
                          </Panel.Title>
                        </Panel.Heading>
                        <ListGroup>
                          <ListGroupItem bsStyle="success" className="student-user-role"> Студент Elbrus Coding
                            Bootcamp</ListGroupItem>
                        </ListGroup>
                        <Panel.Body className="student-user-description" > С детства мечтал стать программистом,
                          но родители были против, поэтому сначала выучился на повара.
                          Но так как мечта сильнее суровой реальности, теперь учится программировать
                          в школе Elbrus.
                        </Panel.Body>
                        <ListGroup>
                          <ListGroupItem className="student-connect-button">
                            <Button bsStyle="primary" className="button-connect">Отправить сообщение</Button>
                          </ListGroupItem>
                        </ListGroup>
                      </Panel>
                    </Col>
                  </div>
                </div>
            </div>
    );
  }
}
