import { SwaggerAPI } from "koa-joi-router-docs";
import { ParameterizedContext } from "koa";

import userRoutes from "./user";

require("dotenv").config();

const generator = new SwaggerAPI();

generator.addJoiRouter(userRoutes());

const spec = generator.generateSpec(
  {
    info: {
      title: "survey-api",
      description: "API",
      version: process.env.npm_package_version,
    },
    basePath: "/api",
    tags: [
      // TODO
    ],
  },
  {
    defaultResponses: {
      200: {
        description: "Generic successful execution.",
      },
      201: {
        description: "Used as a response to POST method execution to indicate successful creation of a resource.",
      },
      204: {
        description: "No content.",
      },
      400: {
        description:
          "Your request could not be understood by the server. This may be due to the data payload is not in the expected format.",
      },
      401: {
        description: "The request requires authentication and none was provided.",
      },
      403: {
        description: "Request failed because you do not have authorization to access a specific resource.",
      },
      404: {
        description: "The specified object could not be found.",
      },
      500: {
        description: "We had a problem with our server. Report the issue or try again later.",
      },
    },
  },
);

export const swaggerAPI = async (ctx: ParameterizedContext) => {
  ctx.body = JSON.stringify(spec, null, "  ");
};
