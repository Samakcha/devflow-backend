import { registerService, loginService } from "../services/auth.service.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerService({ name, email, password });
        const userObject = user.toObject();
        const { password: hashedPassword, ...userData } = userObject;
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    };
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken } = await loginService({ email, password });
        const userObject = user.toObject();
        const { password: hashedPassword, ...userData } = userObject;
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: userData,
            accessToken
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    };
};