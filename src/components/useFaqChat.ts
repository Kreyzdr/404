import { useEffect, useMemo, useRef, useState } from "react";

import { chatConfig } from "@/chat/config";
import {
  SimpleBotsApiError,
  connectBotChat,
  createThread,
  fetchBot,
  postUserMessage,
} from "@/chat/simpleBotsClient";
import type { SimpleBotSocket } from "@/chat/simpleBotsClient";
import useInViewOnce from "@/hooks/useInViewOnce";
import { useI18n } from "@/i18n";

export interface FaqMsg {
  id: string;
  from: "user" | "bot";
  text: string;
  streaming?: boolean;
}

export interface FaqIntroMsg {
  id: string;
  from: "user" | "bot";
  text: string;
  revealed: boolean;
}

/** Delay before each scripted intro line appears, in milliseconds. */
const INTRO_DELAYS = [0, 2000, 3000];

function nextClientId() {
  return crypto.randomUUID();
}

export function useFaqChat() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<FaqMsg[]>([]);
  const [value, setValue] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [introShown, setIntroShown] = useState(1);

  const { ref: viewRef, inView } = useInViewOnce<HTMLDivElement>(0.35);
  const scrollRef = useRef<HTMLDivElement>(null);
  const threadIdRef = useRef<string | null>(null);
  const socketRef = useRef<SimpleBotSocket | null>(null);
  const streamIdRef = useRef<string | null>(null);
  const waitingRef = useRef(false);
  const bootedRef = useRef(false);
  const userCountRef = useRef(0);
  const limitReachedRef = useRef(false);

  const scrollToEnd = () => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const scheduleScroll = () => {
    requestAnimationFrame(scrollToEnd);
  };

  useEffect(() => {
    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  // The first scripted line is there from the start; the other two land on a
  // timer once the chat is actually on screen. Their layout space is reserved
  // the whole time, so the panel never jumps as they appear.
  useEffect(() => {
    if (!inView) return;
    const timers = INTRO_DELAYS.slice(1).map((delay, index) =>
      window.setTimeout(() => setIntroShown((n) => Math.max(n, index + 2)), delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const intro = useMemo<FaqIntroMsg[]>(
    () => [
      { id: "intro-1", from: "bot", text: t("faq.intro1"), revealed: introShown >= 1 },
      { id: "intro-2", from: "user", text: t("faq.intro2"), revealed: introShown >= 2 },
      { id: "intro-3", from: "bot", text: t("faq.intro3"), revealed: introShown >= 3 },
    ],
    [t, introShown],
  );

  const appendMessage = (message: FaqMsg) => {
    setMessages((previous) => [...previous, message]);
  };

  const updateMessage = (id: string, patch: Partial<FaqMsg>) => {
    setMessages((previous) =>
      previous.map((message) => (message.id === id ? { ...message, ...patch } : message)),
    );
  };

  const finishStream = () => {
    if (streamIdRef.current) {
      updateMessage(streamIdRef.current, { streaming: false });
      streamIdRef.current = null;
    }
    waitingRef.current = false;
    setShowTyping(false);
    setIsBusy(false);
  };

  const handleLimitReached = () => {
    finishStream();
    if (limitReachedRef.current) return;
    limitReachedRef.current = true;
    setLimitReached(true);
    appendMessage({
      id: nextClientId(),
      from: "bot",
      text: t("faq.channelDead"),
    });
    scheduleScroll();
  };

  const startRun = () => {
    if (!socketRef.current) throw new SimpleBotsApiError(t("faq.notReady"));
    waitingRef.current = true;
    setIsBusy(true);
    setShowTyping(true);
    streamIdRef.current = null;
    socketRef.current.startRun();
    scheduleScroll();
  };

  const connectSocket = async (threadId: string) => {
    socketRef.current?.close();
    socketRef.current = await connectBotChat(threadId, {
      onClose: () => {
        socketRef.current = null;
        if (waitingRef.current) finishStream();
      },
      onStart: () => {
        setIsBusy(true);
        setShowTyping(true);
        streamIdRef.current = null;
        scheduleScroll();
      },
      onDelta: (delta) => {
        setShowTyping(false);
        if (!streamIdRef.current) {
          const id = nextClientId();
          streamIdRef.current = id;
          appendMessage({ id, from: "bot", text: delta, streaming: true });
          scheduleScroll();
          return;
        }
        setMessages((previous) =>
          previous.map((message) =>
            message.id === streamIdRef.current
              ? { ...message, text: `${message.text}${delta}` }
              : message,
          ),
        );
        scheduleScroll();
      },
      onDone: () => {
        if (waitingRef.current) {
          finishStream();
          if (userCountRef.current >= chatConfig.messageLimit) {
            handleLimitReached();
          }
        }
      },
      onError: (message) => {
        appendMessage({ id: nextClientId(), from: "bot", text: message });
        waitingRef.current = false;
        setShowTyping(false);
        setIsBusy(false);
        streamIdRef.current = null;
        scheduleScroll();
      },
    });
  };

  const boot = async () => {
    if (bootedRef.current) return;
    setIsBooting(true);
    setIsBusy(true);

    try {
      await fetchBot(chatConfig.botId);
      const thread = await createThread(chatConfig.botId);
      threadIdRef.current = thread.id;

      const history = thread.messages || [];
      let userCount = 0;
      if (history.length > 0) {
        const fromHistory = history.map((message) => {
          const from: FaqMsg["from"] = message.role === "user" ? "user" : "bot";
          if (from === "user") userCount += 1;
          return {
            id: message.id || nextClientId(),
            from,
            text: message.content || "",
          };
        });
        setMessages((previous) => {
          const seen = new Set(fromHistory.map((message) => message.id));
          return [...fromHistory, ...previous.filter((message) => !seen.has(message.id))];
        });
      }
      userCountRef.current = Math.max(userCountRef.current, userCount);

      await connectSocket(thread.id);
      bootedRef.current = true;

      if (userCount >= chatConfig.messageLimit) {
        handleLimitReached();
      }
    } finally {
      setIsBooting(false);
    }
  };

  const send = async () => {
    const text = value.trim();
    if (!text || isBusy || limitReachedRef.current || isBooting) return;
    if (userCountRef.current >= chatConfig.messageLimit) {
      handleLimitReached();
      return;
    }

    setValue("");
    // A real question outranks the script: finish the intro at once so the
    // scripted exchange never sits half-played above the user's message.
    setIntroShown(INTRO_DELAYS.length);
    appendMessage({ id: nextClientId(), from: "user", text });
    setIsBusy(true);
    scheduleScroll();

    try {
      if (!bootedRef.current) {
        await boot();
      }
      if (limitReachedRef.current || !threadIdRef.current) return;

      if (!socketRef.current || socketRef.current.socket.readyState !== WebSocket.OPEN) {
        await connectSocket(threadIdRef.current);
      }
      await postUserMessage(threadIdRef.current, text);
      userCountRef.current += 1;
      startRun();
    } catch (error) {
      if (error instanceof SimpleBotsApiError && error.code === 429) {
        handleLimitReached();
        return;
      }
      const message =
        error instanceof Error ? error.message : t("faq.sendFailed");
      appendMessage({ id: nextClientId(), from: "bot", text: message });
      setIsBusy(false);
      setShowTyping(false);
      scheduleScroll();
    }
  };

  return {
    intro,
    messages,
    value,
    setValue,
    send,
    viewRef,
    scrollRef,
    showTyping,
    limitReached,
    inputDisabled: isBusy || limitReached || isBooting,
  };
}
