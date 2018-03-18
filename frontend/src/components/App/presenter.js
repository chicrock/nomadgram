import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import styles from './styles.scss';
import Footer from 'components/Footer';
import Auth from 'components/Auth';

const App = props => [props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />, <Footer key={3} />];

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
};

const PrivateRoutes = props => (
    <Switch>
        <Route path="/login" render={() => 'feed'} />
        <Route path="/explore" render={() => 'explore'} />
    </Switch>
);

const PublicRoutes = props => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/forgor" render={() => 'password'} />
    </Switch>
);

export default App;
