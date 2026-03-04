import Head from 'next/head';
import { useState, useEffect } from 'react';
import { weddingChecklist, getAllChecklistItems, getTotalTaskCount } from '@/data/checklist';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWedding } from '@/context/WeddingContext';
import CountdownTimer from '@/components/CountdownTimer';
import WeddingDateModal from '@/components/WeddingDateModal';
import { CheckCircle, Circle, Calendar, ChevronDown, ChevronUp, Download, Share2, Sparkles, Clock } from 'lucide-react';

export default function Checklist() {
  const { weddingDate, setWeddingDate, getDaysUntilWedding } = useWedding();
  const [completedTasks, setCompletedTasks] = useState({});
  const [expandedPeriods, setExpandedPeriods] = useState(['12-months', '9-months']);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('checklist_completed');
      const savedNotes = localStorage.getItem('checklist_notes');
      if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));
      if (savedNotes) setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('checklist_completed', JSON.stringify(completedTasks)); }, [completedTasks]);
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('checklist_notes', JSON.stringify(notes)); }, [notes]);

  const toggleTask = (taskId) => setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  const togglePeriod = (period) => setExpandedPeriods(prev => prev.includes(period) ? prev.filter(p => p !== period) : [...prev, period]);

  const totalTasks = getTotalTaskCount();
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / totalTasks) * 100);
  const daysLeft = getDaysUntilWedding();

  const getCompletedInPeriod = (period) => {
    const periodTasks = weddingChecklist[period]?.tasks || [];
    return periodTasks.filter(task => completedTasks[task.id]).length;
  };

  const exportChecklist = () => {
    const data = getAllChecklistItems().map(period => ({
      period: period.title,
      tasks: period.tasks.map(task => ({ task: task.task, completed: completedTasks[task.id] || false, note: notes[task.id] || '' }))
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'shaadi-checklist.json'; a.click();
  };

  return (
    <>
      <Head>
        <title>Wedding Checklist ✅ | Wedify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)' }}>
        <div className="absolute inset-0 texture-paisley opacity-[0.04]"></div>
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-[120px] translate-x-1/2 -translate-y-1/2"></div></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 backdrop-blur-sm rounded-full text-emerald-300 text-xs tracking-widest uppercase mb-6 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Your Wedding Planner
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Wedding <span className="text-gradient-emerald">Checklist</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto font-light">Stay organized and plan your dream wedding worry-free</p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-6 bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary-600 font-medium text-sm">📊 Planning Progress</span>
                <span className="text-accent-600 font-bold">{progressPercentage}%</span>
              </div>
              <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-700" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="text-xs text-primary-400 mt-1">{completedCount} / {totalTasks} tasks completed ✅</p>
            </div>
            <div className="flex items-center gap-4">
              {weddingDate ? (
                <div className="flex items-center gap-4 bg-neutral-100 px-6 py-3 rounded-xl border border-accent-200">
                  <Calendar className="w-5 h-5 text-accent-600" />
                  <div>
                    <p className="text-xs text-primary-400">Your Wedding 💒</p>
                    <p className="font-semibold text-primary-700 text-sm">{new Date(weddingDate).toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    {daysLeft && daysLeft > 0 && <p className="text-xs text-accent-600">🎉 {daysLeft} days left!</p>}
                  </div>
                  <button onClick={() => setIsDateModalOpen(true)} className="text-xs text-accent-600 hover:underline">Change</button>
                </div>
              ) : (
                <button onClick={() => setIsDateModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-primary-900 font-bold rounded-xl shadow-lg">
                  <Calendar className="w-5 h-5" /> 📅 Set Wedding Date
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      {weddingDate && daysLeft && daysLeft > 0 && (
        <section className="py-6 bg-neutral-50 border-b"><div className="max-w-7xl mx-auto px-4"><CountdownTimer targetDate={weddingDate} /></div></section>
      )}

      {/* Action Buttons */}
      <section className="py-3 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex justify-end gap-3">
          <button onClick={exportChecklist} className="flex items-center gap-2 px-4 py-2 text-primary-500 hover:text-primary-700 hover:bg-neutral-100 rounded-lg transition-colors text-sm"><Download className="w-4 h-4" /> 📥 Export</button>
          <button className="flex items-center gap-2 px-4 py-2 text-primary-500 hover:text-primary-700 hover:bg-neutral-100 rounded-lg transition-colors text-sm"><Share2 className="w-4 h-4" /> 📤 Share</button>
        </div>
      </section>

      {/* Checklist Content */}
      <section className="py-12 bg-neutral-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {Object.entries(weddingChecklist).map(([period, data]) => {
            const isExpanded = expandedPeriods.includes(period);
            const completedInPeriod = getCompletedInPeriod(period);
            const totalInPeriod = data.tasks.length;
            return (
              <div key={period} className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-[0_8px_30px_rgba(107,15,24,0.08)] transition-shadow duration-500">
                <button onClick={() => togglePeriod(period)} className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${completedInPeriod === totalInPeriod ? 'bg-emerald-100 text-emerald-600' : 'bg-accent-500/10 text-accent-600'}`}>
                      {data.icon}
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-primary-800 text-lg">{data.title}</h3>
                      <p className="text-sm text-primary-400">{completedInPeriod}/{totalInPeriod} completed ✅</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-500" style={{ width: `${totalInPeriod > 0 ? (completedInPeriod / totalInPeriod) * 100 : 0}%` }}></div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-primary-400" /> : <ChevronDown className="w-5 h-5 text-primary-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-neutral-200 divide-y divide-neutral-200">
                    {data.tasks.map((task) => (
                      <div key={task.id} className={`flex items-start gap-4 p-5 transition-colors ${completedTasks[task.id] ? 'bg-emerald-50/50' : 'hover:bg-neutral-50'}`}>
                        <button onClick={() => toggleTask(task.id)} className="mt-0.5 flex-shrink-0">
                          {completedTasks[task.id] 
                            ? <CheckCircle className="w-6 h-6 text-emerald-500" />
                            : <Circle className="w-6 h-6 text-primary-300 hover:text-accent-500 transition-colors" />
                          }
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedTasks[task.id] ? 'line-through text-primary-400' : 'text-primary-700'}`}>{task.task}</p>
                          {task.details && <p className="text-sm text-primary-400 mt-1">{task.details}</p>}
                          {task.priority && (
                            <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                              task.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                              task.priority === 'medium' ? 'bg-haldi-100 text-haldi-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {task.priority} priority
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {isDateModalOpen && <WeddingDateModal onClose={() => setIsDateModalOpen(false)} />}
      <Footer />
    </>
  );
}
