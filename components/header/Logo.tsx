function BladeMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M2 16L14 2L16 4L6 16H2Z" fill="#D97706" />
      <path d="M2 16L4 14L6 16H2Z" fill="#F59E0B" />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 shrink-0 select-none group">
      <BladeMark />
      <span className="font-mono font-bold tracking-[0.22em] text-[11px] uppercase text-[#D97706]">
        Krupki
      </span>
      <span className="w-px h-3.5 bg-white/25" />
      <span className="font-semibold tracking-wide text-sm text-[#C8C2BA] group-hover:text-[#EDE8E0] transition-colors duration-200">
        Master
      </span>
    </a>
  );
}
