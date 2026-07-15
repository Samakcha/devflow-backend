import AppError from "./AppError.js";

class ValidationError extends AppError {
    constructor(errors, message = "Validation failed.") {
        super(message, 400);

        this.errors = errors;
    }
}

export default ValidationError;