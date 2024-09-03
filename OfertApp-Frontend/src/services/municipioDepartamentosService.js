import http from "./httpService";
import config from "../config";

const apiEndpoint = config.apiUrl;

export function getDepartments() {
  return http.get(
    apiEndpoint + "departments/"
  );
}

export function getMunicipalitiesByDepartment(departmentName) {
  return http.get(
    apiEndpoint + "municipalities/department/" + departmentName + "/"
  );
}
