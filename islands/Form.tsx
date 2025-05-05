import { useEffect, useState } from "preact/hooks";

export function Form({ onMessage }: { onMessage: (message: string) => void }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    // const host = window.location.host;
    const host = "localhost:8000";
    const ws = new WebSocket(`${protocol}://${host}/api/ws`);
    ws.onopen = () => console.log("WebSocket connected");
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error:", err);
    setSocket(ws);

    ws.onmessage = (event) => {
      onMessage(event.data);
    };

    // クリーンアップ
    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    setMessage(""); // 入力フィールドをクリア
  };

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setMessage(target.value);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(target.value);
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="justify-end flex">
      <div>
        <input
          type="text"
          name="message"
          placeholder="メッセージを入力..."
          required
          value={message}
          onInput={handleChange}
          className="border border-gray-300 rounded-lg p-2 mr-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
        >
          送信
        </button>
      </div>
    </form>
  );
}
