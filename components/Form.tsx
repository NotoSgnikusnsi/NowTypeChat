export function Form() {
  return (
    <form
      action="/"
      method="GET"
      className="justify-end flex"
    >
      <div>
        <input
          type="text"
          name="message"
          placeholder="メッセージを入力..."
          required
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
