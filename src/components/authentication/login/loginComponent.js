import * as React from 'react';
import './login.css';
import SessionService from "../../../service/SesstionService";
import { Redirect, Link } from "react-router-dom";

class LoginComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        if(SessionService.isLoggedIn()){
            this.props.history.push("/app");
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.username.length === 0 || this.state.password.length === 0){
            return;
        }

        SessionService.login(this.state.username, this.state.password).then(res => {
            if(res.data.status === 200){
                SessionService.setUserInfo(res.data.result);
                this.props.history.push("/app");
            }else {
                // eslint-disable-next-line no-undef
                $("body").overhang({
                    type: "error",
                    message: "Neplatné uživatelské jméno nebo heslo!",
                    duration: 4,
                    closeConfirm: true
                });
            }
        });
    };

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value });

    render() {
        return (
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-12 mt-5">
                        <form className="login bg-gray-2 py-5 px-4" onSubmit={(e) => this.handleSubmit(e)}>
                            <img src={ process.env.REACT_APP_LOGO_BIG_INV } alt="Logo" className="logo" />
                            <h1 className="text-center title">Příhlášení</h1>

                            <div className="form-group mt-3">
                                <label htmlFor="username">Uživatelské jméno:</label>
                                <input type="text" className="form-control" name="username" required placeholder="Zadejte uživatelské jméno"  value={this.state.username} onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Heslo:</label>
                                <input type="password" className="form-control" name="password" required placeholder="Zadejte heslo" value={this.state.password} onChange={this.onChange} />
                            </div>
                            <input type="submit" className="btn w-100 btn-primary" value="Přihlásit se" />
                        </form>
                        <p className="text-center mt-3"><Link to="/register">Zaregistrovat se</Link></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <table className="table table-bordered table-striped login-table-fit">
                            <thead>
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
        );
    }
}

export default LoginComponent;