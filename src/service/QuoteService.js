import axios, { setupAuthentication } from "../config/axios";

class QuoteService {
    fetchQuotes(actualPage, orderBy, order) {

        const queryParams = {
            page: actualPage,
            size: 25,
            sort: orderBy+","+order,
        }
        setupAuthentication();
        return axios.get("/api/quote/", {params: queryParams});
    }

    delete(quoteId) {
        setupAuthentication();
        return axios.delete("/api/quote/"+quoteId);
    }
}

export default new QuoteService();