import $ from "jquery";
import Navigo from "navigo";
import { diariesController } from "diariesController";
import { usersController } from "usersController";

const router = new Navigo(null, true);

router
    .on("home", diariesController.home)
    .on("register", usersController.register)
    .on("login", usersController.login)
    .on("logout", usersController.logout)
    .on(() => {
        router.navigate("/home");
    })
    .resolve();

$("#nav-btn-logout").on("click", () => {
    $("#nav-btn-logout").addClass("hidden");
    $("#nav-btn-login").removeClass("hidden");
    $("#nav-btn-register").removeClass("hidden");
    localStorage.removeItem("auth_key");
    localStorage.removeItem("auth_email");

    return usersController.logout;
});