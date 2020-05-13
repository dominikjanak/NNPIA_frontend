import * as React from 'react';
import '../../styles/register.css';
import SessionService from "../../service/SessionService.js";
import PopupMessagesService from "../../service/PopupMessagesService.js";
import {Link} from "react-router-dom";

/**
 * Register component
 */
class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      surname: '',
      username: '',
      password: '',
      passwordAgain: '',
      email: ''
    }
  }

  componentDidMount() {
    document.title = "Registrace | Citáty";
    if (SessionService.isLoggedIn()) {
      this.props.history.push("/app");
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-12">
            <form className="register bg-gray-2 pt-5 pb-4 px-4" onSubmit={(e) => this.handleSubmit(e)}>
              <img src={process.env.REACT_APP_LOGO_BIG_INV} alt="Logo" className="logo"/>
              <h1 className="text-center title">Registrace</h1>

              <div className="form-group mt-3">
                <label htmlFor="username">Uživatelské jméno:</label>
                <input type="text" className="form-control" name="username" required
                       placeholder="Zadejte uživatelské jméno" value={this.state.username} onChange={this.onChange}/>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="firstname">Jméno:</label>
                <input type="text" className="form-control" name="firstname" required placeholder="Zadejte jméno"
                       value={this.state.firstname} onChange={this.onChange}/>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="surname">Příjmení:</label>
                <input type="text" className="form-control" name="surname" required placeholder="Zadejte příjmení"
                       value={this.state.surname} onChange={this.onChange}/>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" name="email" required placeholder="Zadejte email"
                       value={this.state.email} onChange={this.onChange}/>
              </div>

              <div className="form-group">
                <label htmlFor="password">Heslo:</label>
                <input type="password" className="form-control" name="password" required placeholder="Zadejte heslo"
                       value={this.state.password} onChange={this.onChange}/>
              </div>

              <div className="form-group">
                <label htmlFor="passwordAgain">Heslo:</label>
                <input type="password" className="form-control" name="passwordAgain" required
                       placeholder="Zadejte heslo" value={this.state.passwordAgain} onChange={this.onChange}/>
              </div>
              <input type="submit" className="btn w-100 btn-primary" value="Zaregistrovat se"/>
              <Link className="btn w-100 mt-2 btn-link text-center" to="/login">Přihlásit se</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Process register
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.username.length <= 3) {
      PopupMessagesService.error("Uživatelské jméno musí obsahovat alespoň 3 znaky!");
      return;
    }
    if (this.state.password !== this.state.passwordAgain) {
      PopupMessagesService.error("Hesla se musí shodovat!");
      return;
    }
    if (this.state.password.length <= 6) {
      PopupMessagesService.error("Heslo musí obsahovat alespoň 6 znaků!");
      return;
    }

    SessionService.register(this.state.username, this.state.password, this.state.firstname, this.state.surname, this.state.email).then(res => {
      if (res.data.status === 200) {
        SessionService.setUserInfo(res.data.result);
        this.props.history.push("/app");
      } else {
        switch (res.data.status_key) {
          case "ALREADY-EXISTS":
            PopupMessagesService.warn("Zvolené uživatelské jméno nelze registrovat!");
            break;
          case "EMAIL-ALREADY-USED":
            PopupMessagesService.warn("Zvolený email nelze registrovat!");
            break;
          default:
            PopupMessagesService.error("V průběhu registrace se vyskytla chyba!");
        }
      }
    });
  };

  onChange = (e) =>
    this.setState({[e.target.name]: e.target.value});
}

export default RegisterComponent;