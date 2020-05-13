import React  from 'react'
import { Link, withRouter } from "react-router-dom";
import QuoteLogo from "./images/quotes-logo.svg"
import SessionService from "../../../service/SessionService";

const NavBar = () => {
  if (!SessionService.isLoggedIn()) {
    return null;
  }
  else{
    return (
      <header className="header">
        <nav className="site-header sticky-top py-1">
          <div className="container d-flex bd-highlight">
            <Link className="py-2 mr-auto" to="/app">
              <img src={QuoteLogo} alt="Quotes logo" />
            </Link>
            <Link className="py-2 pr-4" to="/app">Citáty</Link>
            <Link className="py-2 pr-4" to="/app/category">Kategorie</Link>
            <Link className="py-2 pr-4" to="/app/author">Autoři</Link>
            <Link className="py-2" to="/logout">Odhlásit se ({SessionService.getUsername()
            })</Link>

          </div>
        </nav>
      </header>
    )
  }
}

export default withRouter(NavBar);