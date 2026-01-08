// Fresh 2.0 entry point
// Builder.listen() expects this file to export an App instance
import { App, staticFiles } from "fresh";

export const app = new App();

// Enable static file serving from static/ directory
app.use(staticFiles());

// Register file-system routes from routes/ directory
// This is REQUIRED for routes to work - Builder does not auto-register them
app.fsRoutes();
