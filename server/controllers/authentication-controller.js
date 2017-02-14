/* globals module */
let jwt = require("jwt-simple");
const encrypt = require("../utils/encryption");
let secret = "Secret unicorns";
// const DEFAULT_IMAGE = "http://knowm.org/wp-content/uploads/2015/03/user.png";

module.exports = function(params) {
    let { data } = params;
    return {
        register(req, res) {
            let newUser = {};
            let propoerties = ["email", "firstName", "lastName", "profileImgURL", "facebookContact", "youTubeContact", "twitterContact", "googlePlusContact", "instagramContact", "rssContact"];

            let postData = req.body["body"];
            let postDataObj = JSON.parse(postData);

            propoerties.forEach(property => {
                if (!property || property.length < 0) {
                    res.status(411).json(`Missing ${property}`);
                }

                newUser[property] = postDataObj[property];
            });

            // console.log(req.body);

            let pass = postDataObj.password;
            let salt = encrypt.generateSalt();
            newUser.salt = salt;
            let hashPass = encrypt.generateHashedPassword(salt, pass);
            newUser.hashPass = hashPass;

            // newUser.profileImgURL = DEFAULT_IMAGE;
            // console.log(newUser);

            data.getUserByEmail(newUser.email).then((user) => {
                if (user) {
                    return res.status(400).send({ success: false, msg: "User already exists!" });
                }
            });

            data.createUser(newUser)
                .then(() => {
                    res.status(200).send({ success: true, data });
                })
                .catch(err => {
                    return res.status(400).send({ success: false, msg: "User not created!", err });
                });
        }
        // login(req, res) {
        //     // console.log(req.body);

        //     let postData = req.body["body"];
        //     let postDataObj = JSON.parse(postData);
        //     let password = postDataObj.password;

        //     data.getUserByEmail(postDataObj.email)
        //         .then((user) => {
        //             if (user) {
        //                 let hashPass = encrypt.generateHashedPassword(user.salt, password);
        //                 if (hashPass === user.hashPass) {
        //                     let token = jwt.encode(user, secret);

        //                     return res.status(200).json({
        //                         success: true,
        //                         body: {
        //                             token: token,
        //                             email: user.email
        //                         }
        //                     });
        //                 } else {
        //                     return res.status(400).json({ success: false, msg: "Wrong password!" });
        //                 }
        //             } else {
        //                 return res.status(400).json({ success: false, msg: "Грешно потребителско име!" });
        //             }
        //         })
        //         .catch(error => {
        //             return res.send(error);
        //         });
        // },
        // getLoggedUser(req, res) {
        //     const token = req.headers.authorization;

        //     if (token) {
        //         let userInfo = jwt.decode(token.split(" ")[1], secret);
        //         let user = {
        //             username: userInfo.username
        //         };

        //         res.status(200).json(user);
        //     } else {
        //         res.status(401).json({
        //             success: false,
        //             message: "Please provide token"
        //         });
        //     }
        // },
        // logout(req, res) {
        //     req.session.destroy();
        //     req.logout();
        //     return res.status(200).redirect("/");
        // }
    };
};