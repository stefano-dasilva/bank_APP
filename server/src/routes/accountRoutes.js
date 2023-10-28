import express from "express";
import {
  getAccounts,
  createAccount,
} from "../controllers/accountController.js";
import { verifyToken } from "../authorization/authorization.js";

const router = express.Router();
router.use(verifyToken);
router.route("/createaccount").post(createAccount);
router.route("/getaccounts/").get(getAccounts);

export { router as accountRoutes };
