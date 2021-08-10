module.exports.home = function (req, res) {

    return res.render('home', {
        title: "Todo : Home"
    });
}

//module.exports.actionName = function (req, res) {}