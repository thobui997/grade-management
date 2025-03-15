import axios, { AxiosError, AxiosInstance } from 'axios';

export class HttpClient {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.request.use(
      (config) => {
        config.headers = config.headers ?? {};
        const authInfo = localStorage.getItem('site') ? JSON.parse(localStorage.getItem('site') || '') : null;
        if (authInfo) {
          config.headers['Authorization'] = `Bearer ${authInfo.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err: AxiosError) => {
        const status = err.response?.status ?? 0;

        if (status === 403) {
          window.location.href = '/dang-nhap';
        }

        if (status >= 500 && status <= 599) {
          window.location.href = '/500';
        }

        return Promise.reject(err);
      }
    );
  }
}

const httpClient = new HttpClient().instance;

export default httpClient;
