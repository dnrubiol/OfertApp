import http from "./httpService";
import config from "../config";

const apiUrl = config.apiUrl;
const getToken = () => localStorage.getItem("token");

export function getReports() {
  return http.get(`${apiUrl}reports/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function getReportSupports(id) {
  return http.get(`${apiUrl}reportsSupports/${id}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function postReportSupport(formData, id) {
  return http.post(`${apiUrl}reportsSupports/${id}/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export function postReport(type, body, id) {
  const data = {
    type,
    body,
  };
  return http.post(`${apiUrl}reports/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
