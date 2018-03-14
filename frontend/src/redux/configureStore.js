import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, RouterMiddleware, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import users from 'redux/modules/users';

/// need to use in store is this environment is development or not
const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const reducer = combineReducers({
    users,
    routing: routerReducer,
});

let store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export { history };

export default store();
