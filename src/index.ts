import * as dotenv from "dotenv";
import { normalizeJAResponse } from "./normalizer";
import { JsonapiClient } from "./query/client";
dotenv.config();

const main = async () => {
  const jsonapiClient = new JsonapiClient(process.env.BASE_API!, {
    "Content-Type": "application/vnd.api+json",
    Authorization: process.env.API_AUTH_TOKEN,
  });

  const res = await jsonapiClient.query(["training_classes", 101], {
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

  const normalizedData = normalizeJAResponse(res.data);
  console.log(normalizedData);
};

main();
