import { MapPin } from "lucide-react";
import { SERVICE_CITIES, SERVICE_ZONE_NOTE } from "@/data/services";

/**
 * ServiceZone — блок «зона выезда» (SDD 5): города перечислены явно,
 * гео живёт в тексте страницы, а не в URL (запрет на гео-страницы).
 */
export default function ServiceZone({ note }: { note?: string }) {
  return (
    <section
      aria-labelledby="zone-heading"
      className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-7 md:p-9"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <MapPin size={15} className="text-[#D97706]" aria-hidden="true" />
        <h2
          id="zone-heading"
          className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706]"
        >
          Зона выезда
        </h2>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        {SERVICE_CITIES.map((city) => (
          <li key={city} className="text-[#EDE8E0] text-sm font-medium">
            {city}
          </li>
        ))}
      </ul>
      <p className="text-[#6E7886] text-sm leading-relaxed">{note ?? SERVICE_ZONE_NOTE}</p>
    </section>
  );
}
