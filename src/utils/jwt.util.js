import jwt from "jsonwebtoken"

export const generateAccessToken = ({
    userId,
    email,
    role
}) => {
    return jwt.sign(
    {
        userId,
        email,
        role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRES_IN
    }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
};