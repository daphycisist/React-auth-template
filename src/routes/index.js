import decode from 'jwt-decode';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';

export default function Routes() {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    console.log({ token });

    if (token || refreshToken) {
      console.log({ token });
      try {
        const { exp } = decode(token);
        const currentDate = new Date().getTime() / 1000;
        console.log(exp < currentDate);
        if (exp < currentDate) return false;
      } catch (error) {
        return false;
      }

      return true;
    }

    return false;
  };

  //   console.log('Auth', isAuthenticated());

  const PrivateRoute = ({ component: Component, ...rest }) => {
    //   let auth = useAuth();
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                // state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} />}
        />
        <PrivateRoute exact path="/home" component={Homepage} />
      </Switch>
    </Router>
  );
}
