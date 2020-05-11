import React from 'react';
import { Route, Redirect } from "react-router-dom";
import SessionService from "../service/SessionService";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props =>
      SessionService.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
          pathname: '/login',
          state: { from: props.location }
          }}
        />
      )
    }
  />
);