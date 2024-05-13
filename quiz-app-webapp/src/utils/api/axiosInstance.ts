import axios from 'axios';

// const protocol = (process.env.REACT_APP_BACKEND_PROTOCOL || "").toString() ?? "http://";
// const host = (process.env.REACT_APP_BACKEND_HOST || "").toString() ?? "localhost";
// const port = process.env.REACT_APP_BACKEND_PORT ? ":" + (process.env.REACT_APP_BACKEND_PORT || "").toString() : "";
// export const baseURL = process.env.REACT_APP_ENV === "dev" ? protocol + host + port : 'http://103.45.245.55:3001';
// console.log("Base url: ", baseURL);

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AxiosCreateOptions = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
};

export const axiosInstance = axios.create(AxiosCreateOptions);
