/* globals require console */
const config = require("./config");
const data = require("./data")(config.connectionString);
const controllers = require("./controllers")({ data: data });
const app = require("./config/application")({ data: data });

const middlewares = require("./middlewares");
require("./routers")({ app: app, data: data, controllers: controllers, middlewares: middlewares });

app.listen(config.port, () => {
    return console.log(`App running at: ${config.port}`);
});