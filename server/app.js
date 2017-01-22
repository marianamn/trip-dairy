/* globals require console */
var config = require('./config');
var data = require('./data')(config.connectionString);
var controllers = require('./controllers')({ data: data });
var app = require('./config/application')({ data: data });
require('./routers')({ app: app, data: data, controllers: controllers });

app.listen(config.port, function() { return console.log("App running at: " + config.port); });