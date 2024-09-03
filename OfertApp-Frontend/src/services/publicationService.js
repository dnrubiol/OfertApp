import http from "./httpService";
import config from "../config";
const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "publications/";

function publicationUrl(id) {
  return `${apiEndpoint}${id}/`;
}

export function getPublications(params) {
  return http.get(apiEndpoint, { params });
}

export function getPublication(publicationId, token) {
  const headers = token
    ? {
      Authorization: "Bearer " + token,
    }
    : {};
  return http.get(publicationUrl(publicationId), { headers });
}

export function createPublication(publicationData) {
  const token = localStorage.getItem("token");

  return http.post(apiEndpoint, publicationData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updatePublication(publication) {
  return http.put(publicationUrl(publication.id), publication);
}

export function deletePublication(publicationId) {
  return http.delete(publicationUrl(publicationId));
}

export function setDeliveryInformation(publicationId, data) {
  const token = localStorage.getItem("token");
  return http.post(apiEndpoint + "delivery/" + publicationId + "/", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function confirmDelivery(publicationId) {
  const token = localStorage.getItem("token");
  return http.post(apiEndpoint + "confirm/" + publicationId + "/", {}, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function addComment(publicationId, parentId, comment) {
  const token = localStorage.getItem("token");
  let route = apiUrl + "comments/" + publicationId + "/";

  // Check if this comment is a reply to another one
  if (parentId)
    route += parentId + "/";

  return http.post(route, comment, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
export function getCategories() {
  return http.get(apiUrl + "categories/");
}