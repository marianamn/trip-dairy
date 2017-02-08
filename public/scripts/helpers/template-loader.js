import { requester } from "requester";

class HandlebarsTemplates {
    get(templateName) {
        let url = `/static/templates/${templateName}.handlebars`;
        return requester.get(url);
    }
}

let templatesLoader = new HandlebarsTemplates();

export { templatesLoader };