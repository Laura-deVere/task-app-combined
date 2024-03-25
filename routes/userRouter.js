import { Router } from "express";
const router = Router();

import {
	getCurrentUser,
	updateUser,
	updateUserProjects,
} from "../controllers/userController.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

router.get("/current-user", getCurrentUser);
router.post("/update-user", validateUpdateUser, updateUser);
router.post("/update-user/projects", updateUserProjects);

export default router;
