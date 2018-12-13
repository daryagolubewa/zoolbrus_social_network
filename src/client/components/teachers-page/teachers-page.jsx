import React, { Component } from 'react';
import {
  Col, Panel, ListGroup, ListGroupItem, Image, Button
} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { PAGES } from '../../routes/pages';
import connect from 'react-redux/es/connect/connect';
import { showTeachersListSuccessAC } from '../../redux/actions/teachers-action';
import { selectTeachersList } from '../../redux/selectors/teachers-selector';
import './teachers-page.css';
import noavatar from '../../public/images/noavatar.png';


const mapStateToProps = state => ({
  teachersList: selectTeachersList(state)
});

const mapDispatchToProps = dispatch => ({
  showTeachersListSuccess: teachers => dispatch(showTeachersListSuccessAC(teachers))
});

class TeachersPage extends Component {
  // state = {
  //   teachers: [ ]};

  async componentDidMount() {
    const { showTeachersListSuccess } = this.props;
    const res = await fetch('http://localhost:3000/api/users/teachers', {
      method: 'POST',
      headers: { },
      body: { }
    });
    if (res.status === 200) {
      const teachersList = await res.json();
      showTeachersListSuccess(teachersList);
    }
  }

  render() {
    return (
      <div className="teacher-page" >
        <h1>Наши преподаватели </h1>
        { this.props.teachersList.map(teacherInfo => (
            <div className="teacher-mini-profile" key={ teacherInfo.id } >
            <div className="teacher-mini-picture">
              <Image src={ noavatar } circle className="teacher-mini-profile-pic"/>
            </div>
            <div>
              <Col lg={11} md={4} sm={2} className="teacher-post-block">
                <Panel bsStyle="default">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3" className="teacher-user-name">
                      {/* <Link to={'/users/:id'}> */}
                      {/* <Image src={danya} circle className="mini-profile-pic"/> */}
                      {/* Даниил Капустин */}
                      { teacherInfo.name }
                      {/* </Link> */}
                    </Panel.Title>
                  </Panel.Heading>
                  <ListGroup>
                    <ListGroupItem bsStyle="success" className="teacher-user-role">  { teacherInfo.role } </ListGroupItem>
                  </ListGroup>
                  <Panel.Body className="teacher-user-description">  { teacherInfo.description }
                  </Panel.Body>
                  <ListGroup>
                    <ListGroupItem className="teacher-connect-button">
                      <Button bsStyle="primary" className="button-connect">Отправить сообщение</Button>
                    </ListGroupItem>
                  </ListGroup>
                </Panel>
              </Col>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const TeachersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeachersPage);
export default TeachersList;
