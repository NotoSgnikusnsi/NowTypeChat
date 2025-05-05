// routes/ws.ts
import { Handlers } from "$fresh/server.ts";

const sockets = new Set<WebSocket>();

export const handler: Handlers = {
  GET(req) {
    const { response, socket } = Deno.upgradeWebSocket(req);

    socket.onopen = () => sockets.add(socket);

    socket.onmessage = (e) => {
      for (const client of sockets) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(e.data);
        }
      }
    };

    socket.onclose = () => sockets.delete(socket);
    socket.onerror = () => sockets.delete(socket);

    return response;
  },
};
