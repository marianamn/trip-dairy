/* globals module require */

let isAdmin = require("./is-user-admin");
let isAuthenticated = require("./is-user-authenticated");

module.exports = {
    isAdmin,
    isAuthenticated
};