import axios from "axios";
const BASE_URL = 'https://api.github.com/';

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 30000000,
});

API.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };
    return newConfig;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : -1;
    switch (status) {
      // case 500:
      //   break;
      // case -1:
      //   break;
      // case 400:
      //   break;
      case 401:
        return {};
      // case 404:
      //   break;
      default:
        break;
    }

    // Se retorna Promise.reject para que el error caiga en el catch de la ejecucion de la llamada

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ ...error });
  }
);

export { BASE_URL };

export default API;
