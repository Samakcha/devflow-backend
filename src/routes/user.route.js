import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { updateAvatarController } from "../controllers/user.controller.js";

const router = Router();

router.get();

router.patch();

router.patch("/avatar", authMiddleware, upload.single("avatar"), updateAvatarController);

export default router;