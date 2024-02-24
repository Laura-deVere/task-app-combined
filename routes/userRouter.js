import { Router } from "express";
const router = Router();

import { getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

router.post("/current-user", getCurrentUser);
router.get("/update-user", validateUpdateUser, updateUser);

export default router;
