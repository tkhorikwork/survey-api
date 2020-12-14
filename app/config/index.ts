const { NODE_ENV = "development", HOST = "0.0.0.0", PORT = 4000 } = process.env;

const common = {
  env: NODE_ENV,
  host: HOST,
  port: PORT,
  app_url: "http://localhost:3000",
  DB: "mongodb://localhost:27017/admin",
  s3: {
    dirName: "",
    region: "",
    accessKeyId: "",
    secretAccessKey: "",
    Bucket: "",
  },
};

const development = {
  ...common,
  jwt_secret: "",
};

const config = {
  development,
};

// @ts-ignore
export default config[NODE_ENV];
