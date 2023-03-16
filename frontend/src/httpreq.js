import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const ax = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

axios.defaults.withCredentials = true;

// 401 response interceptor
// ax.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       console.log(error.response);
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// 500 response interceptor

export default ax;
