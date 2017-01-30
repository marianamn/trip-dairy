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
        }
    };
};