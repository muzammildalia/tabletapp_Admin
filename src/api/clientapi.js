import axios from "axios";
export default axios.create({
    baseURL:
        // "http://localhost:8080/api/v1/",
        "https://tabletplanner.prosoulsinc.com/api/v1/"
});