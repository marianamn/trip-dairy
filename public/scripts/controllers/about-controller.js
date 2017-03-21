import $ from "jquery";
import Handlebars from "handlebars";
import { templatesLoader } from "templates";

let aboutController = (function() {
    class AboutConroller {
        constructor(templates) {
            this.templates = templates;
        }

        about() {
            this.templates.get("about")
                .then(function(html) {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate());
                })
        }
    }

    let aboutConroller = new AboutConroller(templatesLoader);

    return {
        about: function() {
            return aboutConroller.about();
        }
    };
}());

export { aboutController };