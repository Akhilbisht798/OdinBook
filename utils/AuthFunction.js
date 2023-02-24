exports.isAuthenticated = function(req, res, next) {
    if (req.user) {
      next();
    } else {
        res.json({
          message: "Authenticate First For Access",
          success: false,
        });
    }
};

// exports.isAuthenticated = (req, res, next) =>  {
//   const authToken = req.cookies.sessionId;
//   // Check the contents of the cookie to authenticate the user
//   if (authToken && checkAuthToken(authToken)) {
//     // User is authenticated, continue processing the request
//     next();
//   } else {
//     // User is not authenticated, respond with a 401 Unauthorized status code
//     res.status(401).send('Unauthorized');
//   }
// }
