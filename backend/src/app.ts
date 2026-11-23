import Fastify, { type FastifyInstance } from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { env } from "./config/env.js";
import { contactRoutes } from "./routes/contact.js";
import { healthRoutes } from "./routes/health.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: { level: env.LOG_LEVEL },
    trustProxy: env.TRUST_PROXY,
    bodyLimit: 32 * 1024,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
    frameguard: { action: "deny" },
  });
  await app.register(cors, {
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    maxAge: 600,
  });
  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    hook: "onRequest",
  });

  await app.register(healthRoutes);
  await app.register(contactRoutes, { prefix: "/api" });

  app.setNotFoundHandler(async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.code(404).send({
      error: { code: "NOT_FOUND", message: "Recurso no encontrado." },
    });
  });

  app.setErrorHandler(async (error: Error & { statusCode?: number }, request: FastifyRequest, reply: FastifyReply) => {
    request.log.error({ err: error }, "error handled by app error handler");
    const statusCode =
      typeof error.statusCode === "number" && error.statusCode >= 400
        ? error.statusCode
        : 500;

    return reply.code(statusCode).send({
      error: {
        code: statusCode >= 500 ? "INTERNAL_ERROR" : "REQUEST_ERROR",
        message: statusCode >= 500 ? "Error interno del servidor." : error.message,
      },
    });
  });

  return app;
}
