import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
    const req = axios.post("/api/users/login", dataToSubmit).then((res) => {
        return res.data;
    });

    // console.log("user_action: Login");
    // console.log(req);
    return {
        type: LOGIN_USER,
        payload: req,
    };
}

export function registerUser(dataToSubmit) {
    const req = axios.post("/api/users/register", dataToSubmit).then((res) => {
        return res.data;
    });

    // console.log("user_action: Register");
    // console.log(req);
    return {
        type: REGISTER_USER,
        payload: req,
    };
}

export function auth() {
    const req = axios.get("/api/users/auth").then((res) => {
        return res.data;
    });

    // console.log("user_action: auth");
    // console.log(req);
    return {
        type: AUTH_USER,
        payload: req,
    };
}
