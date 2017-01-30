/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/users", controllers.getAllUsernames);
    // .get("/:username", middlewares.isAuthenticated, controllers.getUserProfile)
    // .put("/profile", middlewares.isAuthenticated, controllers.updateProfile)
    // .put("/users/:username", middlewares.isAuthenticated, middlewares.isAdmin, controllers.updateUserRole)
    // .get("/:userId", controllers.getUserByUserId);

    app.use("/api", router);

    return router;
};