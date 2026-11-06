/**
 * TrustBar — короткие проверяемые факты (SDD 5).
 * Никаких выдуманных цифр: только то, что подтверждено владельцем
 * и опубликовано на сайте (гео, выезд, доставка, оплата при получении).
 */
export default function TrustBar({
  items = [
    "Выезд на объект в 4 города",
    "Цена согласуется до работ",
    "Электрика и сантехника — сам мастер",
    "Оплата при получении для заточки",
  ],
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  return (
    <ul
      className={`flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t border-white/[0.07] ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-[13px] text-[#555560]">
          <span className="w-1 h-1 rounded-full bg-[#D97706]" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
