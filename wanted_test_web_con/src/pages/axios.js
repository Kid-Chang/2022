import axios from "axios";

const API = axios.create({
    BASE_URL: "https://www.misoispeace.shop/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default API;
