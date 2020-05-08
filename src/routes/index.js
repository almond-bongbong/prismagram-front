import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom';
import Auth from './Auth';
import Feed from './Feed';

function Routes({ isLoggedIn }) {
  return <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>;
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Routes;

function LoggedOutRoutes() {
  return (
    <>
      <Route path="/" component={Auth} />
    </>
  );
}

function LoggedInRoutes() {
  return (
    <>
      <Route path="/" component={Feed} />
    </>
  );
}
