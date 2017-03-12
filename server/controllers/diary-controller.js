/* globals module */

module.exports = function(params) {
    let { data } = params;

    return {
        getAllDiaries(req, res) {
            data.getAllDiaries()
                .then(allDiaries => {
                    res.json({ data: allDiaries });
                })
                .catch(err => {
                    res.json(err);
                });
        },
        getDiaryById(req, res) {
            data.getDiaryById(req.params.id)
                .then((diary) => {
                    // console.log(diary);
                    res.json({ data: diary });
                })
                .catch(err => {
                    res.json(err);
                });
        },
        addDiary(req, res) {
            let newDiary = {};
            let propoerties = ["title", "author", "place", "category", "content", "postDate", "mainImage", "images"];

            let postData = req.body["body"];
            let postDataObj = JSON.parse(postData);
            // console.log(postDataObj);

            propoerties.forEach(property => {
                if (!property || property.length < 0) {
                    res.status(411).json(`Missing ${property}`);
                }

                newDiary[property] = postDataObj[property];
            });

            // console.log(newDiary);
            newDiary.likes = 0;
            newDiary.dislikes = 0;

            data.createDiary(newDiary)
                .then(() => {
                    res.status(200).send({ success: true, data });
                })
                .catch(err => {
                    return res.status(400).send({ success: false, msg: "Diary not created!", err });
                });
        }
    };
};