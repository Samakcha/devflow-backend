import express from "express";
import healthRouter from "./routes/health.route.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", healthRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;