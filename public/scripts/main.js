/* globals localStorage*/

import $ from "jquery";
import Navigo from "navigo";
import { aboutController } from "aboutController";
import { contactsController } from "contactsController";
import { diariesController } from "diariesController";
import { homeController } from "homeController";
import toastr from "toastr";
import { usersController } from "usersController";

const router = new Navigo(null, true);

router
    .on("trip-diaries/category/:category", diariesController.diariesByCategory)
    .on("trip-diaries/:id", diariesController.diaryById)
    .on("home", homeController.home)
    .on("trip-diaries-by-author", diariesController.diariesByUser)
    .on("add-diary", diariesController.addNewDiary)
    .on("users/:id", usersController.userById)
    .on("about", aboutController.about)
    .on("contacts", contactsController.contacts)
    .on("register", usersController.register)
    .on("login", usersController.login)
    .on("logout", usersController.logout)
    .on(() => {
        router.navigate("/home");
    })
    .resolve();

let loggedUserEmail = localStorage.getItem("auth_email");

if (loggedUserEmail !== null) {
    $("#nav-btn-logout").removeClass("hidden");
    $("#nav-btn-login").addClass("hidden");
    $("#nav-btn-register").addClass("hidden");
    $(".add-diary").removeClass("hidden");
}