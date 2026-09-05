import React from 'react';

interface SelectionCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({ title, description, selected, onClick, icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-4 rounded-xl border-2 transition-all w-full flex flex-col focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${selected 
          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
        }
      `}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className={`${selected ? 'text-blue-600' : 'text-slate-500'}`}>{icon}</div>}
        <h4 className={`font-bold ${selected ? 'text-blue-900' : 'text-slate-800'}`}>{title}</h4>
      </div>
      {description && <p className={`text-sm ${selected ? 'text-blue-700' : 'text-slate-500'}`}>{description}</p>}
    </button>
  );
};
