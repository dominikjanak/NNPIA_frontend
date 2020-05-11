import axios from 'axios';
import SesstionService from './SesstionService';

const USER_API_BASE_URL = process.env.REACT_APP_API_URI + '/users';

class UserService {

    fetchUsers() {
        return axios.get(USER_API_BASE_URL, SesstionService.getAuthHeader());
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId, SesstionService.getAuthHeader());
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId, SesstionService.getAuthHeader());
    }

    addUser(user) {
        return axios.post(""+USER_API_BASE_URL, user, SesstionService.getAuthHeader());
    }

    editUser(user) {
        return axios.put(USER_API_BASE_URL + '/' + user.id, user, SesstionService.getAuthHeader());
    }

}

export default new UserService();