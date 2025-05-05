import { MessageItem } from "../components/MessageItem.tsx";
import { Form } from "../islands/Form.tsx";
import MessageItemProps from "../models/Message.ts";
import { useState } from "preact/hooks";

export function MessageList() {
  const [messages, setMessages] = useState<{ message: string; sender: string }[]>([]);

  const handleNewMessage = (message: string) => {
    setMessages((prev) => [...prev, { message, sender: "other" }]);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      {messages.map((msg, index) => (
        <MessageItem key={index} message={msg.message} sender={msg.sender} />
      ))}
      <Form onMessage={handleNewMessage} />
    </div>
  );
}
