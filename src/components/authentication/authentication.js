import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Application from "../application/application";
import Login from "./login/login";
import { validateSession, logOut } from "./authFunctions";

function Authentication() {
    return (
        <Router>
            <Switch>
                {/* LOGIN */}
                <Route path="/login" render={()=>(
                    validateSession() ? (
                        <Redirect to="/" />
                    ) : (
                        <Login />
                    )
                )} />
                {/* LOGOUT */}
                <Route path="/logout" render={()=>(
                    logOut() ? (
                        <Redirect to="/login" />
                    ) : (
                        <Redirect to="/" />
                    )
                )} />
                {/* GO TO APP */}
                <Route path="/" render={()=>(
                    validateSession() ? (
                        <Application />
                    ) : (
                        <Redirect to="/login" />
                    )
                )} />

            </Switch>
        </Router>
    )
}

export default Authentication;