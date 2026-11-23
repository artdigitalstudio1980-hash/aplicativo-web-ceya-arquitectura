import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "../src/app.js";

type App = Awaited<ReturnType<typeof buildApp>>;
let app: App;

beforeAll(async () => {
  app = await buildApp();
});

afterAll(async () => {
  await app.close();
});

describe("contact API", () => {
  it("accepts a valid contact payload", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/contact",
      payload: {
        name: "Cliente Demo",
        email: "cliente@example.com",
        subject: "Consulta",
        message: "Este es un mensaje de prueba con suficiente longitud.",
        privacyAccepted: true,
      },
    });

    expect(response.statusCode).toBe(202);
    expect(response.json()).toMatchObject({ status: "accepted" });
  });

  it("rejects an invalid contact payload", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/contact",
      payload: { email: "bad" },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({ error: { code: "VALIDATION_ERROR" } });
  });
});
