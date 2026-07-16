import AppError from "./AppError.js";

class FileUploadError extends AppError {
    constructor(message = "File upload failed.") {
        super(message, 400);
    }
}

export default FileUploadError;