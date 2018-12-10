import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Type from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import elbrusImg from './elbrus.png';
import { PAGES } from '../../routes/pages';
import { bemClassNameFactory } from '../../utils/bem';
import { sayByeAC, sayHiAC } from '../../redux/actions/app-actions';
import { fetchUserStartAC, fetchUserSuccessAC, fetchUserErrorAC } from '../../redux/actions/user-actions';
import { fetchPostsThunkAC } from '../../redux/actions/post-actions';
import { selectSay } from '../../redux/selectors/app-selectors';
import { selectPathname } from '../../redux/selectors/router-selectors';
import { selectUser, selectIsUserFetching } from '../../redux/selectors/user-selectors';
import { selectPosts, selectIsPostsFetching } from '../../redux/selectors/post-selectors';
import './app.css';

const cn = bemClassNameFactory('app');

const mapStateToProps = state => ({
  say: selectSay(state),
  pathname: selectPathname(state),
  userInfo: selectUser(state),
  isUserFetching: selectIsUserFetching(state),
  posts: selectPosts(state),
  isPostsFetching: selectIsPostsFetching(state)
});

// Alternative Way to map dispatch to props
// const mapDispatchToProps = dispatch => ({
//   sayBye: () => dispatch(sayByeAC()),
//   sayHi: () => dispatch(sayHiAC()),
//   doRoute: page => dispatch(push(page)),
//   fetchUserStart: () => dispatch(fetchUserStartAC()),
//   fetchUserSuccess: user => dispatch(fetchUserSuccessAC(user)),
//   fetchUserError: () => dispatch(fetchUserErrorAC())
// });

const mapDispatchToProps = dispatch => bindActionCreators({
  sayBye: sayByeAC,
  sayHi: sayHiAC,
  doRoute: push,
  fetchUserStart: fetchUserStartAC,
  fetchUserSuccess: fetchUserSuccessAC,
  fetchUserError: fetchUserErrorAC,
  fetchPosts: fetchPostsThunkAC
}, dispatch);

class App extends Component {
  static propTypes = {
    appName: Type.string,
    children: Type.node.isRequired,
    say: Type.string,
    pathname: Type.string,
    userInfo: Type.shape({
      name: Type.string,
      email: Type.string
    }),
    isUserFetching: Type.bool,
    sayHi: Type.func,
    sayBye: Type.func,
    doRoute: Type.func,
    posts: Type.array,
    isPostsFetching: Type.bool,
    fetchUserStart: Type.func,
    fetchUserSuccess: Type.func,
    fetchUserError: Type.func,
    fetchPosts: Type.func
  };

  static defaultProps = {
    appName: 'Default Name',
    posts: []
  };

  state = {
    buttonActive: false
  };

  handleClickButton = () => {
    const { buttonActive } = this.state;
    this.setState({ buttonActive: !buttonActive });
  };

  handleClickSayHi = () => {
    this.props.sayHi();
  };

  handleClickSayBye = () => {
    this.props.sayBye();
  };

  handleRouteToInfoPage = () => {
    this.props.doRoute(PAGES.info.path);
  };

  handleRouteToPage404 = () => {
    this.props.doRoute(PAGES.page404.path);
  };

  fetchUser = async () => {
    const { fetchUserStart, fetchUserSuccess, fetchUserError } = this.props;
    try {
      fetchUserStart();
      const user = await fetch(PAGES.API.fetchUser.path);
      const userInfo = await user.json();
      console.log('userInfo', userInfo);
      fetchUserSuccess(userInfo);
    } catch (e) {
      console.error(e);
      fetchUserError();
    }
  };

  handleFetchPosts = () => {
    this.props.fetchPosts();
  };

  componentDidMount() {
    // this.fetchUser();
  }

  render() {
    const {
      appName,
      children
    } = this.props;
    console.log(this.props);
    return (
      <div className={ cn() }>
        <h1>{ appName }</h1>
        <div className={ cn('header') }>
          { this.renderMenu() }
          { this.renderTestButton() }
          <div className={ cn('button-block') }>
            <h2>Buttons Redux</h2>
            { this.renderSayButtons() }
            { this.renderRoutingButtons() }
            { this.renderUserButtons() }
          </div>
          { this.renderThunkButton() }
        </div>
        { children }
        <div className={ cn('footer') }>
        </div>
      </div>
    );
  }

  renderTestButton() {
    return (
      <div className={ cn('button-block') }>
        <h2>Test Button</h2>
        <button
          className={ cn('button', this.state.buttonActive ? 'blue' : 'green') }
          onClick={ this.handleClickButton }
        >
          Click Me
        </button>
      </div>
    );
  }

  renderMenu() {
    return (
      <div className={ cn('menu') }>
        <h2>Menu</h2>
        <div className={ cn('logo') }>
          <img src={ elbrusImg } height='100px' />
        </div>
        <div><Link to={ PAGES.home.path }>Home Page</Link></div>
        <div><Link to={ PAGES.info.path }>Info Page</Link></div>
        <div><Link to={ PAGES.page404.path }>Page 404</Link></div>
        <div><Link to={ PAGES.login.path }>Login Page</Link></div>
      </div>
    );
  }

  renderSayButtons() {
    return (
      <div>
        <h3>Say Buttons</h3>
        <div>
          <button
            className={ cn('button', 'red') }
            onClick={ this.handleClickSayHi }
          >
            Say Hi
          </button>
          <button
            className={ cn('button', 'red') }
            onClick={ this.handleClickSayBye }
          >
            Say Bye
          </button>
        </div>
        <div>
          { this.props.say }
        </div>
      </div>
    );
  }

  renderRoutingButtons() {
    return (
      <div>
        <h3>Router Push Buttons</h3>
        <div>
          <button
            className={ cn('button', 'red') }
            onClick={ this.handleRouteToInfoPage }
          >
            Info page
          </button>
          <button
            className={ cn('button', 'red') }
            onClick={ this.handleRouteToPage404 }
          >
            Page 404
          </button>
        </div>
        <div>
          <b>Pathname</b>: { this.props.pathname }
        </div>
      </div>
    );
  }

  renderUserButtons() {
    const { userInfo, isUserFetching } = this.props;
    return (
      <div>
        <h3>User Buttons</h3>
        <div>
          <button
            className={ cn('button', 'red') }
            onClick={ this.fetchUser }
          >
            Fetch user
          </button>
        </div>
        <div>
          {
            isUserFetching
            && <div>Loading...</div>
          }
          <b>User</b>: { userInfo.name }
        </div>
      </div>
    );
  }

  renderThunkButton() {
    const { posts, isPostsFetching } = this.props;
    return (
      <div className={ cn('button-block') }>
        <h3>Middlewares (Redux Thunk)</h3>
        <div>
          <button
            className={ cn('button', 'yellow') }
            onClick={ this.handleFetchPosts }
          >
            Fetch Posts
          </button>
        </div>
        <div>
          { isPostsFetching && <div>Loading...</div> }
        </div>
        <div>
          { posts.map(el => (
            <div key={el.id}><b>{el.title}</b>: {el.description}</div>
          ))}
        </div>
      </div>
    );
  }
}

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default VisibleApp;
