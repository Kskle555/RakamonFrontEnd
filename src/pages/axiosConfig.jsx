import axios from "axios";

const api = axios.create({
  baseURL: "https://oguzhanbilgi.com/api", // API base URL
});

// Token'ı header'a ekleme
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // localStorage'dan token al  
    console.log("Interceptors içinde alınan token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
     
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
