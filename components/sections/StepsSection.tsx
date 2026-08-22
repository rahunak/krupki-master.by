'use client';

import { useState, useCallback } from 'react';
import { AddressBlock } from '../cards/AddressBlock';
import { StepCard } from '../cards/StepCard';
import { STEPS } from '@/data/steps';

export function StepsSection() {
    const [expandedStep, setExpandedStep] = useState<string | null>(null);

    const handleToggle = useCallback((num: string) => {
        setExpandedStep((prev) => (prev === num ? null : num));
    }, []);

    return (
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0C0C0E]">
            {STEPS.map((step, i) => (
                <div key={step.num} className="relative">
                    <StepCard
                        step={step}
                        index={i}
                        isExpanded={expandedStep === step.num}
                        onToggle={() => handleToggle(step.num)}
                        showConnector={i < STEPS.length - 1}
                    />

                    {step.isExpandable && expandedStep === step.num && step.details && (
                        <AddressBlock details={step.details} />
                    )}
                </div>
            ))}
        </section>
    );
}