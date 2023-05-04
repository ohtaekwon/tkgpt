import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import queryString from "query-string";

const baseURL = process.env.REACT_APP_BASE_PATH;

const privateClient: AxiosInstance = axios.create({
  baseURL,
  // paramsSerializer는 params를 직렬화하는 옵션 함수
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    const token = localStorage.getItem("tkgpt");

    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    };
  }
);

privateClient.interceptors.response.use(
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

export default privateClient;
