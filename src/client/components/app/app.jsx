import React, { Component } from 'react';

import {
  Button, Col, Row, Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
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

const mapDispatchToProps = dispatch => bindActionCreators({
  doRoute: push
}, dispatch);


class App extends Component {
  static propTypes = {
    doRoute: Type.func.isRequired
  };

  // static defaultProps = {
  //   name: 'Default Name',
  // };

  state = {
    show: false
  };

  handleOpenPage = path => () => {
    const { doRoute } = this.props;
    doRoute(path);
  };

  render() {
    const {
      children
    } = this.props;
    // console.log(this.props);
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" onClick={this.handleOpenPage(PAGES.home.path)}>Zoolbrus</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={this.handleOpenPage(PAGES.users.teachers.path)}>
              Наши преподаватели
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className='container-fluid'>
          <Grid>
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
              </Col>
            </Row>
            {children}
          </Grid>
        </div>
      </div>
    );
  }
}

const VisibleApp = connect(
  null,
  mapDispatchToProps
)(App);
export default VisibleApp;
