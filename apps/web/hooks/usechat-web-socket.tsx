import { api, WSSever } from "@repo/api";
import { useCallback, useEffect, useState, useRef } from "react";

type Message = {
  action: "message" | "join" | "leave";
  room: string;
  nickname: string;
  content?: string;
  timestamp: string;
};

export const useChatWebSocket = (nickname: string, room: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WSSever | null>(null);

  useEffect(() => {
    if (wsRef.current) return;

    const chat = api.ws.chat.subscribe();

    wsRef.current = chat;

    chat.on("open", () => {
      setIsConnected(true);

      chat.send({
        action: "join",
        room,
        nickname,
      });
    });

    chat.on("message", (rawMessage) => {
      const message = rawMessage.data as Message;
      setMessages((prev) => [...prev, message]);
    });
  }, [nickname, room]);

  const sendMessage = useCallback(
    (content?: string) => {
      if (wsRef.current && isConnected) {
        wsRef.current.send({
          action: "message",
          room,
          nickname,
          content,
        });
      }
    },
    [isConnected, room, nickname]
  );

  return {
    messages,
    isConnected,
    sendMessage,
  };
};
