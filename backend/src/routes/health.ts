import type { FastifyPluginAsync } from "fastify";
import { healthResponseSchema } from "@ceya/shared";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async (request, reply) => {
    reply.header("Cache-Control", "no-store");
    const payload = {
      status: "ok",
      service: "ceya-backend",
      version: "0.1.0",
      timestamp: new Date().toISOString(),
    };

    return healthResponseSchema.parse(payload);
  });
};
