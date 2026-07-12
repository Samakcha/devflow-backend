const healthCheckController = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
}

export default healthCheckController