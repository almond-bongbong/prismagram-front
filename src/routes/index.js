import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import Feed from './Feed';

function RoutesIndex({ isLoggedIn }) {
  return <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>;
}

RoutesIndex.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default RoutesIndex;

function LoggedOutRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  );
}

function LoggedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
    </Routes>
  );
}
