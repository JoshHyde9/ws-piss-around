import type { EdenWS } from "@elysiajs/eden/treaty";
import type { App } from "../../../apps/server/src";

import { treaty } from "@elysiajs/eden";

export const { api } = treaty<App>("http://localhost:3000");

export type WSSever = EdenWS<{
  body: {
    content?: string | undefined;
    action: "message" | "join" | "leave";
    room: string;
    nickname: string;
  };
  params: {};
  query: unknown;
  headers: unknown;
  response: unknown;
}>;
