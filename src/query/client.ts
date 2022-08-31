import { query } from ".";
import axios from "axios";
type Model = [type: string, id?: string | number];

export class JsonapiClient {
  baseUrl: string;
  headers: { [key: string]: any };

  constructor(baseUrl: string, headers?: { [key: string]: any }) {
    this.baseUrl = baseUrl;
    this.headers = headers || {};
  }

  queryUrl = (model: Model, params: { [key: string]: any }) => {
    const modelUrl = "/" + model[0] + (model[1] ? `/${model[1]}` : "");
    return this.baseUrl + modelUrl + "?" + query(params);
  };

  query = async (model: Model, params: { [key: string]: any }) => {
    return await axios.get(this.queryUrl(model, params), {
      headers: this.headers,
    });
  };
}
