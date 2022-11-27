const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  /*
    TODO: Check for the session cookie and verify
    its contents using jsonwebtoken, then
    assign the payload to req.user
  */
  try {
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    // Check the session cookie for the current user
    if (!cookie) throw new Error('You must be signed in to continue');
    // Verify that the JWT token is stored in the cookie, then attach to each request
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
