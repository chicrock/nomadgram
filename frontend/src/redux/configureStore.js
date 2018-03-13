import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import users from 'redux/modules/users';

const middlewares = [thunk];

/// need to use in store is this environment is development or not
const env = process.env.NODE_ENV;

if (env === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const reducer = combineReducers({
    users,
});

let store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export default store();
