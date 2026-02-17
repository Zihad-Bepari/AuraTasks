import React from 'react';
import { CheckCircle2, Clock, Target, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from './SubComponents';

export default function DashboardView({ stats, isDarkMode, habits, goals }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Done Today" value={stats.completedTasks} icon={<CheckCircle2 className="text-emerald-500" size={18} />} isDarkMode={isDarkMode} />
        <StatCard label="Pending" value={stats.pendingTasks} icon={<Clock className="text-amber-500" size={18} />} isDarkMode={isDarkMode} />
        <StatCard label="Goal Avg" value={`${Math.round(stats.avgGoalProgress)}%`} icon={<Target className="text-blue-500" size={18} />} isDarkMode={isDarkMode} />
        <StatCard label="Streaks" value={stats.totalStreaks} icon={<TrendingUp className="text-purple-500" size={18} />} isDarkMode={isDarkMode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="text-lg font-bold mb-6">Activity Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.taskChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#0f172a' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="completed" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="text-lg font-bold mb-4">Focus Goals</h3>
          <div className="space-y-4">
            {goals.filter(g => g.status !== 'completed').slice(0, 4).map(goal => (
              <div key={goal.id}>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span>{goal.title}</span>
                  <span className="text-blue-500">{goal.progress}%</span>
                </div>
                <div className={`h-1.5 w-full rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${goal.progress}%` }} />
                </div>
              </div>
            ))}
            {goals.filter(g => g.status !== 'completed').length === 0 && <p className="text-sm text-slate-500 italic">No active targets.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}