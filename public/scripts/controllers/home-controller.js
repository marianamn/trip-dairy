import $ from "jquery";
import Handlebars from "handlebars";
import { UTILS } from "utils";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { tripsDiariesData } from "diariesData";


const TRIPS_BY_PAGE = 6;
const CHARS_TO_SHOW = 150;

let homeController = (function() {
    class HomeConroller {
        constructor(data, templates) {
            this.data = data;
            this.templates = templates;
        }

        tripsByCategories() {
            let tripsByCategories;

            this.data.getAllTripsDiaries()
                .then((trips) => {
                    tripsByCategories = UTILS.HELPER_FUNCTIONS.getCategories(trips);

                    return this.templates.get("home-categories");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content #categories").html(compiledTemplate(tripsByCategories));
                });
        }

        recentTripsDiaries() {
            let tripsData;

            this.data.getAllTripsDiaries()
                .then((trips) => {
                    tripsData = UTILS.HELPER_FUNCTIONS.getRecentTripsDiaries(trips, TRIPS_BY_PAGE, CHARS_TO_SHOW);

                    return this.templates.get("home");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripsData));
                });
        }
    }

    let homeConroller = new HomeConroller(tripsDiariesData, templatesLoader);

    return {
        home: function() {
            return {
                recentDiaries: homeConroller.recentTripsDiaries(),
                diariesByCategory: homeConroller.tripsByCategories()
            };
        }
    };
}());

export { homeController };