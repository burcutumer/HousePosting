import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://localhost:7034/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Account = {
    login: (values: any) => requests.post('auth',values),
    register: (values: any) => requests.post('user',values),
    curentUser: () => requests.get('user'),
    updateUser: (values: any) => requests.put('user',values),
    deleteUser: () => requests.delete('user'),
}

const Ads = {
    list: ()=> requests.get('ads'),
    fetch: (id: number) => requests.get(`ads/${id}`),
    create: (values: any) => requests.post('ads', values),
    userList: (id: number) => requests.get('ads/user')
}

const agent = {
    Account,
    Ads
}

export default agent;