import { useState, useRef, useEffect } from 'react';

export default function CustomSelect({ value, onChange, options, placeholder, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trouver le label de l'option sélectionnée
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Bouton du select */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 bg-white border border-gray-500/30 text-gray-800/90 rounded-md font-medium text-sm focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all cursor-pointer hover:border-gray-500/50 flex items-center justify-between"
      >
        <span className={value === 'all' ? 'text-gray-600' : 'text-gray-800/90'}>
          {displayText}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-500/30 text-gray-800/80 rounded-md font-medium shadow-lg max-h-60 overflow-y-auto">
          <ul className="flex flex-col py-1">
            {options.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center justify-between gap-3 cursor-pointer px-3 py-2 transition ${
                  value === option.value 
                    ? 'bg-green-500/10 text-green-700' 
                    : 'hover:bg-gray-500/10'
                }`}
              >
                <span className="text-sm">{option.label}</span>
                {value === option.value && (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
