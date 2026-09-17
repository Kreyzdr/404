import type { ChangeEvent, FormEvent } from "react";

import { linkifyText } from "@/chat/linkify";
import { useI18n } from "@/i18n";

import { useFaqChat } from "./useFaqChat";

/** Embedded FAQ chat widget (heading lives in the surrounding landing art). */
export default function FaqChat() {
  const { t } = useI18n();
  const {
    intro,
    messages,
    value,
    setValue,
    send,
    viewRef,
    scrollRef,
    showTyping,
    limitReached,
    inputDisabled,
  } = useFaqChat();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      id="faq"
      ref={viewRef}
      className="mx-auto w-full max-w-[588px] border border-hair bg-panel"
    >
      <div
        ref={scrollRef}
        className="chat-history max-h-[min(60vh,440px)] space-y-3 overflow-y-auto p-4 sm:p-5"
        aria-live="polite"
        aria-label="FAQ conversation"
      >
        {intro.map((m) => (
          <div
            key={m.id}
            aria-hidden={!m.revealed}
            className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 text-[15px] leading-snug transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-opacity ${
              m.from === "user"
                ? "ml-auto bg-accent text-cream"
                : "mr-auto bg-white/[0.06] text-cream"
            } ${
              m.revealed
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-0 motion-reduce:translate-y-0"
            }`}
          >
            {m.text}
          </div>
        ))}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 text-[15px] leading-snug ${
              m.from === "user"
                ? "ml-auto bg-accent text-cream"
                : "mr-auto bg-white/[0.06] text-cream"
            }`}
          >
            {m.from === "bot" && !m.streaming ? linkifyText(m.text) : m.text}
          </div>
        ))}
        {showTyping && (
          <div className="mr-auto flex max-w-[85%] items-center gap-1.5 bg-white/[0.06] px-3 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="faq-dot h-2 w-2 rounded-full bg-muted"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 border-t border-hair px-4 py-3"
      >
        <label htmlFor="faq-input" className="sr-only">
          {t("faq.inputLabel")}
        </label>
        <input
          id="faq-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={limitReached ? t("faq.ended") : t("faq.placeholder")}
          autoComplete="off"
          disabled={inputDisabled}
          className="min-h-[44px] flex-1 bg-transparent font-body text-sm text-cream placeholder:text-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={inputDisabled}
          className="btn-accent px-5 font-label text-sm font-semibold uppercase tracking-[0.15em]"
        >
          {t("faq.send")}
        </button>
      </form>
    </div>
  );
}
