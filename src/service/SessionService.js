import axios from 'axios';

const SESSION_VARIABLE = '__session';

class SessionService {

    login(username, password){
        return axios.post(process.env.REACT_APP_API_URI + "/security/login", {
            username: username,
            password: password
        });
    }

    register(username, password, firstname, surname, email){
        return axios.post(process.env.REACT_APP_API_URI + "/security/register", {
            username: username,
            firstname: firstname,
            surname: surname,
            password: password,
            email: email
        });
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem(SESSION_VARIABLE));
    }

    setUserInfo(userInfo){
        localStorage.setItem(SESSION_VARIABLE, JSON.stringify(userInfo));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getToken() }};
    }

    logout() {
        const header = this.getAuthHeader();
        this.deleteSession();
        axios.post(process.env.REACT_APP_API_URI + '/security/logout', {}, header);
    }

    getUsername(){
        var userinfo = this.getUserInfo();
        if(!userinfo) return null;
        return userinfo.username;
    }

    getToken()
    {
        var userinfo = this.getUserInfo();
        if(!userinfo) return null;
        return userinfo.token;
    }

    validateSession()
    {
        const token = this.getToken();
        return !!this.validateToken(token);
    }

    deleteSession()
    {
        localStorage.clear();
        sessionStorage.clear();
    }

    isLoggedIn() {
        return this.getToken() !== null;
    }

    validateToken()
    {
        const timestamp = this.extractToken();
        return timestamp && (timestamp.exp - Date.now()) >= 0;
    }

    extractToken()
    {
        try
        {
            if (this.getToken())
            {
                const base64Url = this.getToken().split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                var data = JSON.parse(window.atob(base64));
                data.exp *= 1000;
                data.iat *= 1000;
                return data;
            }
        }
        catch (error)
        {
            console.log(error)
        }
        return null;
    }
}

export default new SessionService();