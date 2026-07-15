import { verifyAccessToken } from "../utils/jwt.util.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Authorization token required.");
    };
    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyAccessToken(token);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid or expired token.");
    };
};

export default authMiddleware;