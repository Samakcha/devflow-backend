import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.util.js";
import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

export const registerService = async ({ name, email, password }) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ConflictError("User already exists.");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ name, email, password: hashedPassword });

    return user;

};


export const loginService = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const payload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateAccessToken( payload );

    const refreshToken = generateRefreshToken( payload );

    return {
        user,
        accessToken,
        refreshToken
    };
};

export const refreshTokenService = (refreshToken) => {
    if(!refreshToken) {
        throw new Error("Refresh Token is required")
    };

    const decoded = verifyRefreshToken(refreshToken);

    const tokenPayload = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
    };

    const accessToken = generateAccessToken(tokenPayload);

    return {
        accessToken
    };
};