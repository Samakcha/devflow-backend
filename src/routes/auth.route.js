import { Router } from "express";
import { registerController, loginController, refreshTokenController, logoutController} from "../controllers/auth.controller.js";
import validate from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.post("/refresh", refreshTokenController);
router.post("/logout", authMiddleware, logoutController);

export default router;