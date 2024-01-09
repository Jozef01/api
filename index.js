import ansicolors from "ansicolors";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { fileURLToPath } from "url";
import path from "path";
//files
import keys from "./Config/keys.js";
import { errorHandler, notFound } from "./Middleware/errorHandler.js";
import { auth, message, parcel, track } from "./Router/index.js";
import DB from "./Utils/db.js";

const app = express();
const PORT = keys.app.port || 4000;

app.use(cookieParser());
app.use(json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

//localhost:{post}/api/v1/auth/{endpoint}
app.use("/api/v1/auth", auth);
//localhost:{post}/api/v1/parcel/{endpoint}
app.use("/api/v1/parcel", parcel);
//localhost:{post}/api/v1/message/
app.use("/api/v1/message", message);
//localhost:{post}/parcel/{endpoint}
app.use("/parcel", track);

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.use(compression());
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
  });
}

DB().then(() => {
  console.log(
    `${ansicolors.magenta("🆗")} ${ansicolors.cyan("MongoDB connected")}`,
  );
  app.listen(PORT, () =>
    console.log(
      process.env.NODE_ENV === "production"
        ? ansicolors.blue("Production 📦")
        : ansicolors.magenta("Development 🪛"),
      `${ansicolors.magenta("🆗")} ${ansicolors.cyan(
        `Listen on port ${PORT}. visit: localhost:${PORT}/api/v1`,
      )}`,
    ),
  );
});
