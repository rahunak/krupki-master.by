export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[#D97706] font-mono font-bold tracking-[0.2em] text-[10px] uppercase mb-3">
      <span className="block w-4 h-px bg-[#D97706]/60" />
      {children}
    </p>
  );
}
