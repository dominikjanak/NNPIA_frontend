import * as React from 'react';
import './login.css';
import { setSessionToken } from "./../authFunctions";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false };
    }

    render() {
        return (
            <div className="container-fluid">
                { this.state.redirect &&
                    <Redirect to="/app" />
                }
                <div className="row mt-5">
                    <div className="col-12 mt-5">
                        <form className="login bg-gray-2 py-5 px-4" onSubmit={(e) => this.handleSubmit(e)}>
                            <img src={ process.env.REACT_APP_LOGO_BIG_INV } alt="Logo" className="logo" />

                            <div className="form-group mt-3">
                                <label htmlFor="username">Uživatelské jméno:</label>
                                <input type="text" className="form-control" name="username" required placeholder="Zadejte uživatelské jméno" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Heslo:</label>
                                <input type="password" className="form-control" name="password" required placeholder="Zadejte heslo" />
                            </div>
                            <input type="submit" className="btn w-100 btn-primary" value="Přihlásit se" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        let name = e.target.elements.username.value;
        let pass = e.target.elements.password.value;
        e.target.elements.password.value = "";
        if(!name || !pass){
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username":name, "password":pass })
        };

        fetch(process.env.REACT_APP_API_URI + "/authenticate/", requestOptions)
            .then(res => res.json())
            .then(res => {
                if(res.response === 'OK' && setSessionToken(res.token)) {
                    this.setState({ redirect: true })
                } else {
                    // eslint-disable-next-line no-undef
                    $("body").overhang({
                        type: "error",
                        message: "Nesprávné přihlašovací údaje!",
                        duration: 4,
                        closeConfirm: true
                    });
                }
            })
            .catch((e) => console.log("error: " + e));
    }
}
