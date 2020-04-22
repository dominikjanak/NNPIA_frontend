import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";

class Application extends React.Component{
    render() {
        return (
            <div className="app container">
                <Router>
                    <Switch>
                        <Route path="/" >
                            <Dashboard />
                        </Route>
                    </Switch>
                </Router>
            </div>
          )
        }
}

export default Application;
