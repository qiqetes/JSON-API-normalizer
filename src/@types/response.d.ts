interface DataResponse {
  data: Data | Data[] | null;
  included?: Included[];
  links?: Links;
  jsonapi?: any; // TODO:
}

interface NullDataResponse {
  data: null;
  included: never;
  links?: Links;
  jsonapi?: any; // TODO:
}

interface ErrorResponse {
  errors: Error[];
  data: never;
  included: never;
}

/**
 * The response from the json api server
 */
type JAResponse = DataResponse | ErrorResponse | NullDataResponse;
