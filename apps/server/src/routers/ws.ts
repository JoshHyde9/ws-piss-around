import { Elysia, t } from "elysia";
import { ElysiaWS } from "elysia/ws";

type ChatMessage = {
  action: "message" | "join" | "leave";
  room: string;
  nickname: string;
  content?: string;
  timestamp: number;
};

const connections = new Map<
  ElysiaWS,
  {
    nickname: string;
    room: string;
  }
>();

const broadcastToRoom = (message: ChatMessage) => {
  connections.forEach((details, ws) => {
    if (details.room === message.room) {
      ws.send(JSON.stringify(message));
    }
  });
};

export const wsRouter = new Elysia().group("/ws", (app) =>
  app.ws("/chat", {
    body: t.Object({
      action: t.Union([
        t.Literal("message"),
        t.Literal("join"),
        t.Literal("leave"),
      ]),
      room: t.String(),
      nickname: t.String(),
      content: t.Optional(t.String()),
    }),
    open() {
      console.log("New connection");
    },

    message(ws, message) {
      const { action, room, nickname, content } = message;

      if (action === "join") {
        connections.set(ws, { nickname, room });

        broadcastToRoom({
          action: "join",
          room,
          nickname,
          timestamp: Date.now(),
        });
      } else if (action === "message" && content) {
        broadcastToRoom({
          action: "message",
          room,
          nickname,
          content: content,
          timestamp: Date.now(),
        });
      }
    },

    close(ws) {
      const userDetails = connections.get(ws);
      if (!userDetails) return;

      broadcastToRoom({
        action: "leave",
        room: userDetails.room,
        nickname: userDetails.nickname,
        timestamp: Date.now(),
      });

      connections.delete(ws);
    },
  })
);
