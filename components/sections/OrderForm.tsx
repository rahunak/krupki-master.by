"use client";

import { useState } from "react";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { supabase } from "@/lib/supabase";

const PERKS = [
  "Фото до и после заточки",
  "Надёжная упаковка при возврате",
  "Наложенный платёж или предоплата",
  "Белпочта и Европочта по всей Беларуси",
];

/** Основные каналы связи: Viber и звонок (по запросу заказчика) */
type ContactMethod = "viber" | "call";

export default function OrderForm() {
  const [form, setForm] = useState({ phone: "" });
  const [contactMethod, setContactMethod] = useState<ContactMethod>("viber");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Валидация: телефон обязателен, минимум 9 цифр (номер РБ без кода)
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setError("Укажите номер телефона — иначе мастер не сможет связаться");
      return;
    }

    setLoading(true);

    try {
      // Заявка сохраняется в Supabase и уходит уведомлением в Telegram-канал
      // (сервер сам подставит TELEGRAM_CHANNEL_ID). Имя/город/описание убраны:
      // единственный обязательный контакт — телефон, детали мастер уточнит сам.
      const res = await fetch("/api/telegram/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone.trim(),
          contactMethod,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
      setForm({ phone: "" });
      setContactMethod("viber");
    } catch (err) {
      console.error("Error submitting order:", err);
      setError("Произошла ошибка при отправке заявки. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-[#080809] border border-white/[0.09] text-[#EDE8E0] placeholder-[#333337] " +
    "rounded-[2px] px-4 py-3.5 text-sm focus:outline-none focus:border-[#D97706]/60 " +
    "focus:ring-1 focus:ring-[#D97706]/20 transition-all duration-200";

  const labelBase =
    "block text-[#555560] text-[10px] font-bold tracking-[0.2em] uppercase mb-2 select-none";

  return (
    <section
      id="order"
      aria-labelledby="order-heading"
      className="py-24 md:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
          {/* Left — sticky context panel */}
          <div className="md:sticky md:top-24">
            <SectionLabel>Работаем по всей Беларуси</SectionLabel>
            <h2
              id="order-heading"
              className="text-3xl md:text-4xl font-bold text-[#EDE8E0] tracking-tight mb-5"
            >
              Оформить заявку
            </h2>
            <p className="text-[#555560] text-sm leading-relaxed mb-8">
              Оставьте только номер телефона — мастер свяжется с вами в{" "}
              <strong className="text-[#C8C2BA] font-semibold">Viber</strong> или перезвонит
              в течение <strong className="text-[#C8C2BA] font-semibold">2 часов</strong>,
              уточнит детали и назовёт цену. Без предоплаты до оценки.
            </p>

            <ul className="space-y-4 mb-10">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-[5px] w-1 h-1 rounded-full bg-[#D97706] shrink-0" />
                  <span className="text-[#555560] text-sm">{p}</span>
                </li>
              ))}
            </ul>

            {/* Response time badge */}
            <div className="inline-flex items-center gap-3 border border-[#D97706]/25 bg-[#D97706]/[0.06] rounded-[2px] px-4 py-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D97706]" />
              </span>
              <span className="text-[#D97706] text-xs font-semibold">
                Мастер отвечает в течение 2 часов
              </span>
            </div>
          </div>

          {/* Right — form card */}
          <div className="bg-[#111113] border border-white/[0.07] rounded-[3px] p-7 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[360px] text-center">
                <div className="w-16 h-16 rounded-[2px] bg-[#D97706]/10 border border-[#D97706]/25 flex items-center justify-center mb-6">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-[#EDE8E0] font-bold text-xl mb-2">Заявка отправлена!</h3>
                <p className="text-[#555560] text-sm max-w-xs leading-relaxed">
                  Мастер свяжется с вами в течение 2 часов для подтверждения деталей.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ phone: "" });
                    setContactMethod("viber");
                  }}
                  className="mt-8 text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors underline underline-offset-2"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Только телефон — остальное мастер уточнит при связи */}
                <div>
                  <label htmlFor="f-phone" className={labelBase}>
                    Телефон <span className="text-[#D97706]">*</span>
                  </label>
                  <input
                    id="f-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ phone: e.target.value })}
                    placeholder="+375 (XX) XXX-XX-XX"
                    className={inputBase}
                  />
                </div>

                {/* Канал связи: Viber (по умолчанию) или звонок */}
                <fieldset>
                  <legend className={labelBase}>
                    Как связаться
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center justify-center gap-2 cursor-pointer border rounded-[2px] px-4 py-3.5 text-sm transition-all duration-150 ${
                        contactMethod === "viber"
                          ? "border-[#D97706] bg-[#D97706]/[0.08] text-[#EDE8E0]"
                          : "border-white/[0.09] bg-[#080809] text-[#555560] hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="contact-method"
                        value="viber"
                        checked={contactMethod === "viber"}
                        onChange={() => setContactMethod("viber")}
                        className="sr-only"
                      />
                      <MessageCircle size={16} className={contactMethod === "viber" ? "text-[#D97706]" : "text-[#555560]"} aria-hidden="true" />
                      Viber
                    </label>
                    <label
                      className={`flex items-center justify-center gap-2 cursor-pointer border rounded-[2px] px-4 py-3.5 text-sm transition-all duration-150 ${
                        contactMethod === "call"
                          ? "border-[#D97706] bg-[#D97706]/[0.08] text-[#EDE8E0]"
                          : "border-white/[0.09] bg-[#080809] text-[#555560] hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="contact-method"
                        value="call"
                        checked={contactMethod === "call"}
                        onChange={() => setContactMethod("call")}
                        className="sr-only"
                      />
                      <Phone size={16} className={contactMethod === "call" ? "text-[#D97706]" : "text-[#555560]"} aria-hidden="true" />
                      Позвонить
                    </label>
                  </div>
                </fieldset>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D97706] text-[#0A0A0B] font-bold text-[15px] py-4 rounded-[2px] hover:bg-[#F59E0B] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 group mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Отправка...
                    </>
                  ) : (
                    <>
                      Отправить заявку мастеру
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>

                {/* Error message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/25 rounded-[2px] px-4 py-3 text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <p className="text-center text-[#333337] text-[11px] leading-relaxed pt-1">
                  Мастер напишет в Viber или перезвонит в течение 2 часов · Без спама
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
