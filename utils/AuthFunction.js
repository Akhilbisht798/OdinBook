exports.isAuthenticated = function(req, res, next) {
    if (req.user) {
      next();
    } else {
        res.send({message: "Authenticate First For Access"});
    }
};