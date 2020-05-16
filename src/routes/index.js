import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import Feed from './Feed';
import Explore from './Explore';
import Profile from './Profile';
import Search from './Search';

function AppRouter({ isLoggedIn }) {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
}

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;

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
      <Route path="/explore" element={<Explore />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:username" element={<Profile />} />
    </Routes>
  );
}
