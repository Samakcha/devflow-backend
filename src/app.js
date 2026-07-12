import express from "express";
import healthRouter from "./routes/health.route.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";

const app = express();

app.use(loggerMiddleware);
app.use("/api/v1", healthRouter);

app.use(notFoundMiddleware)

export default app;