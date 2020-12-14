import * as cors from "koa2-cors";
// @ts-ignore
import * as respond from "koa-respond";
import * as logger from "koa-logger";
import * as bodyParser from "koa-bodyparser";
// @ts-ignore
import { compose } from "koa-convert";
// @ts-ignore
import * as responseTime from "koa-response-time";
import corsOptions from "./cors.options";
import bodyParserOptions from "./bodyparser.options";
import respondOptions from "./respond.options";

import ErrorHandler from "./errorHandler";

const middlewares = [
  responseTime(),
  logger(),
  bodyParser(bodyParserOptions),
  cors(corsOptions),
  respond(respondOptions),
  ErrorHandler,
];

export default () => compose(middlewares);
