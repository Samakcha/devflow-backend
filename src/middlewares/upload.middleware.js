import multer from "multer";
import FileUploadError from "../errors/FileUploadError.js";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
    }
    return cb(
        new FileUploadError("Only JPEG, PNG, AND WEBP images are allowed."),
        false
    );
}

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});

export default upload;