import { useEffect, useRef, useState } from "preact/hooks";
import MessageItemProps from "../models/Message.ts";
import MessageItem from "../components/MessageItem.tsx";

export default function Chat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const [input, setInput] = useState("");
  const idRef = useRef(crypto.randomUUID());

  useEffect(() => {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://${location.host}/ws`);
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data) as MessageItemProps;
      setMessages((prev) => {
        // preview重複防止
        if (data.type === "preview") {
          return [
            ...prev.filter((m) =>
              !(m.sender === data.sender && m.type === "preview")
            ),
            data,
          ];
        }
        // finalはpreviewを上書き{
        if (data.type === "final") {
          return [
            ...prev.filter((m) =>
              !(m.sender === data.sender && m.type === "preview")
            ),
            data,
          ];
        }
      });
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  const sendMessage = (type: "preview" | "final") => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ sender: idRef.current, message: input, type }));
    if (type === "final") setInput("");
  };

  return (
    <div>
      <div className="flex flex-col w-full max-w-2xl mx-auto">
        {messages.map((m) => <MessageItem  key={index} {...m} myId={idRef.current} />)}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage("final");
        }}
        class="flex"
      >
        <input
          class="flex-1 p-2 border rounded-l"
          value={input}
          onInput={(e) => {
            setInput((e.target as HTMLInputElement).value);
            sendMessage("preview");
          }}
          placeholder="入力してください..."
        />
        <button class="bg-blue-500 text-white px-4 rounded-r" type="submit">
          送信
        </button>
      </form>
    </div>
  );
}
