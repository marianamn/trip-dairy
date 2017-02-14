/* globals SystemJS*/

SystemJS.config({
    "transpiler": "plugin-babel",
    "map": {
        "plugin-babel": "/libs/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "/libs/systemjs-plugin-babel/systemjs-babel-browser.js",
        "jquery": "/static/bower_components/jquery/dist/jquery.js",
        "navigo": "/static/bower_components/navigo/lib/navigo.js",
        "handlebars": "/static/bower_components/handlebars/handlebars.min.js",
        "toastr": "/static/bower_components/toastr/toastr.js",
        "cryptojs": "/libs/crypto-js/crypto-js.js",

        // helpers
        "templates": "/static/scripts/helpers/template-loader.js",
        "constants": "/static/scripts/helpers/constants.js",
        "utils": "/static/scripts/helpers/utils.js",

        // requester
        "requester": "/static/scripts/requests/requester.js",

        // data
        "usersData": "/static/scripts/data/users-data.js",
        "diariesData": "/static/scripts/data/diaries-data.js",

        // controllers
        "diariesController": "/static/scripts/controllers/diaries-controller.js",
        "usersController": "/static/scripts/controllers/users-controller.js",

        // main
        "main": "/static/scripts/main.js"
    }
});

System.import("main");