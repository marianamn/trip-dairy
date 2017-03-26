/* globals window localStorage*/

import $ from "jquery";
import { CONSTANTS } from "constants";
import Handlebars from "handlebars";
import { UTILS } from "utils";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { usersData } from "usersData";

let usersController = (function() {
    class UsersController {
        constructor(data, templates) {
            this.data = data;
            this.templates = templates;
        }

        register() {
            this.templates.get("register")
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate());

                    $("#btn-register").on("click", (evt) => {
                        evt.preventDefault();

                        let newUser = {
                            email: $("#tb-email").val(),
                            firstName: $("#tb-firstName").val(),
                            lastName: $("#tb-lastName").val(),
                            profileImgURL: $("#tb-profileImgURL").val(),
                            password: $("#tb-newPassword").val(),
                            userInfo: $("#tb-userInfo").val(),
                            facebookContact: $("#tb-facebookContact").val(),
                            youTubeContact: $("#tb-youTubeContact").val(),
                            twitterContact: $("#tb-twitterContact").val(),
                            googlePlusContact: $("#tb-googlePlusContact").val(),
                            instagramContact: $("#tb-instagramContact").val(),
                            rssContact: $("#tb-rssContact").val()
                        };

                        // if (newUser.password.length < CONSTANTS.PASSWORD_MIN_LENGTH || newUser.password.length > CONSTANTS.PASSWORD_MAX_LENGTH) {
                        //     toastr.error("Password must be between 3 and 20 symbols long!");
                        //     return;
                        // }
                        // if (/\W+/.test(newUser.firstName)) {
                        //     toastr.error("First name contains invalid symbols!");
                        //     return;
                        // }


                        // if (/\W+/.test(newUser.lastName)) {
                        //     toastr.error("Last contains invalid symbols!");
                        //     return;
                        // }

                        // if (/\W+/.test(newUser.password)) {
                        //     toastr.error("Password contains invalid symbols!");
                        //     return;
                        // }

                        this.data.register(newUser)
                            .then((response) => {

                                toastr.success("Successfully signed up. Please login!");
                                window.location = "#/login";
                            })
                            .catch((error) => {
                                console.log(error);
                                toastr.error("Sign up was unsuccessfull, please try again!");
                                window.location = "#/register";
                            });

                        return false;
                    });
                });
        }

        login() {
            this.templates.get("login")
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate());

                    $("#btn-login").on("click", (evt) => {
                        evt.preventDefault();
                        let user = {
                            email: $("#tb-email").val(),
                            password: $("#tb-password").val()
                        };

                        this.data.login(user)
                            .then((response) => {
                                $("#nav-btn-logout").removeClass("hidden");
                                $(".add-diary").removeClass("hidden");
                                $("#nav-btn-register").addClass("hidden");
                                $("#nav-btn-login").addClass("hidden");

                                localStorage.setItem("auth_key", response.body.token);
                                localStorage.setItem("auth_email", response.body.email);

                                usersData.getAllUsers()
                                    .then((res) => {
                                        let users = res.data;
                                        let foundUser = UTILS.HELPER_FUNCTIONS.getUserInfoByEmail(users, response.body.email);

                                        localStorage.setItem("profileImg", foundUser.profileImgURL);
                                        localStorage.setItem("fullName", `${foundUser.firstName} ${foundUser.lastName}`);
                                    });

                                toastr.success("Sign in successfully!");
                                window.location = "#/home";
                            }, (error) => {
                                console.log(error);
                                toastr.error("Invalid email or password!");
                                window.location = "#/login";
                            });
                        return false;
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
            return userConroller.register();
        },
        login: function() {
            return userConroller.login();
        },
        userById: function(params) {
            return userConroller.userById(params);
        }
    };
}());

export { usersController };