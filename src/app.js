import express from "express";
import healthRouter from "./routes/health.route.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
// import userRouter from "./routes/user.route.js";

const API_PREFIX = "/api/v1";

const app = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());


app.use(`${API_PREFIX}`, healthRouter);
app.use(`${API_PREFIX}/auth`, authRouter);
// app.use(`${API_PREFIX}/users`, userRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;