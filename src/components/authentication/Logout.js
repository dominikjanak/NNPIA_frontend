import React from "react";
import {Redirect} from "react-router-dom";
import SessionService from "../../service/SessionService.js";

/**
 * Logout redirect
 * @returns {*}
 * @constructor
 */
const Logout = () => {
  document.title = "Odhlašování | Citáty";

  if (SessionService.isLoggedIn()) {
    SessionService.logout();
  }
  return <Redirect to="/login"/>
}

export default Logout;