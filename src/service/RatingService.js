import axios, { setupAuthentication } from "../config/axios";

class RatingService {
    rateQuote(quoteId, score) {

        const queryParams = {
            quoteId: quoteId,
            score: score
        }
        setupAuthentication();
        return axios.post("/api/rating/", queryParams);
    }
}

export default new RatingService();