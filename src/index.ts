import * as dotenv from "dotenv";
import { normalizeJAResponse } from "./normalizer";
import { JsonapiClient } from "./query/client";
dotenv.config();

type test = {
  id: string;
  name: string;
}

const main = async () => {
  const jsonapiClient = new JsonapiClient(process.env.BASE_API!, {
    "Content-Type": "application/vnd.api+json",
    Authorization: process.env.API_AUTH_TOKEN,
  });

  const res:test[] = await jsonapiClient.fetch<test[]>(["training_classes", 101], {
    // filter: {
    //   slug: "cowboy-bebop",
    //   title: {
    //     value: "foo",
    //   },
    // },
    include: ["trainer", "training_materials"].join(","),
    filter: {
      title: "BC",
    },
  });

  console.log(res);
};

main();
