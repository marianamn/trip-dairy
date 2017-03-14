/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("User", {
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    profileImgURL: String,
    salt: String,
    hashPass: String,
    userInfo: String,
    facebookContact: String,
    youTubeContact: String,
    twitterContact: String,
    googlePlusContact: String,
    instagramContact: String,
    rssContact: String
});