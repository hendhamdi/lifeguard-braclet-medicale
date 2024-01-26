import Unauthenticated from "../errors/unauthenticated.js";

export default function checkAuthentication(req, res, next) {
  if (req.session.isAuth) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.redirect("/login");
  }
}
