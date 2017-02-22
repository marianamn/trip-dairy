import $ from "jquery";
import Handlebars from "handlebars";
import { UTILS } from "utils";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { tripsDiariesData } from "diariesData";

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
                    console.log(tripDiary);

                    return this.templates.get("trips-by-category");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripDiary));
                });
        }

    }

    let diariesConroller = new DiariesConroller(tripsDiariesData, templatesLoader);

    return {
        diaryById: function(params) {
            return diariesConroller.diaryById(params);
        },
        diariesByCategory: function(params) {
            console.log(params);
            return diariesConroller.diariesByCategory(params);
        }
    };
}());

export { diariesController };