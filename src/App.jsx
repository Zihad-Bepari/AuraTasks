import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { 
  CheckCircle2, 
  Target, 
  LayoutDashboard, 
  Zap, 
  Bell, 
  Moon, 
  Sun, 
  X, 
  Check,
  Activity,
  AlertCircle
} from 'lucide-react';
import { NavItem } from './components/SubComponents';

// Lazy-loaded views
const DashboardView = lazy(() => import('./components/DashboardView'));
const TasksView = lazy(() => import('./components/TasksView'));
const GoalsView = lazy(() => import('./components/GoalsView'));
const HabitsView = lazy(() => import('./components/HabitsView'));

export default function App() {
  // --- State ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('aura_dark') === 'true');
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('aura_tasks')) || []);
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem('aura_goals')) || []);
  const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem('aura_habits')) || []);
  const [notifications, setNotifications] = useState([]);
  const [showNotifModal, setShowNotifModal] = useState(false);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('aura_tasks', JSON.stringify(tasks));
    localStorage.setItem('aura_goals', JSON.stringify(goals));
    localStorage.setItem('aura_habits', JSON.stringify(habits));
    localStorage.setItem('aura_dark', isDarkMode);
  }, [tasks, goals, habits, isDarkMode]);

  // --- Notifications ---
  const addNotification = (text, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      text,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 20));
  };

  // --- Task handlers ---
  const addTask = (title) => {
    if (!title.trim()) return;
    setTasks([{ id: Date.now(), title, completed: false, createdAt: new Date() }, ...tasks]);
    addNotification(`Task "${title}" added`);
  };
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const task = tasks.find(t => t.id === id);
    if (task && !task.completed) addNotification(`Completed: ${task.title}`, "success");
  };
  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    addNotification(`Deleted task: ${task?.title}`);
  };

  // --- Goal handlers ---
  const addGoal = (data) => {
    setGoals([{ ...data, id: Date.now(), progress: 0, status: 'active' }, ...goals]);
    addNotification(`New target: ${data.title}`);
  };
  const updateGoalProgress = (id, progress) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, progress } : g));
  };
  const completeGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, status: 'completed', progress: 100 } : g));
    const goal = goals.find(g => g.id === id);
    addNotification(`Goal Achieved: ${goal?.title}!`, "success");
  };

  // --- Habit handlers ---
  const completeHabit = (id) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, streak: h.streak + 1, lastCompleted: new Date().toISOString() } : h));
    const habit = habits.find(h => h.id === id);
    addNotification(`Habit streak updated: ${habit?.title}`, "success");
  };

  // --- Stats ---
  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t => t.completed).length;
    const activeGoals = goals.filter(g => g.status !== 'completed');
    const avgGoalProgress = activeGoals.length ? activeGoals.reduce((acc, g) => acc + g.progress, 0) / activeGoals.length : 0;
    const totalStreaks = habits.reduce((acc, h) => acc + h.streak, 0);
    
    const taskChartData = [
      { name: 'Mon', completed: 2 },
      { name: 'Tue', completed: 5 },
      { name: 'Wed', completed: 3 },
      { name: 'Thu', completed: 7 },
      { name: 'Fri', completed: 4 },
      { name: 'Sat', completed: 8 },
      { name: 'Sun', completed: completedTasks },
    ];

    return { completedTasks, pendingTasks: tasks.length - completedTasks, avgGoalProgress, totalStreaks, taskChartData };
  }, [tasks, goals, habits]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sidebar */}
      <nav className={`fixed bottom-0 w-full md:left-0 md:top-0 md:h-screen md:w-20 lg:w-64 border-t md:border-t-0 md:border-r z-50 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex md:flex-col h-full items-center md:items-stretch py-4 px-2 md:px-4">
          <div className="hidden lg:flex items-center gap-3 mb-10 px-2 mt-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Aura</h1>
          </div>

          <div className="flex md:flex-col flex-1 justify-around md:justify-start gap-2 w-full">
            <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={20}/>} label="Dashboard" isDarkMode={isDarkMode} />
            <NavItem active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} icon={<CheckCircle2 size={20}/>} label="Daily Tasks" isDarkMode={isDarkMode} />
            <NavItem active={activeTab === 'goals'} onClick={() => setActiveTab('goals')} icon={<Target size={20}/>} label="Targets" isDarkMode={isDarkMode} />
            <NavItem active={activeTab === 'habits'} onClick={() => setActiveTab('habits')} icon={<Zap size={20}/>} label="Practices" isDarkMode={isDarkMode} />
          </div>

          <div className="hidden md:flex flex-col gap-4 mt-auto mb-6">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span className="hidden lg:inline text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Area */}
      <main className="md:pl-20 lg:pl-64 pb-24 md:pb-8">
        <header className="flex items-center justify-between p-6 md:p-10 sticky top-0 bg-inherit/80 backdrop-blur-md z-40">
          <div>
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500 text-sm'}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div onClick={() => setShowNotifModal(true)} className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
              <Bell className={isDarkMode ? 'text-slate-400' : 'text-slate-500'} size={20} />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center font-bold rounded-full border-2 border-inherit">{unreadCount}</span>}
            </div>
          </div>
        </header>

        <div className="px-6 md:px-10 max-w-6xl mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            {activeTab === 'dashboard' && <DashboardView stats={stats} isDarkMode={isDarkMode} habits={habits} goals={goals} />}
            {activeTab === 'tasks' && <TasksView tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onAdd={addTask} isDarkMode={isDarkMode} />}
            {activeTab === 'goals' && <GoalsView goals={goals} onAdd={addGoal} onUpdate={updateGoalProgress} onComplete={completeGoal} isDarkMode={isDarkMode} />}
            {activeTab === 'habits' && <HabitsView habits={habits} onComplete={completeHabit} onAdd={(h) => setHabits([h, ...habits])} onDelete={(id) => setHabits(habits.filter(h => h.id !== id))} isDarkMode={isDarkMode} />}
          </Suspense>
        </div>
      </main>

      {/* Notification Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'}`}>
            <div className="p-6 border-b flex justify-between items-center border-inherit">
              <h3 className="text-xl font-bold">Notifications</h3>
              <button onClick={() => {
                  setShowNotifModal(false);
                  setNotifications(notifications.map(n => ({...n, read: true})));
              }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><X size={20}/></button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {notifications.length === 0 
                ? <div className="py-12 text-center text-slate-500 italic">No recent activity.</div>
                : notifications.map(n => (
                  <div key={n.id} className={`p-4 rounded-2xl flex gap-4 items-start transition-colors ${!n.read ? (isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50') : ''}`}>
                    <div className={`mt-1 p-2 rounded-xl ${n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                      {n.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-relaxed">{n.text}</p>
                      <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 block">{n.time}</span>
                    </div>
                  </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-center">
              <button onClick={() => setNotifications([])} className="text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors uppercase tracking-widest">Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
