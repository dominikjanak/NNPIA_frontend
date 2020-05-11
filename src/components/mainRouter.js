import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import LoginComponent from "./authentication/login/loginComponent";
import RegisterComponent from "./authentication/register/registerComponent";
import ApplicationComponent from "./application/applicationComponent";
import PageNotFoundComponent from "./systemPages/pagenotroundComponent";
import Logout from "./authentication/logout/Logout";

function MainRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/register" exact component={ RegisterComponent } />
                <Route path="/login" exact component={ LoginComponent } />
                <Route path="/app" component={ ApplicationComponent } />

                <Route path="/logout" exact >
                    <Logout/>
                </Route>

                <Route path="/" exact>
                    <Redirect to="/login" />
                </Route>

                {/* PAGE NOT FOUND */}
                <PageNotFoundComponent />
            </Switch>
        </Router>
    )
}

export default MainRouter;