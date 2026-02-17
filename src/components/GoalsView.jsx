import React, { useState } from 'react';
import { Plus, CheckCircle2, Check } from 'lucide-react';
import { getDaysDiff } from '../utils/helpers';

export default function GoalsView({ goals, onAdd, onUpdate, onComplete, isDarkMode }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '' });

  const activeGoals = goals.filter(g => g.status !== 'completed');
  const completedGoals = goals.filter(g => g.status === 'completed');

  const handleSubmit = () => {
    if (!formData.title || !formData.date) return;
    onAdd(formData);
    setShowForm(false);
    setFormData({ title: '', date: '' });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Targets</h3>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
          <Plus size={18} /> New Goal
        </button>
      </div>

      {showForm && (
        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Goal Title" className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none`} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            <input type="date" className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none`} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold">Save Goal</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 text-slate-500">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeGoals.map(goal => (
          <div key={goal.id} className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg">{goal.title}</h4>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${getDaysDiff(goal.date) < 7 ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                {getDaysDiff(goal.date)}d left
              </span>
            </div>
            <div className={`h-3 w-full rounded-full mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%` }} />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-1.5">
                {[0, 25, 50, 75, 100].map(v => (
                  <button key={v} onClick={() => onUpdate(goal.id, v)} className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border ${goal.progress === v ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>
                    {v}%
                  </button>
                ))}
              </div>
              {goal.progress === 100 && (
                <button onClick={() => onComplete(goal.id)} className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold">
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}