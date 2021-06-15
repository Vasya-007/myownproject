/* eslint-disable no-console */
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Notfound from '../pages/Notfound';
import Signup from '../pages/Signup';
import CoinDetails from '../pages/CoinDetails';
import paths from './route-paths';
import AppLayout from '../components/layouts/AppLayout';
import AuthManager from '../services/AuthManager';

const authRoutes = [
  {
    path: paths.login,
    Component: Login,
    exact: true,
  },
  {
    path: paths.signup,
    Component: Signup,
    exact: true,
  },
];

const appRoutes = [
  {
    path: paths.myCoin,
    Component: Home,
    exact: true,
  },
  {
    path: paths.myCoinDetails,
    Component: CoinDetails,
    exact: true,
  },

];
const useIsLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(AuthManager.isLoggedIn());
  useEffect(() => {
    const unsubscribeFromLoginStatusChange = AuthManager.onLoginStatusChange(
      (token) => {
        setLoggedIn(!!token);
      },
    );
    const unsubscribeFromOnLogin = AuthManager.onLogin(() => {
      console.log('User was logged in!');
    });
    return () => {
      unsubscribeFromLoginStatusChange();
      unsubscribeFromOnLogin();
    };
  }, []);
  return loggedIn;
};
export default function Rootrouter() {
  const loggedIn = useIsLoggedIn();
  return (
    <Router>
      { loggedIn ? (
        <AppLayout>
          <Switch>
            {appRoutes.map(({ path, Component: C, exact }) => (
              <Route key={path} exact={exact} path={path}>
                <C />
              </Route>
            ))}
            <Redirect to={paths.myCoin} />
          </Switch>
        </AppLayout>
      ) : (

        <AuthLayout>
          <Switch>
            {authRoutes.map(({ path, Component: C, exact }) => (
              <Route key={path} exact={exact} path={path}>
                <C />
              </Route>
            ))}
            <Redirect to={paths.login} />
            <Route>
              <Notfound />
            </Route>
          </Switch>
        </AuthLayout>
      )}
    </Router>
  );
}
