// This service will help us with retreiving some configuration data from the server
// i.e. PayPal's client ID

import http from "./httpService";
import config from "../config";
const requestURL = config.apiUrl + "config/";

export function getConfig() {
    const token = localStorage.getItem("token");
    return http.get(requestURL, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}