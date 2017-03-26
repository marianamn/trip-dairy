import $ from "jquery";
import Handlebars from "handlebars";
import { templatesLoader } from "templates";

let contactsController = (function() {
    class ContactsConroller {
        constructor(templates) {
            this.templates = templates;
        }

        contacts() {
            this.templates.get("contacts")
                .then((html) => {
                    let compiledTemplate = Handlebars.compile(html);
                    $("#content").html(compiledTemplate());
                });
        }
    }

    let contactstConroller = new ContactsConroller(templatesLoader);

    return {
        contacts: function() {
            return contactstConroller.contacts();
        }
    };
}());

export { contactsController };