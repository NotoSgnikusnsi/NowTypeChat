import Message from "../models/Message.ts";

interface MessageItemProps extends Message {
  myId: string;
}


export default function MessageItem(
  { sender, message, type, myId }: MessageItemProps
) {
  const isSelf = sender === myId;
  const align = isSelf ? "justify-end text-right" : "justify-start text-left";
  const opacity = type === "preview" ? "opacity-50" : "opacity-100";

  return (
    <div class={`p-2 mb-2 font-mono text-lg break-all ${align} ${opacity}`}>
    myId: {myId} <br />
    {message}
  </div>
  );
}
