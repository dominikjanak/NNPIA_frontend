import axios from 'axios';
import SessionService from "../service/SessionService";
import {withRouter} from "react-router-dom";

/**
 * Set base url for Axios request
 * @type {AxiosInstance}
 */
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI
});

/**
 * Validte session
 */
instance.interceptors.response.use(function (response) {
  return response;
}, function (rejected) {
  try {
    if (rejected.response.status === 401) {
      SessionService.logout();
      window.location.href = '/logout';
    }
  } catch (error) {
    window.location.href = '/logout';
  }
  return Promise.reject(rejected);
});

/**
 * Set autentication header to request
 */
export function setupAuthentication() {
  instance.defaults.headers.common['Authorization'] = SessionService.getAuthHeader();
}

export default withRouter(instance);