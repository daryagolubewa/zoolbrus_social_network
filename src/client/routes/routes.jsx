import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { PAGES } from './pages';
import App from '../components/app/app';
import HomePage from '../components/home-page/home-page';
import InfoPage from '../components/info-page/info-page';
import Page404 from '../components/page404/page404';
import LoginPage from '../components/login-page/login-page';
import StudentsPage from '../components/students-page/students-page';
import TeachersPage from '../components/teachers-page/teachers-page';
import FeedbackPage from '../components/feedback-page/feedback-page';
import ProfilePage from '../components/profile-page/profile-page';
import UserPage from '../components/user-page/user-page';
import SignupPage from '../components/signup-page/signup-page';
import ChatPage from '../components/chat/chat';


const WrappedApp = (Component, props) => (
  <App appName='Fancy React Redux App'>
    <Component { ...props } />
  </App>
);

export default () => (
    <Switch>
        <Route
            exact path={PAGES.home.path}
            render={props => WrappedApp(HomePage, props)}
        />
        <Route
            exact path={PAGES.chat.path}
            render={props => WrappedApp(ChatPage, props)}
        />
        <Route
            exact path={PAGES.about.path}
            render={props => WrappedApp(InfoPage, props)}
        />
        <Route
            exact path={PAGES.page404.path}
            render={props => WrappedApp(Page404, props)}
        />
         <Route
             exact path={PAGES.signup.path}
             render={props => WrappedApp(SignupPage, props)}
         />
        <Route
            exact path={PAGES.login.path}
            render={props => WrappedApp(LoginPage, props)}
        />
        <Route
            exact path={PAGES.users.teachers.path}
            render={props => WrappedApp(TeachersPage, props)}
        />
        <Route
            exact path={PAGES.users.students.path}
            render={props => WrappedApp(StudentsPage, props)}
        />
        <Route
            exact path={PAGES.feedback.path}
            render={props => WrappedApp(FeedbackPage, props)}
        />
        <Route
            exact path={PAGES.profile.path}
            render={props => WrappedApp(ProfilePage, props)}
        />
        <Route
            exact path={PAGES.user.path}
            render={props => WrappedApp(UserPage, props)}
        />
        <Route
            path='/'
            render={() => (
                <Redirect to={PAGES.page404.path}/>
            )}
        />
    </Switch>
);
