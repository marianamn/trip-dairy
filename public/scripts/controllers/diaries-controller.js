/* globals window localStorage*/

import $ from "jquery";
import Handlebars from "handlebars";
import { UTILS } from "utils";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { tripsDiariesData } from "diariesData";
import { usersData } from "usersData";

let diariesController = (function() {

    class DiariesConroller {
        constructor(data, templates) {
            this.data = data;
            this.templates = templates;
        }

        diaryById(params) {
            let tripDiary;
            let id = params["id"];

            this.data.getTripDiaryById(id)
                .then((response) => {
                    tripDiary = response.data;

                    return this.templates.get("diary-details");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripDiary));
                });
        }

        diariesByCategory(params) {
            let tripDiary;
            let category = params["category"];

            this.data.getAllTripsDiaries()
                .then((trips) => {
                    tripDiary = UTILS.HELPER_FUNCTIONS.tripDiariesByCategory(trips, category);
                    // console.log(tripDiary);

                    return this.templates.get("trips-by-category");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripDiary));
                });
        }

        diariesByUser() {
            let tripsData,
                users,
                user;

            this.data.getAllTripsDiaries()
                .then((trips) => {
                    tripsData = UTILS.HELPER_FUNCTIONS.getTripsByAuthor(trips);

                    usersData.getAllUsers()
                        .then((response) => {
                            users = response.data;

                            tripsData.forEach((trip) => {
                                user = UTILS.HELPER_FUNCTIONS.getUserInfo(users, trip.author);

                                trip.userInfo = {
                                    _id: user._id,
                                    fullName: `${user.firstName} ${user.lastName}`,
                                    profileImage: user.profileImgURL,
                                    facebookContact: user.facebookContact,
                                    youTubeContact: user.youTubeContact,
                                    twitterContact: user.twitterContact,
                                    googlePlusContact: user.googlePlusContact,
                                    instagramContact: user.instagramContact,
                                    rssContact: user.rssContact
                                };
                            });
                        });

                    return this.templates.get("diaries-by-author");
                })
                .then((html) => {
                    // console.log(tripsData);

                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripsData));
                });
        }

        addNewDiary() {
            let users;

            this.templates.get("add-diary")
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate());

                    $("#btn-add-diary").on("click", () => {
                        usersData.getAllUsers()
                            .then((response) => {
                                users = response.data;
                                let fullName = UTILS.HELPER_FUNCTIONS.getUserFullName(users, localStorage.getItem("auth_email"));

                                let newDiary = {
                                    title: $("#tb-title").val(),
                                    author: fullName,
                                    place: $("#tb-place").val(),
                                    category: $("#tb-category option:selected").text(),
                                    content: $("#tb-content").val(),
                                    postDate: Date.now(),
                                    mainImage: $("#tb-mainImage").val(),
                                    images: $("#tb-images").val()
                                };

                                console.log(newDiary);

                                this.data.addDiary(newDiary)
                                    .then(() => {
                                        toastr.success("Diary successfully added!");
                                        window.location = "#/home";
                                    })
                                    .catch((error) => {
                                        toastr.error(error);
                                        window.location = "#/add-diary";
                                    });
                            });
                    });
                });
        }

    }

    let diariesConroller = new DiariesConroller(tripsDiariesData, templatesLoader);

    return {
        diaryById: function(params) {
            return diariesConroller.diaryById(params);
        },
        diariesByCategory: function(params) {
            return diariesConroller.diariesByCategory(params);
        },
        diariesByUser: function() {
            return diariesConroller.diariesByUser();
        },
        addNewDiary: function() {
            return diariesConroller.addNewDiary();
        }
    };
}());

export { diariesController };