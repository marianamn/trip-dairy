/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/users/:id", controllers.getUserById)
        .get("/users", controllers.getAllUsers)
        .post("/register", controllers.register)
        .post("/login", controllers.login);
    // .post("/logout", controllers.logout);

    app.use("/auth", router);

    return router;
};