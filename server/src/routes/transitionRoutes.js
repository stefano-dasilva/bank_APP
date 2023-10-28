import express from "express";
import {makeTransition} from "../controllers/transitionController.js"
import { verifyToken } from "../authorization/authorization.js";


const router = express.Router();

router.use(verifyToken);
router.route("/").post(makeTransition);

export { router as transitionRoutes };
