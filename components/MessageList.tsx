import { MessageItem } from "./MessageItem.tsx";

interface MessageItemProps {
  message: string;
  sender: "self" | "other";
}

export function MessageList() {
  const messages: MessageItemProps[] = [
    {
      message:
        "ああああああああああああああああああああああああああああああああああああああああああああああああ",
      sender: "other",
    },
    { message: "ほげほげ", sender: "self" },
    { message: "こんにちは", sender: "other" },
    { message: "お名前は何ですかk", sender: "self" },
    { message: "私はAIです", sender: "other" },
    { message: "AIさん、こんにちは！", sender: "self" },
    { message: "今日はどんなことを話しましょうか？", sender: "other" },
    { message: "最近の天気はどうですか？", sender: "self" },
    { message: "今日は晴れていますね！", sender: "other" },
    { message: "それは良かったです！", sender: "self" },
    { message: "何か特別な予定はありますか？", sender: "other" },
    { message: "特にないですが、のんびり過ごす予定です。", sender: "self" },
    { message: "いいですね！リラックスする時間は大切です。", sender: "other" },
    { message: "そうですね、たまにはゆっくりしたいです。", sender: "self" },
    { message: "最近、何か面白いことはありましたか？", sender: "other" },
    { message: "特にないですが、映画を観ました。", sender: "self" },
    { message: "どんな映画を観ましたか？", sender: "other" },
    { message: "アクション映画ですごく面白かったです！", sender: "self" },
    {
      message: "それは良いですね！アクション映画は迫力がありますよね。",
      sender: "other",
    },
    { message: "はい、特に戦闘シーンが好きです！", sender: "self" },
    { message: "戦闘シーンは迫力がありますよね！", sender: "other" },
    { message: "そうですね、CGI技術が進化していて驚きます。", sender: "self" },
  ];
  return (
    <div className="flex flex-col max-w-2xl mx-auto">
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          message={message.message}
          sender={message.sender}
        />
      ))}
    </div>
  );
}
