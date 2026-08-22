"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { supabase } from "@/lib/supabase";

const PERKS = [
  "Фото до и после заточки",
  "Надёжная упаковка при возврате",
  "Наложенный платёж или предоплата",
  "Белпочта и Европочта по всей Беларуси",
];

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Валидация: телефон обязателен
    if (!form.phone.trim()) {
      setError("Номер телефона обязателен");
      return;
    }

    setLoading(true);

    try {
      const { data, error: supabaseError } = await supabase
        .from("orders")
        .insert([
          {
            phone: form.phone.trim(),
            name: form.name.trim() || null,
            city: form.city.trim() || null,
            description: form.desc.trim() || null
          },
        ])
        .select();

      if (supabaseError) {
        throw supabaseError;
      }

      // Отправляем уведомление в Telegram
      if (data && data[0]) {
        try {
          await fetch("/api/telegram/notify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: data[0].id,
              name: form.name.trim() || undefined,
              phone: form.phone.trim(),
              city: form.city.trim() || undefined,
              description: form.desc.trim() || undefined,
              createdAt: data[0].created_at,
            }),
          });
          // Не блокируем пользователя если Telegram недоступен
        } catch (telegramError) {
          console.error("Telegram notification failed:", telegramError);
          // Продолжаем работу, заказ уже сохранён
        }
      }

      setSubmitted(true);
      setForm({ name: "", phone: "", city: "", desc: "" });
    } catch (err) {
      console.error("Error submitting order:", err);
      setError("Произошла ошибка при отправке заявки. Попробуйте ещё раз.");
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
              Заполните форму — мастер свяжется с вами в течение{" "}
              <strong className="text-[#C8C2BA] font-semibold">2 часов</strong> для уточнения
              деталей и согласования стоимости. Без предоплаты до оценки.
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
                    setForm({ name: "", phone: "", city: "", desc: "" });
                  }}
                  className="mt-8 text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors underline underline-offset-2"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-name" className={labelBase}>
                      Имя
                    </label>
                    <input
                      id="f-name"
                      type="text"
                      autoComplete="given-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ваше имя"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="f-phone" className={labelBase}>
                      Телефон <span className="text-[#D97706]">*</span>
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+375 (XX) XXX-XX-XX"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="f-city" className={labelBase}>
                    Город отправки
                  </label>
                  <input
                    id="f-city"
                    type="text"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Минск, Витебск, Гомель..."
                    className={inputBase}
                  />
                </div>

                {/* What to sharpen */}
                <div>
                  <label htmlFor="f-desc" className={labelBase}>
                    Что заточить
                  </label>
                  <textarea
                    id="f-desc"
                    rows={4}
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    placeholder="Опишите инструмент: вид, количество, состояние. Например: 3 кухонных ножа, сильно затуплены."
                    className={`${inputBase} resize-none`}
                  />
                </div>

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
                  Мастер свяжется в течение 2 часов · Без спама · Без обязательств
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
