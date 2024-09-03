import http from "./httpService";
import config from "../config";

const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "statistics/";

export function getStatistics(token, params) {
    return http.get(apiEndpoint, {
        headers: {
            Authorization: "Bearer " + token,
        },
        params: params,
    });
}

