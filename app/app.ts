import * as Koa from "koa";
import config from "./config";
import middlewares from "./middlewares";
import * as koaSwagger from "koa2-swagger-ui";
import { swaggerInterceptResponse, swaggerInterceptRequest } from "./swagger";
import { swaggerAPI } from "./routes/swagger";
import * as Router from "koa-router";
import { getAliveHandler } from "./controllers/utils.controller";
import router from "./routes";
import * as mongoose from "mongoose";

const env = process.env.NODE_ENV || "development";
const { host, port, app_url, DB } = config;
const app: Koa = new Koa();

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(middlewares());

const publicRouter = new Router({ prefix: "/api/v1" });
publicRouter.get("/alive", getAliveHandler).get("/_api.json", swaggerAPI);

app.use(publicRouter.routes());
app.use(router.routes());
app.use(
  // @ts-ignore
  koaSwagger({
    routePrefix: "/swagger",
    swaggerOptions: {
      url: env === "development" ? `http://${host}:${port}/api/v1/_api.json` : `${app_url}/api/v1/_api.json`,
      requestInterceptor: swaggerInterceptRequest,
      responseInterceptor: swaggerInterceptResponse,
      modelPropertyMacro: () => {},
    },
  }),
);

app.on("error", (err, ctx) => {
  console.error(err);
});

app.listen(port, host, () => console.log(`listening on http://${host}:${port}`));
