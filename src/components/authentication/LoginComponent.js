import * as React from 'react';
import '../../styles/login.css';
import SessionService from "../../service/SessionService.js";
import PopupMessagesService from "../../service/PopupMessagesService.js";
import {Link, withRouter} from "react-router-dom";

/**
 * Login component
 */
class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    document.title = "Přihlášení | Citáty";
    if (SessionService.isLoggedIn()) {
      this.props.history.push("/app");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-12">
              <form className="login bg-gray-2 pt-5 pb-4 px-4" onSubmit={(e) => this.handleSubmit(e)}>
                <img src={process.env.REACT_APP_LOGO_BIG_INV} alt="Logo" className="logo"/>
                <h1 className="text-center title">Příhlášení</h1>
                <div className="form-group mt-3">
                  <label htmlFor="username">Uživatelské jméno:</label>
                  <input type="text" className="form-control" name="username" required
                         placeholder="Zadejte uživatelské jméno" value={this.state.username} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Heslo:</label>
                  <input type="password" className="form-control" name="password" required placeholder="Zadejte heslo"
                         value={this.state.password} onChange={this.onChange}/>
                </div>
                <input type="submit" className="btn w-100 btn-primary" value="Přihlásit se"/>
                <Link className="btn w-100 mt-2 btn-link text-center" to="/register">Zaregistrovat se</Link>
              </form>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <table className="table table-bordered  table-sm table-striped login-table-fit">
                <thead className="thead-dark">
                <tr>
                  <th className="px-4" colSpan="2">Testovací úaje</th>
                </tr>
                <tr>
                  <td className="px-4">Uživatel</td>
                  <td className="px-4">Heslo</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>test</td>
                  <td>test</td>
                </tr>
                <tr>
                  <td>user</td>
                  <td>user</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  // process login
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.username.length === 0 || this.state.password.length === 0) {
      return;
    }

    SessionService.login(this.state.username, this.state.password).then(res => {
      if (res.data.status === 200) {
        SessionService.setUserInfo(res.data.result);
        this.props.history.push("/app");
      } else {
        PopupMessagesService.error("Neplatné uživatelské jméno nebo heslo!");
      }
    });
  };

  onChange = (e) =>
    this.setState({[e.target.name]: e.target.value});

}

export default withRouter(LoginComponent);