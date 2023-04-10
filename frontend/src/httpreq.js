import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const ax = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  credentials: "include",
});

// 401 response interceptor
ax.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return error;
  }
);

// 500 response interceptor
ax.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 500) {
      alert("Internal server error" + error.response.data);
    }
    return error;
  }
);

export default ax;
