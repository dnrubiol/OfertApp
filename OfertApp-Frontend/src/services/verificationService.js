import http from "./httpService";
import config from "../config";

const apiUrl = config.apiUrl + "auth/verify-email/";

export function verify(token, userid) {
  return http.get(apiUrl + token + "/" + userid + "/");
}