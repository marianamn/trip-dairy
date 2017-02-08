/* globals module */

module.exports = function() {
    return {
        home(req, res) {
            // let user = req.user;

            return res.sendFile("index.html", { root: "./public/" });
        }
    };
};