import { config } from "./config/index.js";
import { initializeDatabase } from "./database/init.js";
import app from "./app.js";

/** Vercel sets this in serverless; local `npm run dev` / `npm start` do not. */
const isVercel = process.env.VERCEL === "1";

initializeDatabase()
  .then(() => {
    console.log("Database initialized successfully");
    if (!isVercel) {
      app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}`);
        console.log(`Health check: http://localhost:${config.port}/health`);
      });
    }
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    if (!isVercel) {
      process.exit(1);
    }
  });

export default app;
