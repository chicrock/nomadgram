import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'redux/configureStore';
import 'index.css';
import App from 'App';

/// console.log(store.getState());

store.dispatch({ type: 'BULLSHIT' });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
