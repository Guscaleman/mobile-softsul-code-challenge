import axios from "axios";

export const api = axios.create({
    baseURL: "https://mobile-code-challenge-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
