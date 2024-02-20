import { Router } from "express";
const router = Router();

import { getCurrentUser, updateUser } from "../controllers/userController.js";

router.post("/current-user", getCurrentUser);
router.get("/update-user", updateUser);

export default router;
