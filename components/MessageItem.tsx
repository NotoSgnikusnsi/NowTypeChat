import MessageItemProps from "../models/Message.ts";

export function MessageItem({ message, sender }: MessageItemProps) {
  const isSelf = sender === "self";
  return (
    <div
      className={`p-2 mb-2 font-mono text-lg${
        isSelf ? "justify-end text-right" : "justify-start text-left"
      }`}
    >
      {message}
    </div>
  );
}
