import { useState } from "react";
import { useChatWebSocket } from "../hooks/usechat-web-socket";

type ChatRoomsProps = {
  nickname: string;
  room: string;
  onLeave: () => void;
};

export const ChatRoom: React.FC<ChatRoomsProps> = ({
  nickname,
  room,
  onLeave,
}) => {
  const { messages, isConnected, sendMessage } = useChatWebSocket(
    nickname,
    room
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Room: {room}</h1>
            <p className="text-sm text-gray-500">Joined as {nickname}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            />
            <button
              onClick={onLeave}
              className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer duration-200 ease-in-out hover:bg-red-600"
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, i) => {
            if (msg.action === "join" || msg.action === "leave") {
              return (
                <div key={i} className="text-center text-sm text-gray-500">
                  {msg.nickname} {msg.action === "join" ? "joined" : "left"} the
                  room
                  <span className="ml-2">{formatTime(msg.timestamp)}</span>
                </div>
              );
            }

            const isOwnMessage = msg.nickname === nickname;

            return (
              <div
                key={i}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[70%]">
                  <div
                    className={`flex flex-col w-full ${isOwnMessage ? "bg-blue-500 text-white" : "bg-white"} rounded-lg p-3 shadow`}
                  >
                    <div className="break-words">{msg.content}</div>
                    <div
                      className={`text-xs mt-1 ${isOwnMessage ? "text-blue-100" : "text-gray-500"}`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                  {!isOwnMessage && (
                    <div className="text-xs font-medium text-gray-600 mt-1 ml-2">
                      {msg.nickname}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-md focus:outline-0 focus:bg-stone-100"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 duration-200 ease-in-out cursor-pointer flex items-center gap-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
