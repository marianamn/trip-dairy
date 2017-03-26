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
        "templates": "../build/js/helpers/template-loader.min.js",
        "constants": "../build/js/helpers/constants.min.js",
        "utils": "../build/js/helpers/utils.min.js",

        // requester
        "requester": "../build/js/requests/requester.min.js",

        // data
        "usersData": "../build/js/data/users-data.min.js",
        "diariesData": "../build/js/data/diaries-data.min.js",

        // controllers
        "homeController": "../build/js/controllers/home-controller.min.js",
        "usersController": "../build/js/controllers/users-controller.min.js",
        "diariesController": "../build/js/controllers/diaries-controller.min.js",
        "aboutController": "../build/js/controllers/about-controller.min.js",
        "contactsController": "../build/js/controllers/contacts-controller.min.js",
        "searchController": "../build/js/controllers/search-controller.min.js",

        // main
        "main": "../build/js/main.min.js"
    }
});

System.import("main");