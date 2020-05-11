import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import LoginComponent from "./authentication/LoginComponent";
import RegisterComponent from "./authentication/RegisterComponent";
import PageNotFoundComponent from "./systemPages/PageNotFoundComponent";
import Logout from "./authentication/Logout";
import {PrivateRoute} from "./PrivateRoute";
import QuoteComponent from "./application/quotes/QuotesComponent";
import AuthorListComponent from "./application/AuthorListComponent";
import CategoriesListComponent from "./application/CategoriesListComponent";
import NavBar from "./application/layout/NavBar";
import Footer from "./application/layout/Footer";

function MainRouter() {
  return (
    <Router>
      <NavBar/>
      <main className="content">
        <div className="container">
            <Switch>
              <Route path="/register" exact component={ RegisterComponent } />
              <Route path="/login" exact component={ LoginComponent } />
              <Route path="/logout" exact component={ Logout } />

              <PrivateRoute exact path="/app">
                <QuoteComponent pageTitle={"Výpis všech citátů"} />
              </PrivateRoute>

              <PrivateRoute path="/app/authors">
                <AuthorListComponent pageTitle={"Seznam autorů"} />
              </PrivateRoute>

              <PrivateRoute path="/app/categories">
                <CategoriesListComponent pageTitle={"Sezman kategorií"} />
              </PrivateRoute>

              <Route path="/" exact>
                <Redirect to="/app" />
              </Route>

              {/* PAGE NOT FOUND */}
              <PageNotFoundComponent />
            </Switch>
          </div>
      </main>
      <Footer />
    </Router>
  )
}
export default MainRouter;