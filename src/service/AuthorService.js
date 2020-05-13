import axios, {setupAuthentication} from "../config/axios";
import "../styles/authors.css"

/**
 * Author service
 */
class AuthorService {
  /**
   * Fetch pagable record
   * @param actualPage
   * @param orderBy
   * @param order
   * @returns {*}
   */
  fetch(actualPage, orderBy, order) {
    const queryParams = {
      page: actualPage,
      size: 15,
      sort: orderBy + "," + order,
    }

    setupAuthentication();
    return axios.get("/api/author/", {params: queryParams});
  }

  /**
   * Fetch all records
   * @returns {*}
   */
  fetchAll() {
    const queryParams = {
      sort: "surname,asc",
    }

    setupAuthentication();
    return axios.get("/api/author/", {params: queryParams});
  }

  /**
   * Delete record
   * @param authorId
   * @returns {Q.Promise<any> | void | Promise<AxiosResponse<any>> | boolean | Promise<boolean> | IDBRequest<undefined>}
   */
  delete(authorId) {
    setupAuthentication();
    return axios.delete("/api/author/" + authorId);
  }

  /**
   * Get one author record
   * @param authorId
   * @returns {*}
   */
  get(authorId) {
    setupAuthentication();
    return axios.get("/api/author/" + authorId);
  }

  /**
   * Store record
   * @param firstname
   * @param surname
   * @param country
   * @returns {*}
   */
  add(firstname, surname, country) {
    const queryParams = {
      firstname: firstname,
      surname: surname,
      country: country,
    }
    setupAuthentication();
    return axios.post("/api/author/", queryParams);
  }

  /**
   * Update record
   * @param authorId
   * @param firstname
   * @param surname
   * @param country
   * @returns {void | Promise<AxiosResponse<any>> | IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(authorId, firstname, surname, country) {
    const queryParams = {
      firstname: firstname,
      surname: surname,
      country: country
    }
    setupAuthentication();
    return axios.put("/api/author/" + authorId, queryParams);
  }
}

export default new AuthorService();