import axios from "../config/axios";

const SESSION_VARIABLE = '__session';

/**
 * Session service
 */
class SessionService {

  /**
   * Login request
   * @param username
   * @param password
   * @returns {*}
   */
  login(username, password) {
    return axios.post("/security/login", {
      username: username,
      password: password
    });
  }

  /**
   * Reqister request
   * @param username
   * @param password
   * @param firstname
   * @param surname
   * @param email
   * @returns {*}
   */
  register(username, password, firstname, surname, email) {
    return axios.post("/security/register", {
      username: username,
      firstname: firstname,
      surname: surname,
      password: password,
      email: email
    });
  }

  /**
   * Get user info
   * @returns {any}
   */
  getUserInfo() {
    return JSON.parse(localStorage.getItem(SESSION_VARIABLE));
  }

  /**
   * Set user info
   * @param userInfo
   */
  setUserInfo(userInfo) {
    localStorage.setItem(SESSION_VARIABLE, JSON.stringify(userInfo));
  }

  /**
   * Get authentication header
   * @returns {string|undefined}
   */
  getAuthHeader() {
    const token = this.getToken();
    if (token === undefined) {
      return undefined;
    }
    return 'Bearer ' + token;
  }

  /**
   * Logout
   */
  logout() {
    const header = this.getAuthHeader();
    this.deleteSession();
    axios.post('/security/logout', {}, header);
  }

  /**
   * Get username
   * @returns {null|string|T|string}
   */
  getUsername() {
    var userinfo = this.getUserInfo();
    if (!userinfo) return null;
    return userinfo.username;
  }

  /**
   * Get token
   * @returns {CancelToken|null}
   */
  getToken() {
    var userinfo = this.getUserInfo();
    if (!userinfo) return null;
    return userinfo.token;
  }

  /**
   * Validate session
   * @returns {boolean}
   */
  validateSession() {
    const token = this.getToken();
    return !!this.validateToken(token);
  }

  /**
   * Delete session
   */
  deleteSession() {
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * Check if user is logged in
   * @returns {boolean}
   */
  isLoggedIn() {
    return this.getToken() !== null;
  }

  /**
   * Validate token
   * @returns {boolean}
   */
  validateToken() {
    const timestamp = this.extractToken();
    return timestamp && (timestamp.exp - Date.now()) >= 0;
  }

  /**
   * Extract token
   * @returns {null|any}
   */
  extractToken() {
    try {
      if (this.getToken()) {
        const base64Url = this.getToken().split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        var data = JSON.parse(window.atob(base64));
        data.exp *= 1000;
        data.iat *= 1000;
        return data;
      }
    } catch (error) {
      console.log(error)
    }
    return null;
  }
}

export default new SessionService();