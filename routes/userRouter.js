import { Router } from "express";
const router = Router();

import { getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

router.get("/current-user", getCurrentUser);
router.post("/update-user", validateUpdateUser, updateUser);

export default router;
