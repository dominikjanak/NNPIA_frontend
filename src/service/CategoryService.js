import axios, {setupAuthentication} from "../config/axios";

/**
 * Category service
 */
class CategoryService {
  /**
   * Fetch pagable records
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
    return axios.get("/api/category/", {params: queryParams});
  }

  /**
   * Fetch all records
   * @returns {*}
   */
  fetchAll() {
    const queryParams = {
      sort: "name,asc",
    }

    setupAuthentication();
    return axios.get("/api/category/", {params: queryParams});
  }

  /**
   * Store record
   * @param category
   * @returns {*}
   */
  add(category) {
    const queryParams = {
      name: category
    }
    setupAuthentication();
    return axios.post("/api/category/", queryParams);
  }

  /**
   * Delete record
   * @param categoryId
   * @returns {Q.Promise<*>|void|Promise<AxiosResponse<*>>|boolean|Promise<boolean>|IDBRequest<undefined>|Q.Promise<any>|Promise<AxiosResponse<any>>|Promise<boolean>|IDBRequest<undefined>}
   */
  delete(categoryId) {
    setupAuthentication();
    return axios.delete("/api/category/" + categoryId);
  }

  /**
   * Get one records
   * @param categoryId
   * @returns {*}
   */
  get(categoryId) {
    setupAuthentication();
    return axios.get("/api/category/" + categoryId);
  }

  /**
   * Update record
   * @param categoryId
   * @param name
   * @returns {void | Promise<AxiosResponse<any>> | IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(categoryId, name) {
    const queryParams = {
      name: name
    }
    setupAuthentication();
    return axios.put("/api/category/" + categoryId, queryParams);
  }
}

export default new CategoryService();