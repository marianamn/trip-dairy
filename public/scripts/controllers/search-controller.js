import $ from "jquery";
import Handlebars from "handlebars";
import { UTILS } from "utils";
import { templatesLoader } from "templates";
import { tripsDiariesData } from "diariesData";

let searchController = (function() {
    class SearchConroller {
        constructor(data, templates) {
            this.data = data;
            this.templates = templates;
        }

        search(params) {
            let tripDiaries;
            let text = params.text;

            this.data.getAllTripsDiaries()
                .then((allTrips) => {
                    let trips = allTrips.data;
                    tripDiaries = UTILS.HELPER_FUNCTIONS.searchByText(trips, text);
                    tripDiaries.search = text;
                    // console.log(tripDiaries);

                    return this.templates.get("search");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripDiaries));
                });
        }
    }

    let search = new SearchConroller(tripsDiariesData, templatesLoader);

    return {
        search: function(params) {
            return search.search(params);
        }
    };
}());

export { searchController };