import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = await buildApp();

let shuttingDown = false;

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  app.log.info({ signal }, "cerrando servidor");
  try {
    await app.close();
    process.exit(0);
  } catch (error) {
    app.log.error({ err: error }, "error al cerrar servidor");
    process.exit(1);
  }
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  app.log.error({ err: reason }, "unhandled rejection");
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  app.log.error({ err: error }, "uncaught exception");
  process.exit(1);
});

try {
  await app.listen({ host: env.HOST, port: env.PORT });
} catch (error) {
  app.log.error({ err: error }, "no se pudo iniciar el servidor");
  process.exit(1);
}
