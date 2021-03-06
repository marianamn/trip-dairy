/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/trip-diaries", controllers.getAllDiaries)
        .get("/trip-diaries/:id", controllers.getDiaryById)
        .put("/trip-diaries/:id/comment", controllers.addCommentInDiary)
        .post("/add-diary", controllers.addDiary);

    app.use("/api", router);

    return router;
};