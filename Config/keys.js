const env = process.env;
const keys = {
  app: {
    port: env.PORT,
    server_url: env,
  },
  database: {
    url: env.MONGODB_URL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    tokenLife: env.JWT_TOKENLIFE,
  },
  sparkpost_secret: env.SPARKPOST_SECRET,
};

export default keys;
