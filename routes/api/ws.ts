import { serve } from "$std/http/server.ts";

const sockets = new Set<WebSocket>();

serve((req) => {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("Request is not a WebSocket upgrade.", { status: 400 });
  }

  const { response, socket } = Deno.upgradeWebSocket(req);
  socket.onopen = () => {
    sockets.add(socket);
    console.log("WebSocket connection opened");
  };

  socket.onmessage = (event) => {
    const message = event.data;
    console.log("Received message:", message);
    for (const s of sockets) {
      s.send(message);
    }
  };

  socket.onclose = () => {
    sockets.delete(socket);
    console.log("WebSocket connection closed");
  };

  return response;
});
