import { marquees } from '@/data/marquees';

const DEFAULT_OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

const extractBudget = (text) => {
  const match = text?.match(/(\d[\d,]*)/);
  if (!match) return null;
  return Number(match[1].replace(/,/g, ''));
};

const extractGuests = (text) => {
  const match = text?.match(/(\d{2,4})\s*(guests?|people|persons?)/i);
  if (!match) return null;
  return Number(match[1]);
};

const extractArea = (text) => {
  const areas = ['dha', 'gulberg', 'cantt', 'mall road', 'walton', 'canal road'];
  return areas.find((area) => text?.toLowerCase().includes(area)) || null;
};

const hasVenueIntent = (text) => {
  return /\b(recommend|suggest|venue|marquee|hall|halls|budget|per head|guest|guests|price|pricing|shortlist)\b/i.test(text || '');
};

const hasDecorIntent = (text) => {
  return /\b(decor|theme|stage|floral|flowers|lighting|setup|design|look|style|mehndi decor|walima decor|barat decor)\b/i.test(text || '');
};

const estimateTotalCost = (venue, guests = 600) => {
  const perHead = venue.pricing?.perHead?.min || 0;
  const hall = venue.pricing?.hallRental || 0;
  const decor = venue.decorPackages?.[0]?.price || 0;
  return perHead * guests + hall + decor;
};

const recommendVenues = ({ message, memory, planningInputs }) => {
  if (!hasVenueIntent(message)) return [];

  const messageBudget = extractBudget(message);
  const messageGuests = extractGuests(message);
  const area = extractArea(message) || memory?.area || null;

  const budget = messageBudget || memory?.budget || planningInputs?.budget || null;
  const guests = messageGuests || memory?.guests || planningInputs?.guests || null;

  if (!budget || !guests) return [];

  let candidates = marquees
    .map((venue) => ({
      slug: venue.slug,
      name: venue.name,
      location: venue.location,
      area: venue.area,
      rating: venue.rating,
      estimatedCost: estimateTotalCost(venue, guests),
    }))
    .filter((venue) => venue.estimatedCost <= budget * 1.12);

  if (area) {
    candidates = candidates.filter((venue) =>
      `${venue.area} ${venue.location}`.toLowerCase().includes(area)
    );
  }

  return candidates
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return a.estimatedCost - b.estimatedCost;
    })
    .slice(0, 3);
};

const buildSystemPrompt = ({ planningInputs, memory, recommendations }) => {
  const compactRecommendations = recommendations.map((item) => ({
    name: item.name,
    location: item.location,
    rating: item.rating,
    estimatedCost: item.estimatedCost,
  }));

  return [
    'You are Wedify AI Assistant for wedding planning in Lahore.',
    'Tone: professional, warm, concise, premium SaaS.',
    'Behavior rules:',
    '- For greetings/small-talk, respond naturally and do not force budget recommendations.',
    '- Ask follow-up questions only when needed.',
    '- If venue recommendation intent exists and budget/guest data is missing, ask specifically for missing fields.',
    '- If recommendations are provided in context, reference them naturally and briefly.',
    '- If decor intent exists, provide practical decor guidance in actionable bullets/sentences.',
    '- Keep responses usually 2-5 short sentences unless user asks detailed plan.',
    '- Avoid hallucinating venue names not in provided recommendations list when you explicitly suggest options.',
    '',
    `Planning inputs: ${JSON.stringify(planningInputs || {})}`,
    `Conversation memory: ${JSON.stringify(memory || {})}`,
    `Current recommendations: ${JSON.stringify(compactRecommendations)}`,
  ].join('\n');
};

const toOpenAIMessages = (conversation, systemPrompt) => {
  const cleanedConversation = (conversation || [])
    .filter((message) => ['user', 'assistant'].includes(message?.role) && typeof message?.text === 'string')
    .slice(-12)
    .map((message) => ({ role: message.role, content: message.text }));

  return [{ role: 'system', content: systemPrompt }, ...cleanedConversation];
};

const generateWithOpenAI = async ({ messages }) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured.');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_OPENAI_MODEL,
      temperature: 0.65,
      max_tokens: 350,
      messages,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    const detail = payload?.error?.message || 'OpenAI request failed.';
    throw new Error(detail);
  }

  return payload?.choices?.[0]?.message?.content?.trim() || '';
};

const generateWithGemini = async ({ conversation, systemPrompt }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured.');

  const contents = (conversation || [])
    .filter((message) => ['user', 'assistant'].includes(message?.role) && typeof message?.text === 'string')
    .slice(-12)
    .map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.text }],
    }));

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 350,
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    const detail = payload?.error?.message || 'Gemini request failed.';
    throw new Error(detail);
  }

  return payload?.candidates?.[0]?.content?.parts?.map((part) => part?.text || '').join('\n').trim() || '';
};

const resolveProvider = () => {
  if (process.env.LLM_PROVIDER === 'gemini') return 'gemini';
  if (process.env.LLM_PROVIDER === 'openai') return 'openai';
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.GEMINI_API_KEY) return 'gemini';
  return null;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      message,
      conversation = [],
      planningInputs = {},
      memory = {},
      decorPrompt,
    } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const provider = resolveProvider();
    if (!provider) {
      return res.status(503).json({
        error: 'LLM provider is not configured. Add OPENAI_API_KEY or GEMINI_API_KEY in your server environment.',
      });
    }

    const memoryPatch = {
      budget: extractBudget(message) ?? memory?.budget ?? null,
      guests: extractGuests(message) ?? memory?.guests ?? null,
      area: extractArea(message) ?? memory?.area ?? null,
      eventType: memory?.eventType ?? null,
      themeHint: memory?.themeHint ?? null,
    };

    const recommendations = recommendVenues({
      message,
      memory: memoryPatch,
      planningInputs,
    });

    const systemPrompt = buildSystemPrompt({
      planningInputs,
      memory: memoryPatch,
      recommendations,
    });

    const reply = provider === 'openai'
      ? await generateWithOpenAI({ messages: toOpenAIMessages(conversation, systemPrompt) })
      : await generateWithGemini({ conversation, systemPrompt });

    const isDecorMessage = hasDecorIntent(message);
    const decorPromptPatch = isDecorMessage ? message : decorPrompt;

    return res.status(200).json({
      reply: reply || 'I am here to help with your wedding planning. Tell me what you want to plan next.',
      recommendations,
      memory: memoryPatch,
      decorPrompt: decorPromptPatch,
      provider,
    });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || 'Unexpected assistant error.',
    });
  }
}
