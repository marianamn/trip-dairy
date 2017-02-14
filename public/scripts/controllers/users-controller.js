/* globals window */

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
                    // console.log(response);

                    toastr.success("Successfully signed up. Please login!");
                    window.location = "#/home";
                    //  window.location = "#/login";
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
    }

    return {
        register: function() {
            return new UsersController(usersData, templatesLoader).loadRegisterForm();
        }
    };
}());

export { usersController };