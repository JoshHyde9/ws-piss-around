import { useState } from "react";

import { ChatRoom } from "../components/chat-room";
import { Login } from "../components/login";

type User = {
  nickname: string;
  room: string;
}

function App() {
  const [user, setUser] = useState<User | null>();

  const handleJoin = (nickname: string, room: string) => {
    setUser({ nickname, room });
  };

  const handleLeave = () => {
    setUser(null);
  };

  return (
    user ? (
      <ChatRoom
        nickname={user.nickname}
        room={user.room}
        onLeave={handleLeave}
      />
    ) : (
      <Login onJoin={handleJoin} />
    )
  );
}

export default App;
