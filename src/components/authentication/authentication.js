import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Application from "../application/application";
import Login from "./login/login";
import { validateSession, logOut } from "./authFunctions";
import PageNotFound from "../pages/pagenotround";

function Authentication() {
    return (
        <Router>
            <Switch>
                {/* LOGIN */}
                <Route path="/login" exact render={()=>(
                    validateSession() ? (
                        <Redirect to="/app" />
                    ) : (
                        <Login />
                    )
                )} />

                {/* LOGOUT */}
                <Route path="/logout" exact render={()=>(
                    logOut() ? (
                        <Redirect to="/login" />
                    ) : (
                        <Redirect to="/app" />
                    )
                )} />

                {/* GO TO APP */}
                <Route path="/app" render={()=>(
                    validateSession() ? (
                        <Application />
                    ) : (
                        <Redirect to="/login" />
                    )
                )} />

                {/* REDIRECT TO APP */}
                <Route path="/" exact>
                    <Redirect to="/login" />
                </Route>

                {/* PAGE NOT FOUND */}
                <PageNotFound />
            </Switch>
        </Router>
    )
}

export default Authentication;