import http from "./httpService";
import config from "../config";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "offers/";

function publicationUrl(id) {
    return `${apiEndpoint}${id}/`;
}

export function addOffer(publicationId, offer) {
    const token = localStorage.getItem("token");
    return http.post(publicationUrl(publicationId), offer, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}