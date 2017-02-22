/* globals module */
"use strict";

module.exports = {
    update(model) {
        return new Promise((resolve, reject) => {
            model.save(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(model);
            });
        });
    },
    save(model) {
        return new Promise((resolve, reject) => {
            model.save(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(model);
            });
        });
    },
    getAll(model) {
        return new Promise((resolve, reject) => {
            model.find({}, (err, records) => {
                if (err) {
                    return reject(err);
                }

                return resolve(records);
            });
        });
    },
    getAllByCategory(model, category) {
        return new Promise((resolve, reject) => {
            model.find({ category: category }, (err, records) => {
                if (err) {
                    return reject(err);
                }

                return resolve(records);
            });
        });
    },
    getOneById(model, id) {
        return new Promise((resolve, reject) => {
            model.findOne({ _id: id }, (err, singleRecord) => {
                if (err) {
                    return reject(err);
                }

                return resolve(singleRecord);
            });
        });
    }

};