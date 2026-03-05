import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_PATH = path.join(DATA_DIR, 'inquiries.json');

const emptyDb = () => ({ inquiries: [] });

async function ensureDbFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(emptyDb(), null, 2), 'utf-8');
  }
}

async function readDb() {
  await ensureDbFile();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.inquiries)) return emptyDb();
    return parsed;
  } catch {
    return emptyDb();
  }
}

async function writeDb(db) {
  await ensureDbFile();
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

function inquiryIdentity(payload) {
  return [
    payload?.email?.trim().toLowerCase() || '',
    payload?.phone?.trim() || '',
    payload?.eventDate || '',
    payload?.venueSlug || '',
    payload?.eventType || '',
  ].join('|');
}

export async function getInquiries() {
  const db = await readDb();
  return [...db.inquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createInquiry(payload) {
  const db = await readDb();
  const now = new Date();
  const nowIso = now.toISOString();

  const incomingIdentity = inquiryIdentity(payload);
  const duplicate = db.inquiries.find((item) => {
    const sameIdentity = inquiryIdentity(item) === incomingIdentity;
    const timeDiff = Math.abs(now.getTime() - new Date(item.createdAt).getTime());
    return sameIdentity && timeDiff <= 10 * 60 * 1000;
  });

  if (duplicate) {
    return { inquiry: duplicate, deduplicated: true };
  }

  const inquiry = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: 'new',
    createdAt: nowIso,
    ...payload,
  };

  db.inquiries.unshift(inquiry);
  await writeDb(db);
  return { inquiry, deduplicated: false };
}

export async function updateInquiry(id, updates) {
  const db = await readDb();
  const index = db.inquiries.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updated = {
    ...db.inquiries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  db.inquiries[index] = updated;
  await writeDb(db);
  return updated;
}

export async function deleteInquiry(id) {
  const db = await readDb();
  const before = db.inquiries.length;
  db.inquiries = db.inquiries.filter((item) => item.id !== id);
  const deleted = db.inquiries.length !== before;
  if (deleted) await writeDb(db);
  return deleted;
}
