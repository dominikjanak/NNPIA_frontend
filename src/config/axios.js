import axios from 'axios';
import SessionService from "../service/SessionService";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (rejected) {
  if (rejected.response.status === 401) {
    SessionService.logout();
    window.location.href = '/logout';
  }
  return Promise.reject(rejected);
});

export function setupAuthentication() {
  instance.defaults.headers.common['Authorization'] = SessionService.getAuthHeader();
}

export default instance;