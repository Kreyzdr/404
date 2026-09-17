import { simpleBotsHttpBase, simpleBotsWsUrl } from "./config";

export interface SimpleBotPublic {
  id: string;
  name: string;
}

export interface SimpleBotMessage {
  id: string;
  role: string;
  content: string;
  from_name?: string | null;
  created_at: number;
  updated_at: number;
}

export interface SimpleBotThread {
  id: string;
  bot_id: string;
  messages: SimpleBotMessage[];
}

interface ApiEnvelope<T> {
  status: boolean;
  data?: T;
  message?: string | null;
  detail?: string;
}

export class SimpleBotsApiError extends Error {
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = "SimpleBotsApiError";
    this.code = code;
  }
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${simpleBotsHttpBase()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  });

  let body: ApiEnvelope<T> | null = null;
  try {
    body = (await response.json()) as ApiEnvelope<T>;
  } catch {
    body = null;
  }

  if (response.status === 429) {
    throw new SimpleBotsApiError(
      body?.detail || body?.message || "Message limit reached. Please try again later.",
      429,
    );
  }

  if (!response.ok) {
    throw new SimpleBotsApiError(
      body?.message || `Request failed (${response.status})`,
      response.status,
    );
  }

  if (body && body.status === false) {
    throw new SimpleBotsApiError(body.message || "Request failed");
  }

  return body?.data as T;
}

export async function fetchBot(botId: string) {
  return api<SimpleBotPublic>(`/${encodeURIComponent(botId)}`);
}

export async function createThread(botId: string) {
  const data = await api<{ thread: SimpleBotThread }>("/threads", {
    method: "POST",
    body: JSON.stringify({
      bot_id: botId,
    }),
  });
  return data.thread;
}

export async function postUserMessage(threadId: string, content: string) {
  return api<SimpleBotMessage>(
    `/threads/${encodeURIComponent(threadId)}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    },
  );
}

export interface StreamHandlers {
  onStart?: () => void;
  onDelta?: (delta: string) => void;
  onDone?: () => void;
  onError?: (message: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface SimpleBotSocket {
  socket: WebSocket;
  startRun: () => void;
  close: () => void;
}

interface WsEnvelope {
  event?: string;
  message?: string;
  data?: { delta?: string };
}

export function connectBotChat(
  threadId: string,
  handlers: StreamHandlers,
): Promise<SimpleBotSocket> {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(simpleBotsWsUrl(threadId));
    let opened = false;

    socket.onopen = () => {
      opened = true;
      handlers.onOpen?.();
      resolve({
        socket,
        startRun: () => {
          if (socket.readyState !== WebSocket.OPEN) {
            throw new SimpleBotsApiError("Chat connection is not ready");
          }
          socket.send(JSON.stringify({ event: "start_run" }));
        },
        close: () => socket.close(),
      });
    };

    socket.onmessage = (event) => {
      let envelope: WsEnvelope;
      try {
        envelope = JSON.parse(String(event.data)) as WsEnvelope;
      } catch {
        return;
      }

      const name = envelope.event;
      if (name === "start") {
        handlers.onStart?.();
        return;
      }
      if (name === "delta") {
        const delta = typeof envelope.data?.delta === "string" ? envelope.data.delta : "";
        if (delta) handlers.onDelta?.(delta);
        return;
      }
      if (name === "done" || name === "sync") {
        handlers.onDone?.();
        return;
      }
      if (name === "error") {
        handlers.onError?.(envelope.message || "Something went wrong. Please try again.");
      }
    };

    socket.onerror = () => {
      if (!opened) reject(new SimpleBotsApiError("Failed to connect to chat"));
    };

    socket.onclose = () => {
      handlers.onClose?.();
    };
  });
}
