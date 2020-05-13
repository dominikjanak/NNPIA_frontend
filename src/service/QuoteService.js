import axios, {setupAuthentication} from "../config/axios";

/**
 * Quote service
 */
class QuoteService {
  /**
   * Fetch pageable records
   * @param actualPage
   * @param orderBy
   * @param order
   * @returns {*}
   */
  fetch(actualPage, orderBy, order) {
    const queryParams = {
      page: actualPage,
      size: 10,
      sort: orderBy + "," + order,
    }
    setupAuthentication();
    return axios.get(`/api/quote/`, {params: queryParams});
  }

  /**
   * Delete record
   * @param quoteId
   * @returns {Q.Promise<*>|void|Promise<AxiosResponse<*>>|boolean|Promise<boolean>|IDBRequest<undefined>|Q.Promise<any>|Promise<AxiosResponse<any>>|Promise<boolean>|IDBRequest<undefined>}
   */
  delete(quoteId) {
    setupAuthentication();
    return axios.delete(`/api/quote/${quoteId}`);
  }

  /**
   * Store record
   * @param authorId
   * @param quote
   * @param categories
   * @param show
   * @returns {*}
   */
  add(authorId, quote, categories, show) {
    const queryParams = {
      authorId: authorId,
      quote: quote,
      global: show,
      categories: categories
    }
    return axios.post(`/api/quote/`, queryParams);
  }

  /**
   * Get one record
   * @param quoteId
   * @returns {*}
   */
  get(quoteId) {
    setupAuthentication();
    return axios.get(`/api/quote/${quoteId}`);
  }

  /**
   * Update record
   * @param quoteId
   * @param authorId
   * @param quote
   * @param categories
   * @param show
   * @returns {void | Promise<AxiosResponse<any>> | IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(quoteId, authorId, quote, categories, show) {
    const queryParams = {
      authorId: authorId,
      quote: quote,
      global: show,
      categories: categories
    }
    setupAuthentication();
    return axios.put(`/api/quote/${quoteId}`, queryParams);
  }

  changePublic(quoteId, newState){
    setupAuthentication();
    return axios.put(`/api/quote/${quoteId}/public/${newState}`);
  }

  getPublic(quoteId){
    return axios.get(`/api/quote/public/${quoteId}`);
  }
}

export default new QuoteService();