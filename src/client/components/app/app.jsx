import React, { Component } from 'react';

import {
  Button, Col, Row, Nav
} from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Type from 'prop-types';
import { Link } from 'react-router-dom';
// import { push } from 'connected-react-router';
// import elbrusImg from './elbrus.png';
import { PAGES } from '../../routes/pages';
// import { bemClassNameFactory } from '../../utils/bem';
// import { sayByeAC, sayHiAC } from '../../redux/actions/app-actions';
// import { fetchUserStartAC, fetchUserSuccessAC,
// fetchUserErrorAC } from '../../redux/actions/user-actions';
// import { fetchPostsThunkAC } from '../../redux/actions/post-actions';
// import { selectSay } from '../../redux/selectors/app-selectors';
// import { selectPathname } from '../../redux/selectors/router-selectors';
// import { selectUser, selectIsUserFetching } from '../../redux/selectors/user-selectors';
// import { selectPosts, selectIsPostsFetching } from '../../redux/selectors/post-selectors';
import './app.css';
// import ProfilePage from '../profile-page/profile-page';


// const cn = bemClassNameFactory('app');
//
// const mapStateToProps = state => ({
//   say: selectSay(state),
//   pathname: selectPathname(state),
//   userInfo: selectUser(state),
//   isUserFetching: selectIsUserFetching(state),
//   posts: selectPosts(state),
//   isPostsFetching: selectIsPostsFetching(state)

// });

// Alternative Way to map dispatch to props
// const mapDispatchToProps = dispatch => ({
//   sayBye: () => dispatch(sayByeAC()),
//   sayHi: () => dispatch(sayHiAC()),
//   doRoute: page => dispatch(push(page)),
//   fetchUserStart: () => dispatch(fetchUserStartAC()),
//   fetchUserSuccess: user => dispatch(fetchUserSuccessAC(user)),
//   fetchUserError: () => dispatch(fetchUserErrorAC())
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   sayBye: sayByeAC,
//   sayHi: sayHiAC,
//   doRoute: push,
//   fetchUserStart: fetchUserStartAC,
//   fetchUserSuccess: fetchUserSuccessAC,
//   fetchUserError: fetchUserErrorAC,
//   fetchPosts: fetchPostsThunkAC
// }, dispatch);

export default class App extends Component {

  // static propTypes = {
  //   appName: Type.string,
  //   children: Type.node.isRequired,
  //   say: Type.string,
  //   pathname: Type.string,
  //   userInfo: Type.shape({
  //     name: Type.string,
  //     email: Type.string
  //   }),
  //   isUserFetching: Type.bool,
  //   sayHi: Type.func,
  //   sayBye: Type.func,
  //   doRoute: Type.func,
  //   posts: Type.array,
  //   isPostsFetching: Type.bool,
  //   fetchUserStart: Type.func,
  //   fetchUserSuccess: Type.func,
  //   fetchUserError: Type.func,
  //   fetchPosts: Type.func
  // };

  // static defaultProps = {
  //   appName: 'Default Name',
  //   posts: []
  // };
  //

  state = {
    show: false
  };

  render() {
    const {
      children
    } = this.props;
    // console.log(this.props);
    return (
            <div className='container-fluid'>
                <Row>
                    <Col xs={4} xsOffset={4} lg={4} lgOffset={9} md={8} mdOffset={8}>
                        <div className='button-toolbar'>
                            <Link to={PAGES.signup.path}>
                                <Button className='form-buttons' bsStyle='primary'>Зарегистрироваться</Button>
                            </Link>
                            <Link to={PAGES.signin.path}>
                            <Button className='form-buttons' bsStyle='primary'>Войти</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} lg={12} md={8} className='main-container'>
                        <Nav bsStyle="pills" className='menu'>
                            <Link to={PAGES.users.teachers.path}>
                                <div className='menu-text'>
                                    Наши преподаватели
                                </div>
                            </Link>
                            <Link to={PAGES.users.students.path}>
                                <div className='menu-text'>
                                    Наши студенты
                                </div>
                            </Link>
                            <Link to={PAGES.about.path}>
                                <div className='menu-text'>
                                    О нас
                                </div>
                            </Link>
                            <Link to={PAGES.feedback.path}>
                                <div className='menu-text'>
                                    Задать вопрос
                                </div>
                            </Link>
                        </Nav>
                    </Col>
                </Row>
                {children}
            </div>
    );
  }
}

// const VisibleApp = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
// export default VisibleApp;
