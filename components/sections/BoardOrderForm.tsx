"use client";

import { useState } from "react";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import SectionLabel from "./SectionLabel";

/**
 * Форма заказа изделий из дерева (разделочные доски, менажницы, наборы).
 * Поля: телефон, адрес доставки, тип изделия, пожелания.
 * Отправка — тот же API-эндпоинт /api/telegram/notify (общий флоу заявок).
 */

import { GIFT_HIDDEN } from "@/data/boards";
import { trackEvent } from "@/lib/analytics";

type ProductType = "small-board" | "large-board" | "menazhnitsa" | "gift-set" | "other";

const PRODUCT_OPTIONS: { value: ProductType; label: string }[] = [
  { value: "small-board", label: "Доска 30×20 см — 35–45 р." },
  { value: "large-board", label: "Доска 40×30 см — 55–75 р." },
  { value: "menazhnitsa", label: "Менажница — 80–130 р." },
  // TEMP-GIFT: вариант скрыт до появления подарочных наборов (GIFT_HIDDEN в data/boards.ts)
  { value: "gift-set", label: "Подарочный набор — 120–140 р." },
  { value: "other", label: "Другое / на заказ" },
];

const visibleProductOptions = PRODUCT_OPTIONS.filter(
  (o) => !(GIFT_HIDDEN && o.value === "gift-set"),
);

export default function BoardOrderForm() {
  const [form, setForm] = useState({ phone: "", address: "", notes: "" });
  const [product, setProduct] = useState<ProductType>("large-board");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setError("Укажите номер телефона — иначе мастер не сможет связаться");
      return;
    }

    setLoading(true);

    try {
      const selected =
        product === "other"
          ? "Изделие из дерева (уточнить)"
          : PRODUCT_OPTIONS.find((o) => o.value === product)?.label ?? "Изделие из дерева";

      const description = [
        form.notes.trim() ? `Пожелания: ${form.notes.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/telegram/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone.trim(),
          // адрес доставки кладём в address (для досок это и есть город + адрес)
          address: form.address.trim(),
          productType: selected,
          ...(description ? { description } : {}),
          contactMethod: "viber",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
      setForm({ phone: "", address: "", notes: "" });
      setProduct("large-board");
      // Конверсия для GA4 (keyEvent generate_lead): заказ доски успешно ушёл
      trackEvent("generate_lead", { form: "board", product_type: selected });
    } catch (err) {
      console.error("Error submitting board order:", err);
      setError("Произошла ошибка при отправке заказа. Попробуйте ещё раз или позвоните нам.");
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
          {/* Left — контекст */}
          <div className="md:sticky md:top-24">
            <SectionLabel>Изготовление под заказ</SectionLabel>
            <h2
              id="order-heading"
              className="text-3xl md:text-4xl font-bold text-[#EDE8E0] tracking-tight mb-5"
            >
              Оформить заказ
            </h2>
            <p className="text-[#555560] text-sm leading-relaxed mb-8">
              Выберите изделие, оставьте телефон и адрес — мастер свяжется с вами в{" "}
              <strong className="text-[#C8C2BA] font-semibold">Viber</strong> или перезвонит в
              течение <strong className="text-[#C8C2BA] font-semibold">2 часов</strong>,
              подтвердит модель, размер и срок (3–7 дней на изготовление). Отправка Белпочтой
              или Европочтой по всей Беларуси, оплата наложенным платежом.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <span className="mt-[5px] w-1 h-1 rounded-full bg-[#D97706] shrink-0" />
                <span className="text-[#555560] text-sm">Массив дуба, ручная работа</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[5px] w-1 h-1 rounded-full bg-[#D97706] shrink-0" />
                <span className="text-[#555560] text-sm">
                  Отделка маслом и воском — безопасно для продуктов
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[5px] w-1 h-1 rounded-full bg-[#D97706] shrink-0" />
                <span className="text-[#555560] text-sm">
                  Если с изделием что-то не так при получении — замена или переделка
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[5px] w-1 h-1 rounded-full bg-[#D97706] shrink-0" />
                <span className="text-[#555560] text-sm">
                  Оплата при получении — наложенный платёж
                </span>
              </li>
            </ul>

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

          {/* Right — форма */}
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
                <h3 className="text-[#EDE8E0] font-bold text-xl mb-2">Заказ отправлен!</h3>
                <p className="text-[#555560] text-sm max-w-xs leading-relaxed">
                  Мастер свяжется с вами в течение 2 часов, уточнит детали и назовёт точный
                  срок изготовления.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ phone: "", address: "", notes: "" });
                    setProduct("large-board");
                  }}
                  className="mt-8 text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors underline underline-offset-2"
                >
                  Отправить ещё один заказ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Тип изделия */}
                <fieldset>
                  <legend className={labelBase}>
                    Что заказать <span className="text-[#D97706]">*</span>
                  </legend>
                  <div className="space-y-2.5">
                    {visibleProductOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 cursor-pointer border rounded-[2px] px-4 py-3 text-sm transition-all duration-150 ${
                          product === opt.value
                            ? "border-[#D97706] bg-[#D97706]/[0.08] text-[#EDE8E0]"
                            : "border-white/[0.09] bg-[#080809] text-[#555560] hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="board-product"
                          value={opt.value}
                          checked={product === opt.value}
                          onChange={() => setProduct(opt.value)}
                          className="sr-only"
                        />
                        <span
                          className={`w-3.5 h-3.5 rounded-full border shrink-0 ${
                            product === opt.value
                              ? "border-[#D97706] bg-[#D97706]"
                              : "border-white/20"
                          }`}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Телефон */}
                <div>
                  <label htmlFor="b-phone" className={labelBase}>
                    Телефон <span className="text-[#D97706]">*</span>
                  </label>
                  <input
                    id="b-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+375 (XX) XXX-XX-XX"
                    className={inputBase}
                  />
                </div>

                {/* Адрес доставки */}
                <div>
                  <label htmlFor="b-address" className={labelBase}>
                    Адрес доставки
                  </label>
                  <input
                    id="b-address"
                    type="text"
                    autoComplete="postal-address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Город, индекс, отделение почты"
                    className={inputBase}
                  />
                </div>

                {/* Пожелания */}
                <div>
                  <label htmlFor="b-notes" className={labelBase}>
                    Пожелания
                  </label>
                  <textarea
                    id="b-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Размер, гравировка, порода дерева, срок — всё, что важно"
                    className={inputBase + " resize-none"}
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
                      Отправить заказ мастеру
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>

                {/* Error */}
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
