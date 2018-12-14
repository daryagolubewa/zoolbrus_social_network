import React, { Component } from 'react';
import {
  Col, Panel, ListGroup, ListGroupItem, Image, Button
} from 'react-bootstrap';
import Pagination from 'react-paginating';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { showStudentsListSuccessAC } from '../../redux/actions/students-action';
import { selectStudentsList } from '../../redux/selectors/students-selector';
import './students-page.css';
import noavatar from '../../public/images/noavatar.png';
import { PAGES } from '../../routes/pages';

const mapStateToProps = state => ({
  studentsList: selectStudentsList(state)
});

const mapDispatchToProps = dispatch => ({
  showStudentsListSuccess: students => dispatch(showStudentsListSuccessAC(students))
});

class StudentsPage extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1
    };
  }

  handlePageChange = (page) => {
    this.setState({
      currentPage: page
    });
  };

  async componentDidMount() {
    this.showStudents();
  }

  // async componentDidUpdate() {
  //   const pageChange = this.handlePageChange();
  //   if (pageChange) {
  //     this.showStudents();
  //   }
  // }

  showStudents = async () => {
    const { showStudentsListSuccess } = this.props;
    const studentsLimit = 10;
    const res = await fetch('/api/users/students', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ currentPage: this.state.currentPage, studentsLimit })
    });
    if (res.status === 200) {
      const studentsList = await res.json();
      showStudentsListSuccess(studentsList);
    }
  };

  render() {
    const studentsLimit = 10;
    const pageCount = 3;
    const { currentPage } = this.state;
    const total = this.props.studentsList.length * studentsLimit;
    console.log('ffff', total);
    console.log(this.state);
    return (
      <div>
        <div className='students-page'>
          <h1>Наши студенты </h1>
          { this.props.studentsList.map(studentsInfo => (<div className="student-mini-profile row" key={ studentsInfo._id }>
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
        <Pagination
          total={total}
          studentsLimit={studentsLimit}
          pageCount={pageCount}
          currentPage={currentPage}
        >
          {({
            pages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            getPageItemProps
          }) => (
            <div>
              <Button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                first
              </Button>

              {hasPreviousPage && (
                <Button
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'<'}
                </Button>
              )}

              {pages.map(page => (
                  <Button
                    key={page}
                    {...getPageItemProps({
                      pageValue: page,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {page}
                  </Button>
              ))}

              {hasNextPage && (
                <Button
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'>'}
                </Button>
              )}

              <Button
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                last
              </Button>
            </div>
          )}
        </Pagination>
      </div>
    );
  }
}

const StudentsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsPage);
export default StudentsList;
