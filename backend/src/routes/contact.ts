import type { FastifyPluginAsync } from "fastify";
import { contactRequestSchema } from "@ceya/shared";

export const contactRoutes: FastifyPluginAsync = async (app) => {
  app.post("/contact", async (request, reply) => {
    const result = contactRequestSchema.safeParse(request.body);

    if (!result.success) {
      return reply.code(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: "Los datos del formulario no son válidos.",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
    }

    request.log.info("solicitud de contacto recibida");
    return reply.code(202).send({
      status: "accepted",
      message: "Solicitud recibida. El envío de correo se habilitará en la FASE 5.",
    });
  });
};
