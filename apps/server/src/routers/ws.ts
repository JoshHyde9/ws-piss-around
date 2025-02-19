import { Elysia, t } from "elysia";

export const wsRouter = new Elysia().group("/ws", (app) =>
  app
    .ws("/chat", {
      body: t.Object({
        content: t.String(),
      }),
      open(ws) {
        ws.subscribe("message");
      },
      message: (ws, body) => {
        ws.publish("message", body.content);
      },
    })
);
