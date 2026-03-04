import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Send, Sparkles, Users, RefreshCcw, Image as ImageIcon, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatPriceShort } from '@/data/marquees';

const CHAT_HISTORY_KEY = 'wedify_ai_chat_history_v1';

const quickPrompts = [
  'I have Rs 2,500,000 budget for 700 guests. Suggest best halls.',
  'Suggest decor for a mehndi night with floral + yellow theme.',
  'Need a premium barat venue in DHA around Rs 3,000 per head.',
];

const decorSuggestions = [
  'Royal wedding stage with warm golden lighting, luxury Pakistani marquee decor',
  'Mehndi decor with marigold flowers, colorful drapes, festive dance floor lights',
  'Minimal elegant white and blush wedding reception setup with crystal chandeliers',
];

const getBudgetFromText = (text) => {
  const match = text.match(/(\d[\d,]*)/);
  if (!match) return null;
  return Number(match[1].replace(/,/g, ''));
};

const getGuestCountFromText = (text) => {
  const guestMatch = text.match(/(\d{2,4})\s*(guests?|people|persons?)/i);
  if (!guestMatch) return null;
  return Number(guestMatch[1]);
};

const getAreaFromText = (text) => {
  const areas = ['dha', 'gulberg', 'cantt', 'mall road', 'walton', 'canal road'];
  const found = areas.find(area => text.toLowerCase().includes(area));
  return found || null;
};

const getEventTypeFromText = (text) => {
  const patterns = [
    { key: 'mehndi', regex: /\b(mehndi|mayun)\b/i },
    { key: 'barat', regex: /\b(barat|baraat)\b/i },
    { key: 'valima', regex: /\b(valima|walima)\b/i },
    { key: 'engagement', regex: /\b(engagement|nikah)\b/i },
  ];
  const matched = patterns.find(item => item.regex.test(text));
  return matched?.key || null;
};

const getThemeHintFromText = (text) => {
  const match = text.match(/\b(theme|style|vibe|look)\b[:\s-]*(.{3,80})/i);
  if (match?.[2]) return match[2].trim();
  if (/\b(flora|floral|rustic|minimal|royal|gold|white|pastel|traditional|modern)\b/i.test(text)) {
    return text.trim().slice(0, 80);
  }
  return null;
};

export default function AssistantPage() {
  const [budget, setBudget] = useState(2500000);
  const [guests, setGuests] = useState(600);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('Assistant is analyzing your plan...');
  const [decorPrompt, setDecorPrompt] = useState(decorSuggestions[0]);
  const [conversationMemory, setConversationMemory] = useState({
    budget: null,
    guests: null,
    area: null,
    eventType: null,
    themeHint: null,
  });
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I can recommend marquees based on your budget and guests, and also generate decor inspiration images. Share your plan to begin.',
      meta: null,
    },
  ]);
  const typingIntervalRef = useRef(null);

  const startTypingAnimation = () => {
    setIsTyping(true);
    let phase = 0;
    const stages = [
      'Assistant is understanding your message.',
      'Assistant is preparing a personalized response..',
      'Assistant is preparing a personalized response...',
    ];
    setTypingText(stages[0]);
    typingIntervalRef.current = setInterval(() => {
      phase = (phase + 1) % stages.length;
      setTypingText(stages[phase]);
    }, 550);
  };

  const stopTypingAnimation = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setIsTyping(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(CHAT_HISTORY_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        setMessages(parsed.messages);
      }
      if (parsed.decorPrompt) {
        setDecorPrompt(parsed.decorPrompt);
      }
      if (parsed.memory) {
        setConversationMemory(prev => ({ ...prev, ...parsed.memory }));
      }
    } catch {
      // Ignore invalid cache
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(
      CHAT_HISTORY_KEY,
      JSON.stringify({
        messages,
        memory: conversationMemory,
        decorPrompt,
      })
    );
  }, [messages, conversationMemory, decorPrompt]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const decorImages = useMemo(() => {
    if (!decorPrompt?.trim()) return [];
    const base = encodeURIComponent(`${decorPrompt}, Pakistani wedding marquee, realistic photography, ultra detailed`);
    return [
      `https://image.pollinations.ai/prompt/${base}?seed=11&width=768&height=512`,
      `https://image.pollinations.ai/prompt/${base}?seed=22&width=768&height=512`,
      `https://image.pollinations.ai/prompt/${base}?seed=33&width=768&height=512`,
    ];
  }, [decorPrompt]);

  const submitMessage = async (messageText) => {
    const trimmed = messageText.trim();
    if (!trimmed) return;

    const parsedBudget = getBudgetFromText(trimmed);
    const parsedGuests = getGuestCountFromText(trimmed);
    const parsedArea = getAreaFromText(trimmed);
    const parsedEventType = getEventTypeFromText(trimmed);
    const parsedThemeHint = getThemeHintFromText(trimmed);

    const nextMemory = {
      ...conversationMemory,
      budget: parsedBudget ?? conversationMemory.budget,
      guests: parsedGuests ?? conversationMemory.guests,
      area: parsedArea ?? conversationMemory.area,
      eventType: parsedEventType ?? conversationMemory.eventType,
      themeHint: parsedThemeHint ?? conversationMemory.themeHint,
    };

    setConversationMemory(nextMemory);

    const nextConversation = [
      ...messages.slice(-10).map((m) => ({ role: m.role, text: m.text })),
      { role: 'user', text: trimmed },
    ];

    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    startTypingAnimation();

    try {
      const response = await fetch('/api/assistant-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          conversation: nextConversation,
          planningInputs: {
            budget,
            guests,
          },
          memory: nextMemory,
          decorPrompt,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || 'Assistant service is unavailable right now.');
      }

      if (payload?.memory && typeof payload.memory === 'object') {
        setConversationMemory(prev => ({ ...prev, ...payload.memory }));
      }

      if (payload?.decorPrompt) {
        setDecorPrompt(payload.decorPrompt);
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: payload.reply || 'I am here to help with your wedding planning. Tell me your next preference.',
          meta: Array.isArray(payload.recommendations) && payload.recommendations.length > 0
            ? { type: 'venues', venues: payload.recommendations }
            : null,
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: error?.message || 'Unable to reach the AI service. Please try again in a moment.',
          meta: null,
        },
      ]);
    } finally {
      stopTypingAnimation();
    }
  };

  return (
    <>
      <Head>
        <title>AI Assistant - Wedify</title>
        <meta name="description" content="AI assistant for wedding planning, venue recommendations and decor inspiration" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-cream-100 to-white pt-24 pb-14">
        <section className="max-w-[1240px] mx-auto px-6 lg:px-8">
          <div className="mb-6">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-800 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" /> AI Planning Studio
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary-900">Wedify AI Assistant</h1>
            <p className="text-primary-500 mt-2.5 max-w-2xl leading-relaxed">Share your ideas in chat to get venue suggestions by budget and live decor inspiration images that match your event vibe.</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-12 items-start">
            <div className="xl:col-span-8 bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden h-[680px] flex flex-col relative z-10">
              <div className="px-6 py-4 border-b border-neutral-200 bg-primary-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-accent-300" />
                  <p className="text-sm font-medium">Budget + Venue Assistant</p>
                </div>
                <button
                  onClick={() => {
                    const starter = { role: 'assistant', text: 'Fresh start. Tell me your budget, guest count, and preferred area.', meta: null };
                    setMessages([starter]);
                    setConversationMemory({ budget: null, guests: null, area: null, eventType: null, themeHint: null });
                    setDecorPrompt(decorSuggestions[0]);
                    if (typeof window !== 'undefined') {
                      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify({ messages: [starter], memory: {}, decorPrompt: decorSuggestions[0] }));
                    }
                  }}
                  className="text-xs text-white/80 hover:text-accent-300 inline-flex items-center gap-1"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-white to-cream-50/40">
                {messages.map((message, idx) => (
                  <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === 'user' ? 'bg-primary-900 text-white' : 'bg-white border border-neutral-200 text-primary-700'}`}>
                      <p>{message.text}</p>

                      {message.meta?.type === 'venues' && (
                        <div className="mt-3 space-y-2">
                          {message.meta.venues.map((venue) => (
                            <Link key={venue.slug} href={`/marquees/${venue.slug}`} className="block bg-cream-50 border border-neutral-200 rounded-xl p-3 hover:border-accent-500/40 transition-colors">
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <p className="font-medium text-primary-900">{venue.name}</p>
                                  <p className="text-xs text-primary-500">{venue.location} • Rating {venue.rating}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-primary-500">Estimated total</p>
                                  <p className="text-sm font-semibold text-accent-700">{formatPriceShort(venue.estimatedCost)}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {messages.length <= 1 && !isTyping && (
                  <div className="pt-2">
                    <div className="bg-white/80 border border-dashed border-neutral-300 rounded-2xl p-4">
                      <p className="text-xs font-medium text-primary-500 mb-2">Try these ideas</p>
                      <div className="flex flex-wrap gap-2">
                        {quickPrompts.map((prompt, idx) => (
                          <button
                            key={`hint_${idx}`}
                            onClick={() => submitMessage(prompt)}
                            className="text-xs px-3 py-1.5 rounded-full border border-neutral-300 text-primary-600 hover:border-accent-500 hover:text-accent-700 bg-white"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-3 text-sm text-primary-500">{typingText}</div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-neutral-200 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitMessage(input);
                  }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Share your event idea, budget, guest count, and preferred area..."
                    className="w-full flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                  <button className="w-full sm:w-auto px-4 py-3 rounded-xl bg-primary-950 text-white hover:bg-primary-800 transition-colors inline-flex items-center justify-center gap-2 text-sm font-medium">
                    <Send className="w-4 h-4" /> Send
                  </button>
                </form>
              </div>
            </div>

            <div className="xl:col-span-4 space-y-4 xl:sticky xl:top-24 relative z-10">
              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-5">
                <h2 className="font-serif text-xl text-primary-900 mb-3.5">Planning Inputs</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-primary-500 mb-2 block">Budget (PKR)</label>
                    <input
                      type="number"
                      min={200000}
                      step={50000}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value || 0))}
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-primary-500 flex items-center gap-1.5 mb-2"><Users className="w-3.5 h-3.5" /> Guests</label>
                    <input
                      type="number"
                      min={100}
                      step={50}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value || 0))}
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3.5">
                  <h2 className="font-serif text-xl text-primary-900">AI Decor Preview</h2>
                  <ImageIcon className="w-4 h-4 text-accent-700" />
                </div>
                <textarea
                  value={decorPrompt}
                  onChange={(e) => setDecorPrompt(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm mb-3"
                  placeholder="Describe your decor mood..."
                />
                <div className="grid grid-cols-1 gap-3">
                  {decorImages.map((imageUrl, idx) => (
                    <img key={idx} src={imageUrl} alt={`Decor concept ${idx + 1}`} className="w-full h-28 object-cover rounded-xl border border-neutral-200 bg-neutral-100" loading="lazy" />
                  ))}
                </div>
              </div>

              <Link href="/dashboard" className="block rounded-2xl bg-primary-950 text-white p-4 hover:bg-primary-800 transition-colors">
                <p className="text-xs uppercase tracking-wide text-white/60 mb-1">Operations</p>
                <p className="font-medium">Open Inquiry Dashboard</p>
                <p className="text-xs text-white/70 mt-1">Track and entertain incoming inquiries.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-accent-300 text-sm">Go to Dashboard <ArrowRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
