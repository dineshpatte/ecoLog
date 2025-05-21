import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js"
import activityrouter from "./routes/activity.routes.js"
import tipRouter from "./routes/tip.routes.js"
import rewardRouter from "./routes/reward.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/activities",activityrouter)
app.use("/api/v1/tips",tipRouter)
app.use("/api/v1/rewards",rewardRouter)



export default app;
