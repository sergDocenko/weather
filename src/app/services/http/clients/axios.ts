import axios, { Axios } from "axios";

class AxiosService {
  private _axios:any;
  constructor(axios: any) {
    this._axios = axios;
  }
  async get(url: string, params: any) {
    return await this._axios.get(url, { params });
  }
  //Other HTTP methods can be implemented as needed
}
const axiosInstance = axios.create();
const axiosService = new AxiosService(axiosInstance);
export default axiosService;
