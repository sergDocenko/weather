import axiosService from "./clients/axios";

class HTTP {
  private _client: any;
  constructor(client: any) {
    this._client = client;
  }
  async get(url: string, params: any={}) {
    return await this._client.get(url, params);
  }
  //Other HTTP methods can be implemented as needed
}
const httpService = new HTTP(axiosService);
export default httpService;
