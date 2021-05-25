import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import { Component } from 'react';
import AuthLayout from '../components/layouts/AuthLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Notfound from '../pages/Notfound';
import Signup from '../pages/Signup';
import paths from './route-paths';
import AppLayout from '../components/layouts/AppLayout copy';

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
    path: paths.home,
    Component: Home,
    exact: true,
  },

];
export default class Rootrouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  login = () => {
    this.setState({ loggedIn: true });
  }

  logout = () => {
    this.setState({ loggedIn: false });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router>
        { loggedIn ? (
          <Switch>
            <AppLayout logout={this.logout}>
              {appRoutes.map(({ path, Component: C, exact }) => (
                <Route exact={exact} path={path}>
                  <C />
                </Route>
              ))}
            </AppLayout>
          </Switch>
        ) : (

          <AuthLayout login={this.login}>
            <Switch>
              <Redirect from={paths.home} to={paths.login} exact />
              {authRoutes.map(({ path, Component: C, exact }) => (
                <Route exact={exact} path={path}>
                  <C />
                </Route>
              ))}
              <Route>
                <Notfound />
              </Route>

              <Route>
                <Notfound />
              </Route>
            </Switch>
          </AuthLayout>
        )}
      </Router>
    );
  }
}
