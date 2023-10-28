import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { verifyToken } from "../authorization/authorization.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.use(verifyToken);
router.route("/logout").post(logout);

export { router as authRoutes };
