import axios from 'axios';
import SessionService from './SessionService';
import PopupMessagesService from "./PopupMessagesService";

const USER_API_BASE_URL = process.env.REACT_APP_API_URI + '/api/quote';

class QuoteService {
    fetchQuotes(page = 0) {
        return axios.get(USER_API_BASE_URL + '/', SessionService.getAuthHeader());
    }
}

export default new QuoteService();