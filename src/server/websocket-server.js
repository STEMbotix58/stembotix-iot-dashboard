import http from "node:http";
import { randomUUID } from "node:crypto";
import { URL } from "node:url";
import { WebSocket, WebSocketServer } from "ws";

const PORT = Number(process.env.PORT ?? 5000);
const FRONTEND_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const devices = [
  {
    id: "DEV-001",
    name: "Temperature Sensor A1",
    siteId: "site-001",
    status: "Online",
    location: "Factory A",
  },
  {
    id: "DEV-002",
    name: "Smart Light L4",
    siteId: "site-001",
    status: "Online",
    location: "Factory A",
  },
  {
    id: "DEV-003",
    name: "Smart Fan F3",
    siteId: "site-002",
    status: "Online",
    location: "Warehouse",
  },
];

const telemetryHistory = new Map(devices.map((device) => [device.id, []]));

const server = http.createServer(async (req, res) => {
  applyCors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, {
        success: true,
        message: "Runtime API healthy",
        data: {
          websocket: true,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/devices") {
      sendJson(res, 200, {
        success: true,
        message: "Devices fetched successfully",
        data: devices,
      });
      return;
    }

    const telemetryMatch = url.pathname.match(/^\/api\/telemetry\/([^/]+)$/);

    if (req.method === "GET" && telemetryMatch) {
      const deviceId = decodeURIComponent(telemetryMatch[1]);

      sendJson(res, 200, {
        success: true,
        message: "Telemetry fetched successfully",
        data: telemetryHistory.get(deviceId) ?? [],
      });
      return;
    }

    const commandMatch = url.pathname.match(
      /^\/api\/devices\/([^/]+)\/command$/,
    );

    if (req.method === "POST" && commandMatch) {
      const deviceId = decodeURIComponent(commandMatch[1]);
      const body = await readJsonBody(req);
      const command = normalizeCommand(deviceId, body);

      if (!command.ok) {
        sendJson(res, 400, {
          success: false,
          message: command.error,
          data: null,
        });
        return;
      }

      const commandId = randomUUID();
      const accepted = {
        success: true,
        commandId,
        status: "queued",
      };

      broadcast({
        event: "command:created",
        data: {
          id: commandId,
          deviceId,
          command: command.value.command,
          value: command.value.value,
          status: "queued",
          timestamp: new Date().toISOString(),
        },
      });

      sendJson(res, 202, {
        success: true,
        message: "Command accepted",
        data: accepted,
      });

      setTimeout(() => {
        broadcast({
          event: "command:success",
          data: {
            id: commandId,
            deviceId,
            status: "success",
            timestamp: new Date().toISOString(),
          },
        });
      }, 250);

      return;
    }

    sendJson(res, 404, {
      success: false,
      message: "Route not found",
      data: null,
    });
  } catch (error) {
    sendJson(res, 500, {
      success: false,
      message: "Runtime API error",
      data: {
        error: error instanceof Error ? error.message : String(error),
      },
    });
  }
});

const wss = new WebSocketServer({
  server,
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  const interval = setInterval(() => {
    const telemetry = createTelemetrySample();

    telemetryHistory.get(telemetry.deviceId)?.push(telemetry);
    trimTelemetryHistory(telemetry.deviceId);

    ws.send(
      JSON.stringify({
        event: "telemetry",
        deviceId: telemetry.deviceId,
        timestamp: telemetry.timestamp,
        payload: telemetry,
      }),
    );
  }, 3000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(PORT, () => {
  console.log(`HTTP API running on http://localhost:${PORT}/api`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

function applyCors(req, res) {
  const origin = req.headers.origin;
  const allowedOrigin =
    origin && FRONTEND_ORIGINS.has(origin) ? origin : "http://localhost:5173";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader("Vary", "Origin");
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });

    req.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Request body must be valid JSON"));
      }
    });

    req.on("error", reject);
  });
}

function normalizeCommand(deviceId, body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      ok: false,
      error: "Command payload must be a JSON object",
    };
  }

  const command = typeof body.command === "string" ? body.command.trim() : "";
  const value = body.value;

  if (!command) {
    return {
      ok: false,
      error: "Command is required",
    };
  }

  if (!["string", "number", "boolean", "undefined"].includes(typeof value)) {
    return {
      ok: false,
      error: "Command value must be a string, number, boolean, or omitted",
    };
  }

  return {
    ok: true,
    value: {
      deviceId,
      command,
      value,
    },
  };
}

function createTelemetrySample() {
  const device = devices[Math.floor(Math.random() * devices.length)];
  const timestamp = new Date().toISOString();
  const common = {
    id: `telemetry-${randomUUID()}`,
    deviceId: device.id,
    timestamp,
  };

  if (device.id === "DEV-001") {
    return {
      ...common,
      metrics: [
        { key: "temperature", value: randomInt(22, 52), unit: "C" },
        { key: "humidity", value: randomInt(45, 72), unit: "%" },
        { key: "battery", value: randomInt(18, 96), unit: "%" },
      ],
    };
  }

  if (device.id === "DEV-002") {
    return {
      ...common,
      metrics: [
        { key: "power", value: 1 },
        { key: "brightness", value: randomInt(20, 100), unit: "%" },
        { key: "energy", value: randomInt(8, 35), unit: "W" },
      ],
    };
  }

  return {
    ...common,
    metrics: [
      { key: "power", value: 1 },
      { key: "fan_speed", value: randomInt(1, 5) },
      { key: "motion", value: Math.random() > 0.5 ? 1 : 0 },
    ],
  };
}

function trimTelemetryHistory(deviceId) {
  const history = telemetryHistory.get(deviceId);

  if (!history) return;

  while (history.length > 100) {
    history.shift();
  }
}

function broadcast(payload) {
  const serialized = JSON.stringify(payload);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(serialized);
    }
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
