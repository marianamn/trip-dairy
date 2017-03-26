/* globals SystemJS */

SystemJS.config({
    "transpiler": "plugin-babel",
    "map": {
        "plugin-babel": "../node_modules/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js",
        "jquery": "../bower_components/jquery/dist/jquery.js",
        "navigo": "../bower_components/navigo/lib/navigo.js",
        "handlebars": "../bower_components/handlebars/handlebars.min.js",
        "toastr": "../bower_components/toastr/toastr.js",
        "underscore": "../bower_components/underscore/underscore-min.js",
        "tinymce": "../bower_components/tinymce/tinymce.min.js",

        // helpers
        "templates": "../scripts/helpers/template-loader.js",
        "constants": "../scripts/helpers/constants.js",
        "utils": "../scripts/helpers/utils.js",

        // requester
        "requester": "../scripts/requests/requester.js",

        // data
        "usersData": "../scripts/data/users-data.js",
        "diariesData": "../scripts/data/diaries-data.js",

        // controllers
        "homeController": "../scripts/controllers/home-controller.js",
        "usersController": "../scripts/controllers/users-controller.js",
        "diariesController": "../scripts/controllers/diaries-controller.js",
        "aboutController": "../scripts/controllers/about-controller.js",
        "contactsController": "../scripts/controllers/contacts-controller.js",
        "searchController": "../scripts/controllers/search-controller.js",

        // main
        "main": "../scripts/main.js"
    }
});

System.import("main");