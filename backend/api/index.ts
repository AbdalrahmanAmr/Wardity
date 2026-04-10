// Vercel serverless entry point.
// Vercel picks this file up automatically and serves it as a serverless function.
// The Express app handles lazy DB initialization via middleware in app.ts.
import app from "../src/app.js";

export default app;
