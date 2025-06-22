import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { createServer } from './index.js'

console.error('Starting SSE server...');

const app = express();

const transports: Map<string, SSEServerTransport> = new Map<string, SSEServerTransport>();

app.get("/sse", async (req: express.Request, res: express.Response) => {
  let transport: SSEServerTransport;
  const server = createServer({ config: {} });

  if (req?.query?.sessionId) {
    const sessionId = (req?.query?.sessionId as string);
    transport = transports.get(sessionId) as SSEServerTransport;
    console.error("Client Reconnecting? This shouldn't happen; when client has a sessionId, GET /sse should not be called again.", transport.sessionId);
  } else {
    // Create and store transport for new session
    transport = new SSEServerTransport("/message", res);
    transports.set(transport.sessionId, transport);

    // Connect server to transport
    await server.connect(transport);
    console.error("Client Connected: ", transport.sessionId);
  }

});

app.post("/message", async (req: express.Request, res: express.Response) => {
  const sessionId = (req?.query?.sessionId as string);
  const transport = transports.get(sessionId);
  if (transport) {
    console.error("Client Message from", sessionId);
    await transport.handlePostMessage(req, res);
  } else {
    console.error(`No transport found for sessionId ${sessionId}`)
  }
});

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.error(`Server is running on port ${PORT}`);
});