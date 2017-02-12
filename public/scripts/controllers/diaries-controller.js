import $ from "jquery";
import Handlebars from "handlebars";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { tripsDiariesData } from "diariesData";

let diariesController = (function() {
    class TripsDiariesConroller {
        constructor(data, templates) {
            this.data = data;
            this.templates = templates;
        }

        allTripsDiaries() {
            let tripsData;

            this.data.getAllTripsDiaries()
                .then((response) => {
                    tripsData = response;

                    return this.templates.get("home");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripsData));
                });
        }
    }

    return {
        home: function() {
            return new TripsDiariesConroller(tripsDiariesData, templatesLoader).allTripsDiaries();
        }
    };
}());

export { diariesController };