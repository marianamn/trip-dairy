/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/diaries", controllers.getAllDiaries)
        .get("/diaries/:id", controllers.getDiaryById);

    app.use("/api", router);

    return router;
};