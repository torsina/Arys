const privateConfig = require("./config_private");
const config = {
    env: "dev",
    oauthScopes: ["identify", "guilds"],
    token: privateConfig.token.dev,
    sentry: privateConfig.sentry
};
config.db = privateConfig.db;
config.token = privateConfig.token;
module.exports = config;