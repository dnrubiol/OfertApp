import http from "./httpService";
import config from "../config";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "reactions/";

function publicationUrl(id) {
    return `${apiEndpoint}${id}/`;
}

export function addReaction(commentId, reaction) {
    const token = localStorage.getItem("token");
    return http.post(publicationUrl(commentId), reaction, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}