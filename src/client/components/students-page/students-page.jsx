import React, { Component } from 'react';
import {
  Col, Panel, ListGroup, ListGroupItem, Image, Button
} from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import { showStudentsListSuccessAC } from '../../redux/actions/students-action';
import { selectStudentsList } from '../../redux/selectors/students-selector';
import './students-page.css';
import noavatar from '../../public/images/noavatar.png';
import { PAGES } from '../../routes/pages';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';



const mapStateToProps = state => ({
  studentsList: selectStudentsList(state)
});

const mapDispatchToProps = dispatch => ({
  showStudentsListSuccess: students => dispatch(showStudentsListSuccessAC(students))
});

class StudentsPage extends Component {
  // state = {
  //   students: [ ]};
  // async seed () {
  //   res = await fetch('/api/seed')
  //   console.log(res)
  // }

  async componentDidMount() {
    const { showStudentsListSuccess } = this.props;
    const res = await fetch('/api/users/students')
  //     method: 'POST',
  //     headers: { },
  //     body: { }
  //   });
    if (res.status === 200) {
      const studentsList = await res.json();
      console.log(studentsList)
      showStudentsListSuccess(studentsList);
      console.log(studentsList)
    }
  }

  render() {
    return (
            <div className='students-page'>
                <h1>Наши студенты </h1>
                {/* <button onClick={this.seed}>asdsada</button> */}
              { this.props.studentsList.map(studentsInfo => (<div className="student-mini-profile row">
                  <div className="student-mini-picture col-lg-3">
                    <Image src={ studentsInfo.avatar } circle className="student-mini-profile-pic"/>
                  </div>
                  <div className="student-mini-info">
                    <Col lg={7} className="student-post-block">
                      <Panel bsStyle="default">
                        <Panel.Heading>
                          <Panel.Title componentClass="h3" className="student-user-name">
                            {/* <Link to={'/users/:id'}> */}
                            {/* <Image src={danya} circle className="mini-profile-pic"/> */}
                            <Link to={PAGES.users.user.call(studentsInfo._id)}>
                              { studentsInfo.name }
                            </Link>
                            {/* </Link> */}
                          </Panel.Title>
                        </Panel.Heading>
                        <ListGroup>
                          <ListGroupItem bsStyle="success" className="student-user-role">
                            { studentsInfo.role } </ListGroupItem>
                        </ListGroup>
                        <Panel.Body className="student-user-description" >
                          { studentsInfo.description }
                          { studentsInfo.company }
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
              ))}
            </div>
    );
  }
}

const StudentsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsPage);
export default StudentsList;
