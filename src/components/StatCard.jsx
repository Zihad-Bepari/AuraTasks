import React from 'react';

export default function StatCard({ label, value, icon, isDarkMode }) {
  return (
    <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
        </span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}