/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .post("/register", controllers.register)
        .post("/login", controllers.login)
        .get("/users/:id", controllers.getUserById)
        .get("/users", controllers.getAllUsers);

    app.use("/auth", router);

    return router;
};