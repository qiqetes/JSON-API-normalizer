interface QueryParams {
  fields?: any;
  filter?: { [key: string]: any };
  include?: string | string[];
  sort?: string;
  page?: {
    limit?: number;
    offset?: number;
    number?: number;
    size?: number;
    before?: string;
    after?: string;
  };
}
