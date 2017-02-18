import $ from "jquery";
import Handlebars from "handlebars";
import _ from "underscore";
import { templatesLoader } from "templates";
import toastr from "toastr";
import { tripsDiariesData } from "diariesData";


const TRIPS_BY_PAGE = 6;
const CHARS_TO_SHOW = 150;

let diariesController = (function() {
    function getRecentTripsDiaries(trips, count, charsCount) {
        let tripsData,
            recentTripDiaries;

        recentTripDiaries = trips.data.sort((a, b) => {
            return new Date(b.postDate) - new Date(a.postDate);
        });

        tripsData = recentTripDiaries.slice(0, count);

        for (let i = 0; i < tripsData.length; i++) {
            tripsData[i].content = recentTripDiaries[i].content.substring(0, charsCount);
        }

        return tripsData;
    }

    function tripDiariesByCategory(trips) {
        let tripsData,
            groupedByCategory;

        groupedByCategory = _.groupBy(trips.data, (trip) => {
            return trip.category;
        });

        tripsData = _.map(groupedByCategory, (value, key) => {
            return {
                category: key,
                tripsGrouped: value
            };
        });

        return tripsData;
    }

    class TripsDiariesConroller {
        constructor(data, templates) {
            this.data = data;
            this.templates = templates;
        }

        recentTripsDiaries() {
            let tripsData;

            this.data.getAllTripsDiaries()
                .then((trips) => {
                    tripsData = getRecentTripsDiaries(trips, TRIPS_BY_PAGE, CHARS_TO_SHOW);

                    return this.templates.get("home");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate(tripsData));
                });
        }

        tripsByCategories() {
            let tripsByCategories;

            this.data.getAllTripsDiaries()
                .then((trips) => {
                    tripsByCategories = tripDiariesByCategory(trips);

                    return this.templates.get("home");
                })
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#categ").html(compiledTemplate(tripsByCategories));
                });
        }
    }

    let tripsDiariesConroller = new TripsDiariesConroller(tripsDiariesData, templatesLoader);

    return {
        home: function() {
            return {
                recentDiaries: tripsDiariesConroller.recentTripsDiaries(),
                diariesByCategory: tripsDiariesConroller.tripsByCategories()
            };
        }
    };
}());

export { diariesController };