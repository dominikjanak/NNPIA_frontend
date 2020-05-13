import React from 'react';
import {Redirect, Route} from "react-router-dom";
import SessionService from "../service/SessionService";

/**
 * Private router for chacking Authorization
 * @param props
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({props, component: Component, ...rest}) => {
  return (
    SessionService.isLoggedIn() ? (
      <Route {...rest} render={props => <Component {...props} />}/>
    ) : (
      <Redirect to="/login"/>
    )
  )
}

export default PrivateRoute;



