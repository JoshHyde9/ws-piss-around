import { useState } from "react";

type LoginProps = {
    onJoin: (nickname: string, room: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onJoin }) => {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname && room) {
      onJoin(nickname, room);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Join Chat Room</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your nickname"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter room name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ease-in-out duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};
