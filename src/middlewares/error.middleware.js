import AppError from "../errors/AppError.js";
import ValidationError from "../errors/ValidationError.js";


const errorMiddleware = ( error, req, res, next ) => {
    if (error instanceof AppError) {
        const response = { 
            success: false,
            message: error.message
        };

        if (error instanceof ValidationError) {
            response.errors = error.errors;
        }

        return res.status(error.statusCode).json(response);
    }
    console.log(error);

    return res.status(500).json({
        success: false,
        message: "Internal server error."
    });
};
export default errorMiddleware;