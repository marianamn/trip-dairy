/* globals module require */

const express = require("express"),
    passport = require("passport");

let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/register", controllers.getRegisterForm)
        // .get("/login", controllers.getLoginForm)
        // .get("/facebook", passport.authenticate("facebook"))
        // //.get("/unauthorized", controllers.unauthorized)
        // .get("/facebook/callback", passport.authenticate("facebook", { scope: "email", failureRedirect: "/auth/login" }),
        //     (req, res) => {
        //         res.redirect("/");
        //     })
        // .post("/login", controllers.login)
        .post("/register", controllers.register)
        // .post("/logout", middlewares.isAuthenticated, controllers.logout);

    app.use("/auth", router);

    return router;
};