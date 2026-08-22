import { Step } from '@/interfaces/StepDetails';
import React from 'react';

interface StepCardProps {
  step: Step;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  showConnector: boolean;
}

export const StepCard = React.memo(function StepCard({
  step,
  index,
  isExpanded,
  onToggle,
  showConnector,
}: StepCardProps) {
  return (
    <article
      className={`relative bg-[#0C0C0E] p-8 md:p-9 hover:bg-[#0F0F11] transition-colors duration-300 group ${step.isExpandable ? 'cursor-pointer' : ''
        }`}
      onClick={step.isExpandable ? onToggle : undefined}
    >
      {/* Step number */}
      <div className="flex items-center gap-3 mb-7">
        <span className="font-mono font-bold text-[#D97706] text-xs tracking-widest">
          {step.num}
        </span>
        {showConnector && (
          <span className="hidden md:block absolute right-0 top-[52px] w-px h-4 bg-[#D97706]/20" />
        )}
      </div>

      <h3 className="text-[#EDE8E0] font-semibold text-[15px] leading-snug mb-3 group-hover:text-white transition-colors duration-200">
        {step.title}
      </h3>

      <p className="text-[#555560] text-sm leading-relaxed">{step.desc}</p>

      {step.isExpandable && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[#D97706] text-xs font-medium">
            {isExpanded ? 'Скрыть адрес' : 'Показать адрес'}
          </span>
          <svg
            className={`w-3 h-3 text-[#D97706] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </article>
  );
});