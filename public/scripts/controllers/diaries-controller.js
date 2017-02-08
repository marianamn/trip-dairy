import $ from "jquery";
import Handlebars from "handlebars";
import { templatesLoader } from "templates";
import toastr from "toastr";

import { tripsDiariesData } from "diariesData";


class TripsDiariesConroller {

    allTripsDiaries() {
        let tripsData;

        tripsDiariesData.getAllTripsDiaries()
            .then((response) => {
                tripsData = response;

                console.log(tripsData);
                return templatesLoader.get("home");
            })
            .then((html) => {
                let compiledTemplate = Handlebars.compile(html);
                $("#content").html(compiledTemplate(tripsData));
            });
    }
}

let diariesController = new TripsDiariesConroller();
export { diariesController };