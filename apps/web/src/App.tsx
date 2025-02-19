import { useEffect, useState } from "react";

import { api } from "@repo/api";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const chat = api.ws.chat.subscribe();

  useEffect(() => {
    chat.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data as string]);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (currentMessage.length <= 1 || currentMessage === "") return;

    chat.send({ content: currentMessage });
    setCurrentMessage("");
  };

  return (
    <main className="max-h-screen h-screen container mx-auto max-w-prose">
      <h1 className="text-5xl font-bold py-2">Cum Chat</h1>
      <hr className="w-full border-b text-stone-200 rounded-4xl" />
      <div className="flex flex-col h-full">
        <div className="mt-5">
          {messages.map((message, i) => {
            return (
              <div key={i} className="rounded-4xl bg-stone-400 w-fit px-4 my-1">
                <h1>{message}</h1>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-10 w-1/2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-2"
          >
            <input
              type="text"
              className="bg-stone-100 focus-visible:outline-0 py-1 px-2"
              value={currentMessage}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-stone-50 py-1 rounded-md"
            >
              Send it
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
