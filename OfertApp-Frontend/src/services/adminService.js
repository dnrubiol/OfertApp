// This service will help us with retreiving some configuration data from the server
// i.e. PayPal's client ID

import http from "./httpService";
import config from "../config";

const requestURL = config.apiUrl + "admin/";

export function deletePublication(publicationId) {
    const token = localStorage.getItem("token");
    return http.delete(requestURL + "publications/" + publicationId + "/",
        {
            headers: {
                "Authorization": "Bearer " + token,
            },
        });
}

export function deleteComment(commentId) {
    const token = localStorage.getItem("token");
    return http.delete(requestURL + "comments/" + commentId + "/",
        {
            headers: {
                "Authorization": "Bearer " + token,
            },
        });
}

export function deleteUser(userId) {
    const token = localStorage.getItem("token");
    return http.delete(requestURL + "users/" + userId + "/",
        {
            headers: {
                "Authorization": "Bearer " + token,
            },
        });
}

export function editReport(reportId, data) {
    const token = localStorage.getItem("token");
    return http.post(requestURL + "reports/" + reportId + "/", data,
        {
            headers: {
                "Authorization": "Bearer " + token,
            },
        });
}