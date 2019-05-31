module.exports.index = (req, res) => {
    res.status(200).json({
        msg: 'Welcome to JWT Login API!!'
    });
}

module.exports.test = (req, res) => {
    res.status(200).json({
        msg: 'Token Valid!!',
        authData: req.auth
    });
}