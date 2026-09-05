import React from 'react';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
  labels: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalSteps, currentStep, labels }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-300"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${i <= currentStep ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}></div>
            <span className={`absolute top-6 text-xs font-medium whitespace-nowrap ${i <= currentStep ? 'text-slate-900' : 'text-slate-400'}`}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
