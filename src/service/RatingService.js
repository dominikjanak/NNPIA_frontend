import axios, {setupAuthentication} from "../config/axios";

/**
 * Rating service
 */
class RatingService {
  /**
   * Store quote rating
   * @param quoteId
   * @param score
   * @returns {*}
   */
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