import { query } from ".";
import axios, { Axios } from "axios";
import { normalizeJAResponse } from "../normalizer";
type Model = [type: string, id?: string | number];

type FuncFetch = <T extends Normalized | Normalized[]>(
  model: Model,
  params: QueryParams
) => Promise<T>;


export class JsonapiClient {
  axios: Axios;
  baseUrl: string;
  headers: { [key: string]: any };

  constructor(
    baseUrl: string,
    headers?: { [key: string]: any },
    axiosOptions?: any
  ) {
    this.baseUrl = baseUrl;
    this.headers = {
      ...{
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      ...headers,
    };
    this.axios = axios.create({
      ...{ baseURL: baseUrl },
      ...axiosOptions,
    });
  }

  queryUrl = (model: Model, params: QueryParams) => {
    const modelUrl = "/" + model[0] + (model[1] ? `/${model[1]}` : "");
    return modelUrl + "?" + query(params);
  };
  
  fetch<T extends Normalized>(model: Model, params: QueryParams): Promise<T>;
  fetch<T extends Normalized[]>(model: Model, params: QueryParams): Promise<T[]>;
  fetch = async <T extends (Normalized|Normalized[])>(model: Model, params: QueryParams):Promise<T|T[]> => {
    const res = await this.axios.get(this.queryUrl(model, params), {
      headers: this.headers,
    });
    return normalizeJAResponse<T>(res.data);
  };

}
