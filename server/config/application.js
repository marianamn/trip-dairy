'use strict';
var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function() {
    var app = express();
    app.use('/libs', express.static('./node_modules'));
    app.use('/static', express.static('../../client'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    return app;
};