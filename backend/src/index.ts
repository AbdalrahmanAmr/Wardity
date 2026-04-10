import { config } from "./config/index.js";
import { initializeDatabase } from "./database/init.js";
import app from "./app.js";

initializeDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
      console.log(`Health check: http://localhost:${config.port}/health`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
