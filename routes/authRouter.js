import { Router } from "express";
const router = Router();

import { login, logout, register } from "../controllers/authController.js";

import {
	validateRegister,
	validateLogin,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
