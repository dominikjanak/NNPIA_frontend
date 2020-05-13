import axios, { setupAuthentication } from "../config/axios";

class QuoteService {
    fetch(actualPage, orderBy, order) {
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

    add(authorId, quote, categories){
        const queryParams = {
            authorId: authorId,
            quote: quote,
            global: true,
            categories: categories
        }
        return axios.post("/api/quote/", queryParams);
    }

    get(quoteId) {
        setupAuthentication();
        return axios.get("/api/quote/"+quoteId);
    }

    update(quoteId, authorId, quote, categories){
        const queryParams = {
            authorId: authorId,
            quote: quote,
            global: true,
            categories: categories
        }
        console.log(queryParams);
        setupAuthentication();
        return axios.put("/api/quote/"+quoteId, queryParams);
    }
}

export default new QuoteService();