import {
  getHeartBeat,
  getTemp,
  setHeartBeat,
  getDashboard,
  getBracelet,
  getPatients,
} from "../controllers/values.js";
import authMiddleware from "../middlewares/auth.js";
import express from "express";
import { register, logout, login, getLogin } from "../controllers/user.js";
const router = express.Router();

router.route("/heartbeat").get(getHeartBeat);
router.route("/temp").get(getTemp);
router.route("/bracelet").get(authMiddleware, getBracelet);
router.route("/login").get(getLogin).post(login);
router.route("/register").get(getLogin).post(register);
router.route("/dashboard").get(authMiddleware, getDashboard);
router.route("/setvalues").get(setHeartBeat);
router.route("/").get(authMiddleware, getDashboard);
router.route("/logout").get(logout);
router.route("/patients").get(getPatients);
export default router;
