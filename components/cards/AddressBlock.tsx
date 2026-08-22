import { StepDetails } from "@/interfaces/StepDetails";

interface AddressBlockProps {
    details: StepDetails;
}

export function AddressBlock({ details }: AddressBlockProps) {
    return (
        <div className="md:absolute md:left-0 md:right-0 md:top-full md:z-10 bg-[#0F0F11] border-t border-[#D97706]/20 p-6 md:p-8">
            <div className="space-y-3 text-sm">
                <div>
                    <p className="text-[#D97706] text-xs font-semibold mb-2 tracking-wider uppercase">
                        Адрес для Белпочты:
                    </p>
                    <p className="text-[#888890] leading-relaxed">{details.address}</p>
                </div>

                <div>
                    <p className="text-[#888890]">
                        <span className="text-[#666670]">Получатель:</span>{' '}
                        <span className="text-[#EDE8E0]">{details.recipient}</span>
                    </p>
                </div>

                <div>
                    <p className="text-[#888890]">
                        <span className="text-[#666670]">Телефон на посылке:</span>{' '}
                        <span className="text-[#EDE8E0] font-mono">{details.phone}</span>
                    </p>
                </div>

                <div className="pt-2 mt-3 border-t border-[#D97706]/10">
                    <p className="text-[#D97706]/80 text-xs leading-relaxed">⚠️ {details.note}</p>
                </div>
            </div>
        </div>
    );
}