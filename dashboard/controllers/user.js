import { User } from "../model/model.js";
import { Unauthenticated, NotFound, BadRequest } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getLogin = (req, res) => {
    res.status(200).render("login");
};

const login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Provide an valid email and password");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Unauthenticated("Unauthenticated ");
    }
    req.session.email = email;
    req.session.isAuth = true;
    res.status(StatusCodes.OK).redirect("/dashboard");
};
const register = async(req, res) => {
    const user = await User.create({...req.body });

    res.status(StatusCodes.CREATED).redirect("login");
};
const logout = async(req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/login");
    });
};

export { register, logout, login, getLogin };