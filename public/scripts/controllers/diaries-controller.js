import $ from "jquery";
import Handlebars from "handlebars";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { tripsDiariesData } from "diariesData";
import { UTILS } from "utils";

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
    }

    let diariesConroller = new DiariesConroller(tripsDiariesData, templatesLoader);

    return {
        diaryById: function(params) {
            return diariesConroller.diaryById(params);
        }
    };
}());

export { diariesController };