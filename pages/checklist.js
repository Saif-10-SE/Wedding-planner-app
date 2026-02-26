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
        <title>Shaadi Checklist ✅ | Lahore Shaadi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"><div className="absolute top-0 right-0 w-96 h-96 bg-mehndi-500 rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2"></div></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-mehndi-500/10 backdrop-blur-sm rounded-full text-mehndi-400 text-xs tracking-widest uppercase mb-6 border border-mehndi-500/20">
            <Sparkles className="w-3.5 h-3.5" /> 📋 Aapka Shaadi Planner
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Shaadi <span className="bg-gradient-to-r from-mehndi-400 via-gold-400 to-haldi-400 bg-clip-text text-transparent">Checklist</span> ✅
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">Organized rahein aur befikar ho kar apni khwaabon ki shaadi plan karein 🎊</p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-6 bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-maroon-600 font-medium text-sm">📊 Planning Progress</span>
                <span className="text-mehndi-600 font-bold">{progressPercentage}%</span>
              </div>
              <div className="h-3 bg-cream-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-mehndi-500 to-gold-400 rounded-full transition-all duration-700" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="text-xs text-maroon-400 mt-1">{completedCount} / {totalTasks} kaam mukammal ✅</p>
            </div>
            <div className="flex items-center gap-4">
              {weddingDate ? (
                <div className="flex items-center gap-4 bg-cream-100 px-6 py-3 rounded-xl border border-mehndi-200">
                  <Calendar className="w-5 h-5 text-mehndi-600" />
                  <div>
                    <p className="text-xs text-maroon-400">Aapki Shaadi 💒</p>
                    <p className="font-semibold text-maroon-700 text-sm">{new Date(weddingDate).toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    {daysLeft && daysLeft > 0 && <p className="text-xs text-mehndi-600">🎉 {daysLeft} din baaki!</p>}
                  </div>
                  <button onClick={() => setIsDateModalOpen(true)} className="text-xs text-mehndi-600 hover:underline">Badlein</button>
                </div>
              ) : (
                <button onClick={() => setIsDateModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-mehndi-500 to-gold-500 text-maroon-900 font-bold rounded-xl shadow-mehndi">
                  <Calendar className="w-5 h-5" /> 📅 Shaadi Ki Tareekh Lagayein
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      {weddingDate && daysLeft && daysLeft > 0 && (
        <section className="py-6 bg-cream-50 border-b"><div className="max-w-7xl mx-auto px-4"><CountdownTimer targetDate={weddingDate} /></div></section>
      )}

      {/* Action Buttons */}
      <section className="py-3 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex justify-end gap-3">
          <button onClick={exportChecklist} className="flex items-center gap-2 px-4 py-2 text-maroon-500 hover:text-maroon-700 hover:bg-cream-100 rounded-lg transition-colors text-sm"><Download className="w-4 h-4" /> 📥 Export</button>
          <button className="flex items-center gap-2 px-4 py-2 text-maroon-500 hover:text-maroon-700 hover:bg-cream-100 rounded-lg transition-colors text-sm"><Share2 className="w-4 h-4" /> 📤 Share</button>
        </div>
      </section>

      {/* Checklist Content */}
      <section className="py-12 bg-cream-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {Object.entries(weddingChecklist).map(([period, data]) => {
            const isExpanded = expandedPeriods.includes(period);
            const completedInPeriod = getCompletedInPeriod(period);
            const totalInPeriod = data.tasks.length;
            return (
              <div key={period} className="bg-white rounded-2xl shadow-sm border border-maroon-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(80,0,20,0.08)] transition-shadow duration-500">
                <button onClick={() => togglePeriod(period)} className="w-full flex items-center justify-between p-6 text-left hover:bg-cream-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${completedInPeriod === totalInPeriod ? 'bg-emerald-100 text-emerald-600' : 'bg-mehndi-500/10 text-mehndi-600'}`}>
                      {data.icon}
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-maroon-800 text-lg">{data.title}</h3>
                      <p className="text-sm text-maroon-400">{completedInPeriod}/{totalInPeriod} mukammal ✅</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-cream-200 rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-gradient-to-r from-mehndi-500 to-gold-400 rounded-full transition-all duration-500" style={{ width: `${totalInPeriod > 0 ? (completedInPeriod / totalInPeriod) * 100 : 0}%` }}></div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-maroon-400" /> : <ChevronDown className="w-5 h-5 text-maroon-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-maroon-100 divide-y divide-maroon-100">
                    {data.tasks.map((task) => (
                      <div key={task.id} className={`flex items-start gap-4 p-5 transition-colors ${completedTasks[task.id] ? 'bg-emerald-50/50' : 'hover:bg-cream-50'}`}>
                        <button onClick={() => toggleTask(task.id)} className="mt-0.5 flex-shrink-0">
                          {completedTasks[task.id] 
                            ? <CheckCircle className="w-6 h-6 text-emerald-500" />
                            : <Circle className="w-6 h-6 text-maroon-300 hover:text-mehndi-500 transition-colors" />
                          }
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedTasks[task.id] ? 'line-through text-maroon-400' : 'text-maroon-700'}`}>{task.task}</p>
                          {task.details && <p className="text-sm text-maroon-400 mt-1">{task.details}</p>}
                          {task.priority && (
                            <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                              task.priority === 'high' ? 'bg-rani-100 text-rani-700' :
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
