import React from "react";
import { Redirect } from "react-router-dom";
import SesstionService from "../../../service/SesstionService";

const Logout = () => {
    if(SesstionService.isLoggedIn()){
        SesstionService.logout();
    }
    return <Redirect to="/"/>
}

export default Logout;