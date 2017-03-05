/* globals window localStorage*/

import $ from "jquery";
import { CONSTANTS } from "constants";
import Handlebars from "handlebars";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { usersData } from "usersData";

let usersController = (function() {
    class UsersController {
        constructor(data, templates) {
            this.data = data;
            this.templates = templates;
        }

        registerUser(newUser) {
            // console.log(newUser);

            this.data.register(newUser)
                .then((response) => {

                    toastr.success("Successfully signed up. Please login!");
                    window.location = "#/login";
                })
                .catch((error) => {
                    toastr.error("Sign up was unsuccessfull, please try again!");
                    window.location = "#/register";
                });
        }

        loadRegisterForm() {
            this.templates.get("register")
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate());

                    $("#btn-register").on("click", () => {
                        let newUser = {
                            email: $("#tb-email").val(),
                            firstName: $("#tb-firstName").val(),
                            lastName: $("#tb-lastName").val(),
                            profileImgURL: $("#tb-profileImgURL").val(),
                            password: $("#tb-newPassword").val(),
                            facebookContact: $("#tb-facebookContact").val(),
                            youTubeContact: $("#tb-youTubeContact").val(),
                            twitterContact: $("#tb-twitterContact").val(),
                            googlePlusContact: $("#tb-googlePlusContact").val(),
                            instagramContact: $("#tb-instagramContact").val(),
                            rssContact: $("#tb-rssContact").val()
                        };

                        if (newUser.password.length < CONSTANTS.PASSWORD_MIN_LENGTH || newUser.password.length > CONSTANTS.PASSWORD_MAX_LENGTH) {
                            toastr.error("Password must be between 3 and 20 symbols long!");
                            return;
                        }
                        if (/\W+/.test(newUser.firstName)) {
                            toastr.error("First name contains invalid symbols!");
                            return;
                        }


                        if (/\W+/.test(newUser.lastName)) {
                            toastr.error("Last contains invalid symbols!");
                            return;
                        }

                        if (/\W+/.test(newUser.password)) {
                            toastr.error("Password contains invalid symbols!");
                            return;
                        }

                        this.registerUser(newUser);
                    });
                });
        }

        loginUser(user) {
            this.data.login(user)
                .then((response) => {
                    $("#nav-btn-logout").removeClass("hidden");
                    $("#nav-btn-register").addClass("hidden");
                    $("#nav-btn-login").addClass("hidden");

                    localStorage.setItem("auth_key", response.body.token);
                    localStorage.setItem("auth_email", response.body.email);

                    toastr.success("Login successful!");
                    window.location = "#/home";
                }, (error) => {
                    toastr.error("Invalid email or password!");
                    window.location = "#/login";
                });
        }

        loadLoginForm() {
            this.templates.get("login")
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate());

                    $("#btn-login").on("click", () => {
                        let user = {
                            email: $("#tb-email").val(),
                            password: $("#tb-password").val()
                        };

                        this.loginUser(user);
                    });
                });
        }

        logoutUser() {
            this.data.logout()
                .then(() => {
                    $("#nav-btn-logout").on("click", () => {
                        $("#nav-btn-logout").addClass("hidden");
                        $("#nav-btn-login").removeClass("hidden");
                        $("#nav-btn-register").removeClass("hidden");

                        localStorage.removeItem("auth_key");
                        localStorage.removeItem("auth_email");
                        let msg = `${localStorage.getItem("auth_email")} logged out successfuly!`;
                        toastr.success(msg);
                    });

                });
        }

        userById(params) {
            let user;
            let id = params["id"];

            this.data.getUserById(id)
                .then((response) => {
                    user = response.data;

                    return this.templates.get("diary-author-details");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(user));
                });
        }
    }

    let userConroller = new UsersController(usersData, templatesLoader);

    return {
        register: function() {
            return userConroller.loadRegisterForm();
        },
        login: function() {
            return userConroller.loadLoginForm();
        },
        logout: function() {
            return userConroller.logoutUser();
        },
        userById: function(params) {
            return userConroller.userById(params);
        }
    };
}());

export { usersController };