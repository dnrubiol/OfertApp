import http from "./httpService";
import config from "../config";

const apiUrl = config.apiUrl;

const apiEndpoint = apiUrl + "auth/";

export function registerUser(formData) {
  return http.post(apiEndpoint + "register/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function login(user, password) {
  return http.post(apiEndpoint + "login/", { user, password });
}

export function logout(token) {
  return http.get(apiEndpoint + "logout/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getUserInfo(token) {
  return http.get(apiUrl + "userinfo/", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function updateUserData(modifiedData) {
  const formData = new FormData();
  if (modifiedData.profilePicture != null) {
    formData.append("profilePicture", modifiedData.profilePicture);
  }
  formData.append("firstName", modifiedData.firstName);
  formData.append("lastName", modifiedData.lastName);
  formData.append("email", modifiedData.email);
  formData.append("username", modifiedData.username);

  const token = localStorage.getItem("token");
  return http.patch(apiUrl + "userinfo/", modifiedData, {
    headers: {
      Authorization: "Bearer " + token,
    }
  });
}

export function buyMembership() {
  const token = localStorage.getItem("token");
  return http.post(apiUrl + "membership/", {}, {
    headers: {
      Authorization: "Bearer " + token,
    }
  });
}