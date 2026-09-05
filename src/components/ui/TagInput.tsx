import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onChange, placeholder = "Add an item...", suggestions = [] }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(inputValue);
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  const availableSuggestions = suggestions.filter(s => !tags.includes(s) && s.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {tag}
            <button 
              type="button"
              onClick={() => removeTag(index)} 
              className="text-blue-600 hover:text-blue-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`Remove ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => handleAddTag(inputValue)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={!inputValue.trim()}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      {availableSuggestions.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 8).map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddTag(suggestion)}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200 transition-colors border border-slate-200"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
