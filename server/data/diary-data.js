/* globals module */
let dataUtils = require("./utils/data-utils");

module.exports = function(models) {
    let { Diary } = models;

    return {
        getAllDiaries() {
            return dataUtils.getAll(Diary);
        },
        getDiaryById(id) {
            return dataUtils.getOneById(Diary, id);
        }
    };
};