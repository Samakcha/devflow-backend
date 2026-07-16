import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import AppError from "../errors/AppError.js";

export const uploadImage = async (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    return reject(
                        new AppError("Failed to upload image.", 500)
                    );
                }

                resolve(result);
            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(uploadStream);
    });
};