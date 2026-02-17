import React from 'react';

export default function NavItem({ active, onClick, icon, label, isDarkMode }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
        active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
        {icon}
      </div>
      <span className="hidden lg:inline text-sm font-semibold">{label}</span>
    </button>
  );
}