interface Data {
  id: string;
  type: string;
  attributes?: {
    [key: string]: any;
  };
  relationships?: Relationships;
  links?: Links;
  meta?: any;
}

interface Relationships {
  [key: any]: {
    data:
      | {
          id: string;
          type: string;
        }
      | { id: string; type: string }[]
      | null
      | {}; // TODO: What is this? vtr_inc.json
    links?: Links;
  };
}
