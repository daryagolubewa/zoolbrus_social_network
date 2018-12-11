import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-bootstrap';
// import { createStore, applyMiddleware } from 'redux';
// import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// import { Provider } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import App from './components/app/app';
// import reducers from './redux/reducers';
import { Router } from 'react-router';
import Routes from './routes/routes';
//
// const history = createBrowserHistory();
// const composeEnhancers = composeWithDevTools({});
//
// const initialState = {
//   app: {
//     name: 'Express React Skeleton',
//     say: 'nothing for now'
//   }
// };
//
// const store = createStore(
//   reducers(history),
//   initialState,
//   composeEnhancers(
//     applyMiddleware(
//       routerMiddleware(history),
//       thunk
//     )
//   )
// );
const history = createBrowserHistory();

const Index = () => <Grid>

    <Router history={history}>
        <Routes />
    </Router>

    </Grid>;

ReactDOM.render(<Index />, document.getElementById('react-app'));
