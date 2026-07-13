import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerController);
router.get("/login", loginController);

export default router;