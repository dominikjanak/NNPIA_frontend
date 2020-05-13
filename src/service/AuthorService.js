import axios, { setupAuthentication } from "../config/axios";

class AuthorService {
    fetch() {
        setupAuthentication();
        return axios.get("/api/author/");
    }

    add(firstname, surname, country){
        const queryParams = {
            firstname: firstname,
            surname: surname,
            country: country,
        }

        setupAuthentication();
        return axios.post("/api/author/", queryParams);
    }
}

export default new AuthorService();