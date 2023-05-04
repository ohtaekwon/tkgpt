import axios, { AxiosRequestConfig } from "axios";
import queryString from "query-string";

const baseURL = process.env.REACT_APP_BASE_PATH;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    return {
      ...config,
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    };
  }
);
publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      console.info("응답을 받았습니다.");

      return response.data;
    }

    return response;
  },
  (error) => {
    throw error.response.data;
  }
);

export default publicClient;
