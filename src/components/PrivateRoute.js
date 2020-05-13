import React from 'react';
import { Route, Redirect} from "react-router-dom";
import SessionService from "../service/SessionService";

const PrivateRoute = ({ props, component: Component, ...rest }) => {
  return (
    SessionService.isLoggedIn() ? (
      <Route {...rest} render={props => <Component {...props} /> } />
    ):(
      <Redirect to="/login"/>
    )
  )
}

export default PrivateRoute;



