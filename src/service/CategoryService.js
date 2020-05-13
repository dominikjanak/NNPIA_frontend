import axios, { setupAuthentication } from "../config/axios";

class CategoryService {
    fetch(actualPage, orderBy, order) {
        const queryParams = {
            page: actualPage,
            size: 15,
            sort: orderBy+","+order,
        }

        setupAuthentication();
        return axios.get("/api/category/", {params: queryParams});
    }

    fetchAll() {
        const queryParams = {
            sort: "name,asc",
        }

        setupAuthentication();
        return axios.get("/api/category/", {params: queryParams});
    }

    add(category){
        const queryParams = {
            name: category
        }
        setupAuthentication();
        return axios.post("/api/category/", queryParams);
    }

    delete(categoryId) {
        setupAuthentication();
        return axios.delete("/api/category/"+categoryId);
    }

    get(categoryId) {
        setupAuthentication();
        return axios.get("/api/category/"+categoryId);
    }

    update(categoryId, name){
        const queryParams = {
            name: name
        }
        setupAuthentication();
        return axios.put("/api/category/"+categoryId, queryParams);
    }
}

export default new CategoryService();