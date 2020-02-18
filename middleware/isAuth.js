
module.exports = (req, res, next) => {
    if(!req.res.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};