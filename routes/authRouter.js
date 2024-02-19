import { Router } from "express";
const router = Router();

import { login, register } from "../controllers/authController.js";

import { validateRegister } from "../middleware/validationMiddleware.js";

router.post("/register", validateRegister, register);
router.post("/login", login);

export default router;
