import axios, { setupAuthentication } from "../config/axios";

class CategoryService {
    getCategories() {
        setupAuthentication();
        return axios.get("/api/category/");
    }

    add(category){
        const queryParams = {
            name: category
        }

        setupAuthentication();
        return axios.post("/api/category/", queryParams);
    }
}

export default new CategoryService();