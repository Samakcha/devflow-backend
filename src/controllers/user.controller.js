export const updateAvatarController = async (req, res) => {
    console.log(req.file);

    return res.status(200).json({
        success: true,
        file: req.file
    });
};