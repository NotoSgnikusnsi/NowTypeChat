// import { MessageList } from "../islands/MessageList.tsx";
// import { Form } from "../islands/Form.tsx";

import Chat from "../islands/Chat.tsx";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
      <header className="w-full">
        <h1 className="text-4xl font-bold mb-8 text-black text-center">
          <span className="text-yellow-500">Now</span>TypeChat
        </h1>
      </header>
      {
        /* <main className="w-full flex flex-col items-center">
        <MessageList />
      </main>
      <footer className="w-full max-w-2xl">
        <Form />
      </footer> */
      }
      <Chat />
    </div>
  );
}
