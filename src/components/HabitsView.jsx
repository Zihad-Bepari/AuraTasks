import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function HabitsView({ habits, onComplete, onAdd, onDelete, isDarkMode }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', frequency: 1 });

  const handleSubmit = () => {
    if (!formData.title) return;
    onAdd({ ...formData, id: Date.now(), streak: 0, lastCompleted: null, startDate: new Date().toISOString() });
    setShowForm(false);
    setFormData({ title: '', frequency: 1 });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Practices</h3>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
          <Plus size={18} /> New Habit
        </button>
      </div>
      {showForm && (
        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-wrap gap-4">
            <input placeholder="Habit Name" className="flex-1 min-w-[200px] p-3 rounded-xl border outline-none" onChange={(e) => setFormData({...formData, title: e.target.value})} />
            <input type="number" defaultValue={1} className="w-20 p-3 rounded-xl border outline-none" onChange={(e) => setFormData({...formData, frequency: parseInt(e.target.value) || 1})} />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold">Start Habit</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 text-slate-500">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {habits.map(habit => {
          const next = new Date(habit.lastCompleted || habit.startDate);
          next.setDate(next.getDate() + habit.frequency);
          const isDue = next <= new Date();
          return (
            <div key={habit.id} className={`p-5 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold">{habit.title}</h4>
                  <p className="text-[10px] uppercase text-slate-500 font-bold">Every {habit.frequency} days</p>
                </div>
                <div className="text-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-xl">
                  <div className="text-lg font-black text-blue-500">{habit.streak}</div>
                  <div className="text-[8px] font-bold uppercase text-blue-400">Streak</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onComplete(habit.id)} 
                  disabled={!isDue && habit.lastCompleted}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${isDue || !habit.lastCompleted ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  {isDue || !habit.lastCompleted ? 'Complete Today' : 'Wait...'}
                </button>
                <button onClick={() => onDelete(habit.id)} className="p-2.5 rounded-xl border hover:text-rose-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}