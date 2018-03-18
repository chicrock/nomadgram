import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './styles.scss';
import Footer from 'components/Footer';

const App = props => [props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />, <Footer key={3} />];

const PrivateRoutes = props => (
    <Switch>
        <Route exact path="/login" render={() => 'feed'} />
        <Route exact path="/explore" render={() => 'explore'} />
    </Switch>
);

const PublicRoutes = props => (
    <Switch>
        <Route exact path="/" render={() => 'login'} />
        <Route exact path="/forgor" render={() => 'password'} />
    </Switch>
);

export default App;