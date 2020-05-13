import axios, { setupAuthentication } from "../config/axios";
import "../styles/authors.css"

class AuthorService {
    fetch(actualPage, orderBy, order) {
        const queryParams = {
            page: actualPage,
            size: 15,
            sort: orderBy+","+order,
        }

        setupAuthentication();
        return axios.get("/api/author/", {params: queryParams});
    }

    fetchAll() {
        const queryParams = {
            sort: "surname,asc",
        }

        setupAuthentication();
        return axios.get("/api/author/", {params: queryParams});
    }

    delete(authorId) {
        setupAuthentication();
        return axios.delete("/api/author/"+authorId);
    }

    get(authorId) {
        setupAuthentication();
        return axios.get("/api/author/"+authorId);
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

    update(authorId, firstname, surname, country){
        const queryParams = {
            firstname: firstname,
            surname: surname,
            country: country
        }
        setupAuthentication();
        return axios.put("/api/author/"+authorId, queryParams);
    }
}

export default new AuthorService();