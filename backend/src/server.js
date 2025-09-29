import express from "express";
import { _config } from "./config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger.js";
import morgan from "morgan";
import accessLogStream from "./utils/morgan.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();
const PORT = _config.PORT;

app.use(cors({ 
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Test endpoint to check auth status
app.get("/api/test-auth", async (req, res) => {
  try {
    const session = await auth.api.getSession(req, res);
    res.json({ 
      session: session,
      hasSession: !!session,
      userRole: session?.user?.role || 'no-role'
    });
  } catch (error) {
    res.json({ 
      error: error.message,
      session: null,
      hasSession: false
    });
  }
});

// Mount Better Auth handler
app.all("/api/auth/*", toNodeHandler(auth));



// Error handler middleware placeholder
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Database URI: ${_config.DATABASE_URI}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

export default app; 