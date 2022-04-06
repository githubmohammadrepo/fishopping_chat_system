var exports = module.exports = {}

exports.index = function(req, res) {
    let title = "some title in here";
    return res.json({ title });
}