"use client";

import { useState } from "react";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { PHONE_NUMBER } from "@/data/contacts";

/**
 * ServiceForm — форма заявки для страниц /uslugi/* и /zatochka/*
 * (SDD 5, T-17): услуга + город (необязательно) + телефон.
 *
 * Обязателен только телефон. Минимум полей — максимум заявок;
 * детали мастер уточняет звонком. Заявка уходит в /api/telegram/notify.
 */
interface ServiceFormProps {
  /** Список услуг для выбора (названия) */
  serviceOptions: string[];
  /** Предвыбранная услуга */
  defaultService?: string;
  /** Города зоны выезда; для мастерской передаётся пустой массив */
  cities?: readonly string[];
  /** Показывать выбор города (мастерская работает без выезда) */
  showCity?: boolean;
  heading?: string;
  note?: string;
  /** Метка формы в GA4 */
  formId?: string;
}

export default function ServiceForm({
  serviceOptions,
  defaultService,
  cities = [],
  showCity = true,
  heading = "Оставить заявку мастеру",
  note = "Мастер свяжется, уточнит детали и назовёт цену. Без предоплаты до замера.",
  formId = "service",
}: ServiceFormProps) {
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService ?? serviceOptions[0] ?? "");
  const [city, setCity] = useState("");
  /** Honeypot: люди это поле не видят, боты заполняют — заявка отбрасывается */
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (phone.replace(/\D/g, "").length < 9) {
      setError("Укажите номер телефона — иначе мастер не сможет связаться");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/telegram/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          service,
          city: showCity && city.trim() ? city.trim() : undefined,
          website,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Failed to submit");
      }

      setSubmitted(true);
      setPhone("");
      setCity("");
      setWebsite("");
      trackEvent("generate_lead", { form: formId, service });
    } catch (err) {
      setError(
        err instanceof Error && err.message.includes("Слишком много")
          ? err.message
          : "Не удалось отправить заявку. Позвоните — так быстрее."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-[#080809] border border-white/[0.09] text-[#EDE8E0] placeholder-[#333337] " +
    // text-base на мобильных: с font-size 16px iOS не зумит страницу при фокусе
    "rounded-[2px] px-4 py-3.5 text-base md:text-sm focus:outline-none focus:border-[#D97706]/60 " +
    "focus:ring-1 focus:ring-[#D97706]/20 transition-all duration-200";

  const labelBase =
    "block text-[#555560] text-[10px] font-bold tracking-[0.2em] uppercase mb-2 select-none";

  if (submitted) {
    return (
      <div
        id="order"
        className="border border-[#D97706]/25 bg-[#D97706]/[0.06] rounded-[3px] p-8 text-center"
      >
        <h3 className="text-[#EDE8E0] font-bold text-xl mb-2">Заявка отправлена</h3>
        <p className="text-[#8B94A3] text-sm leading-relaxed max-w-sm mx-auto">
          Мастер свяжется с вами, уточнит объём и назовёт цену.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors underline underline-offset-2"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <section id="order" aria-labelledby="service-form-heading" className="py-16 md:py-20">
      <div className="grid md:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
        <div>
          <h2
            id="service-form-heading"
            className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
          >
            {heading}
          </h2>
          <p className="text-[#8B94A3] text-sm leading-relaxed mb-6">{note}</p>
          <div className="inline-flex items-center gap-2.5 border border-[#D97706]/25 bg-[#D97706]/[0.06] rounded-[2px] px-4 py-3">
            <MessageCircle size={15} className="text-[#D97706]" aria-hidden="true" />
            <span className="text-[#D97706] text-xs font-semibold">
              Ответ в течение 2 часов
            </span>
          </div>
          <p className="mt-6">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 text-[#C8C2BA] text-sm hover:text-[#D97706] transition-colors"
            >
              <Phone size={14} aria-hidden="true" />
              +375 (25) 781-09-98
            </a>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#111113] border border-white/[0.07] rounded-[3px] p-6 md:p-8 space-y-5"
        >
          <div>
            <label htmlFor={`${formId}-service`} className={labelBase}>
              Услуга
            </label>
            <select
              id={`${formId}-service`}
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={inputBase}
            >
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {showCity && (
            <div>
              <label htmlFor={`${formId}-city`} className={labelBase}>
                Город <span className="text-[#333337]">(необязательно)</span>
              </label>
              <input
                id={`${formId}-city`}
                type="text"
                autoComplete="address-level2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={cities[0] ? `Например, ${cities[0]}` : "Необязательно"}
                list={cities.length > 0 ? `${formId}-cities` : undefined}
                className={inputBase}
              />
              {cities.length > 0 && (
                <datalist id={`${formId}-cities`}>
                  {cities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              )}
            </div>
          )}

          {/* Honeypot: скрыто от людей, но присутствует в DOM для ботов */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor={`${formId}-website`}>Сайт</label>
            <input
              id={`${formId}-website`}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-phone`} className={labelBase}>
              Телефон <span className="text-[#D97706]">*</span>
            </label>
            <input
              id={`${formId}-phone`}
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+375 (XX) XXX-XX-XX"
              className={inputBase}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D97706] text-[#0A0A0B] font-bold text-[15px] py-4 rounded-[2px] hover:bg-[#F59E0B] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Отправка..." : "Отправить заявку"}
            {!loading && (
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              />
            )}
          </button>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-[2px] px-4 py-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <p className="text-center text-[#333337] text-[11px] leading-relaxed">
            Нажимая кнопку, вы соглашаетесь на обработку номера телефона для ответа на заявку
          </p>
        </form>
      </div>
    </section>
  );
}
