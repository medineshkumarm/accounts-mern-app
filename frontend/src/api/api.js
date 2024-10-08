import axios from "axios";

// eslint-disable-next-line no-undef
const backen_url = process.env.API_URL;

const api = axios.create({
  baseURL: `${backen_url}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
});

export default api;
