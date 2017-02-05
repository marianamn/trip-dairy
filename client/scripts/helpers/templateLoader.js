let templatesLoader = (function() {

    function get(templateName) {
        let url = `templates/${templateName}.handlebars`;
        return requester.get(url);
    }

    return {
        get: get
    };
}());