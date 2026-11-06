import Image from "next/image";
import type { WorkItem } from "@/data/works";

/**
 * WorkGallery — галерея «до/после» (SDD 5, 4.3).
 *
 * Пустое состояние осознанное: пока владелец не передал фотографии (T-09),
 * никаких стоковых «примеров работ» — иначе это обман клиента и риск
 * для E-E-A-T. Вместо фото — честное объяснение без ссылки на /raboty/:
 * пока портфолио пустое, вести туда клиента незачем.
 */
export default function WorkGallery({
  works,
  title = "Примеры работ",
  emptyText = "Фотографии объектов добавляем по мере съёмки: показывать чужие или стоковые работы считаем неправильным. Примеры по вашей задаче расскажем по телефону.",
}: {
  works: WorkItem[];
  title?: string;
  emptyText?: string;
}) {
  if (works.length === 0) {
    return (
      <section aria-labelledby="works-heading" className="py-12">
        <h2 id="works-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
          {title}
        </h2>
        <div className="border border-dashed border-white/[0.12] bg-white/[0.015] rounded-[3px] p-7">
          <p className="text-[#7A8494] text-sm leading-relaxed max-w-2xl">{emptyText}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="works-heading" className="py-12">
      <h2 id="works-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
        {title}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {works.map((w) => (
          <article
            key={w.slug}
            className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] overflow-hidden"
          >
            {w.photosAfter[0] && (
              <div className="relative aspect-[4/3]">
                <Image
                  src={`/${w.photosAfter[0]}`}
                  alt={`${w.title} — ${w.city}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-[#EDE8E0] font-semibold text-sm mb-1">{w.title}</h3>
              <p className="text-[#555560] text-xs mb-2">
                {w.city}
                {w.area ? ` · ${w.area} м²` : ""}
                {w.duration ? ` · ${w.duration}` : ""}
              </p>
              <p className="text-[#7A8494] text-sm leading-relaxed">{w.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
