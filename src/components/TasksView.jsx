import React, { useState } from 'react';
import { Plus, Circle, CheckCircle2, Trash2 } from 'lucide-react';

export default function TasksView({ tasks, onToggle, onDelete, onAdd, isDarkMode }) {
  const [newTitle, setNewTitle] = useState('');
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className={`flex items-center gap-3 p-2 rounded-2xl border focus-within:ring-2 ring-blue-500 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add a new task..." className="flex-1 bg-transparent border-none focus:outline-none px-4 py-2" onKeyDown={(e) => e.key === 'Enter' && (onAdd(newTitle), setNewTitle(''))} />
        <button onClick={() => { onAdd(newTitle); setNewTitle(''); }} className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"><Plus size={20} /></button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all ${task.completed ? (isDarkMode ? 'bg-slate-900/50 border-slate-800 opacity-60' : 'bg-slate-50 border-slate-100 opacity-60') : (isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm')}`}>
            <button onClick={() => onToggle(task.id)} className="text-blue-500 transition-transform active:scale-90">{task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}</button>
            <div className={`flex-1 text-sm font-medium ${task.completed ? 'line-through text-slate-500' : ''}`}>{task.title}</div>
            <button onClick={() => onDelete(task.id)} className="p-2 text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"><Trash2 size={18} /></button>
          </div>
        ))}
        {tasks.length === 0 && <div className="text-center py-20 opacity-30 text-lg">No tasks for today. Start fresh!</div>}
      </div>
    </div>
  );
}