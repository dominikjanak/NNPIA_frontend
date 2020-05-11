import React from "react";
import { Redirect } from "react-router-dom";
import SessionService from "../../service/SessionService.js";

const Logout = () => {

    document.title = "Odhlášení | Citáty";

    if(SessionService.isLoggedIn()){
        SessionService.logout();
    }
    return <Redirect to="/login"/>
}

export default Logout;