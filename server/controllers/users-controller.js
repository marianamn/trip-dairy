/* globals module */

let jwt = require('jwt-simple');
const encrypt = require("../utils/encryption");
let secret = "Secret unicorns";
const passport = require('passport'),
    DEFAULT_IMAGE = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTqhN3-lNH2F8f_eCb0wBD650zauwEIBNsIyzgVHa1kJh72dGGjRw';

module.exports = function ({ data, validator }) {
    return {
        login(req, res) {
            //console.log(req.body);
            let postData = req.body['body'];
            let postDataObj = JSON.parse(postData);
            let username = postDataObj.username;
            let password = postDataObj.password;

            data.getUserByUsername(username)
                .then((user) => {
                    if (user) {
                        let hashPass = encrypt.generateHashedPassword(user.salt, password);
                        if (hashPass === user.hashPass) {
                            let token = jwt.encode(user, secret);

                            return res.status(200).json({
                                success: true,
                                body: {
                                    token: token,
                                    username: user.username,
                                    isAdmin: user.isAdmin
                                }
                            });
                        } else {
                            return res.status(400).json({ success: false, msg: 'Грешна парола!' });
                        }
                    } else {
                        return res.status(400).json({ success: false, msg: 'Грешно потребителско име!' });
                    }
                })
                .catch(error => {
                    return res.send(error);
                });
        },
        register(req, res) {
            let newUser = {};
            let propoerties = ['username', 'password', 'firstName', 'lastName', 'email', 'recipes', 'forumPoints'];

            let postData = req.body['body'];
            let postDataObj = JSON.parse(postData);

            propoerties.forEach(property => {
                if (!property || property.length < 0) {
                    res.status(411).json(`Missing ${property}`);
                }

                newUser[property] = postDataObj[property];
            });

            // console.log(req.body);

            //for safety
            newUser.isAdmin = false;

            let pass = postDataObj.password;
            let salt = encrypt.generateSalt();
            newUser.salt = salt;
            let hashPass = encrypt.generateHashedPassword(salt, pass);
            newUser.hashPass = hashPass;

            newUser.profileImgURL = DEFAULT_IMAGE;
            // console.log(newUser);

            data.getUserByUsername(newUser.username).then((user) => {
                if (user) {
                    return res.status(400).send({ success: false, msg: 'Потребител с това потребителско име вече съществува!' });
                }
            });

            data.createUser(newUser)
                .then((data) => {
                    res.status(200).send({ success: true, data })
                })
                .catch(err => {
                    return res.status(400).send({ success: false, msg: 'Не е създаден потребител!' });
                });
        },
        getLoggedUser(req, res) {
            const token = req.headers.authorization;

            if (token) {
                let userInfo = jwt.decode(token.split(' ')[1], secret);
                let user = {
                    username: userInfo.username
                };

                res.status(200).json(user);
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Please provide token'
                });
            }
        }
    };
};