import { registerService, loginService, refreshTokenService } from "../services/auth.service.js";

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
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await loginService({ email, password });
        const userObject = user.toObject();
        const { password: hashedPassword, ...userData } = userObject;
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: userData,
            accessToken
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const refreshTokenController = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const { accessToken } = await refreshTokenService(refreshToken);
        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            data: { accessToken }
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export const logoutController = async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    return res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}