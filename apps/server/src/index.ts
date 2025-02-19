import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { wsRouter } from "./routers/ws";

const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(wsRouter)
  .get("/", () => {
    return {
      message: "Hello from Elysia",
    };
  })
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}/api`
);
