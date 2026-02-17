import React from 'react';

export function NavItem({ active, onClick, icon, label, isDarkMode }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}>
      <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</div>
      <span className="hidden lg:inline text-sm font-semibold">{label}</span>
    </button>
  );
}

export function StatCard({ label, value, icon, isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}