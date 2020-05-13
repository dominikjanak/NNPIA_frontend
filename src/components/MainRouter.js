import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import LoginComponent from "./authentication/LoginComponent";
import RegisterComponent from "./authentication/RegisterComponent";
import PageNotFoundComponent from "./systemPages/PageNotFoundComponent";
import Logout from "./authentication/Logout";
import QuoteListComponent from "./application/quotes/QuoteListComponent";
import QuoteFormComponent from "./application/quotes/QuoteFormComponent";
import AuthorListComponent from "./application/author/AuthorListComponent";
import CategoryListComponent from "./application/category/CategoryListComponent";
import CategoryFormComponent from "./application/category/CategoryFormComponent";
import NavBar from "./application/layout/NavBar";
import Footer from "./application/layout/Footer";
import PrivateRoute from "./PrivateRoute";
import AuthorFormComponent from "./application/author/AuthorFormComponent";
import PublicShowQuote from "./public/PublicShowQuote";

/**
 * Main application router
 * @returns {*}
 * @constructor
 */
function MainRouter() {
  return (
    <Router>
      <NavBar/>
      <main className="content">
        <div className="container">
          <Switch>

            {/** Security managers **/}
            <Route path="/register" exact>
              <RegisterComponent/>
            </Route>
            <Route path="/login" exact>
              <LoginComponent/>
            </Route>
            <Route path="/logout" exact>
              <Logout/>
            </Route>

            {/** Show public quote **/}
            <Route exact path="/show/:id">
              <PublicShowQuote />
            </Route>

            {/** Author managers **/}
            <PrivateRoute exact path="/app/author">
              <AuthorListComponent pageTitle={"Výpis všech autorů"}/>
            </PrivateRoute>
            <PrivateRoute exact path="/app/author/new">
              <AuthorFormComponent pageTitle={"Vložit nového autora"} action="new"/>
            </PrivateRoute>
            <PrivateRoute exact path="/app/author/edit/:id">
              <AuthorFormComponent pageTitle={"Upravit autora"} action="edit"/>
            </PrivateRoute>

            {/** Category managers **/}
            <PrivateRoute exact path="/app/category">
              <CategoryListComponent pageTitle={"Výpis všech kategorií"}/>
            </PrivateRoute>
            <PrivateRoute exact path="/app/category/new">
              <CategoryFormComponent pageTitle={"Vložit novou kategorii"} action="new"/>
            </PrivateRoute>
            <PrivateRoute exact path="/app/category/edit/:id">
              <CategoryFormComponent pageTitle={"Upravit kategorii"} action="edit"/>
            </PrivateRoute>

            {/** Qutoes managers **/}
            <PrivateRoute exact path="/app">
              <QuoteListComponent pageTitle={"Výpis všech citátů"}/>
            </PrivateRoute>
            <PrivateRoute exact path="/app/quote/new">
              <QuoteFormComponent pageTitle={"Vložit nový citát"} action="new"/>
            </PrivateRoute>
            <PrivateRoute exact path="/app/quote/edit/:id">
              <QuoteFormComponent pageTitle={"Upravit citát"} action="edit"/>
            </PrivateRoute>

            {/** Redirect root to app **/}
            <Route path="/" exact>
              <Redirect to="/app"/>
            </Route>

            {/** Mage not found **/}
            <PageNotFoundComponent/>
          </Switch>
        </div>
      </main>
      <Footer/>
    </Router>
  )
}

export default MainRouter;