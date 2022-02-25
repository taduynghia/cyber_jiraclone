import axios from "axios";

export const DOMAIN_CYBERBUG = "https://jiranew.cybersoft.edu.vn";

export const TOKEN = "access_token";
export const USER_LOGIN = "USER_LOGIN";
export const GET_USER_API = "GET_USER_API";
export const ADD_USER_PROJECT_API = "ADD_USER_PROJECT_API";
export const REMOVE_USER_PROJECT_API = "REMOVE_USER_PROJECT_API";
export const KEY_TOKEN_CYBERSOLF = "TokenCybersoft";
export const TOKEN_CYBERSOLF =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNSIsIkhldEhhblN0cmluZyI6IjIwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NTY4MzIwMDAwMCIsIm5iZiI6MTYyNjI4MjAwMCwiZXhwIjoxNjU1ODMwODAwfQ.p47FFJpArherjwlM71xTzdulAQIW37pR6fRGD3t3Ji0";
export const AUTHORIZATION = "Authorization";
//cấu hình interceptor cho axios (tất cả request gọi = axios đều được cấu hình)
//(1 dự án làm 1 lần duy nhất)
export const http = axios.create({
  baseUrl: DOMAIN_CYBERBUG,
  timeout: 30000,
});
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      [KEY_TOKEN_CYBERSOLF]: TOKEN_CYBERSOLF,
      [AUTHORIZATION]: "Bearer " + localStorage.getItem(TOKEN),
    };
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);
