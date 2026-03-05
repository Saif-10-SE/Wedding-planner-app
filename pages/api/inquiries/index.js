import { createInquiry, getInquiries } from '@/lib/inquiryStore';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const inquiries = await getInquiries();
    return res.status(200).json({ inquiries });
  }

  if (req.method === 'POST') {
    const payload = req.body || {};

    if (!payload.name || !payload.email || !payload.phone || !payload.eventDate || !payload.guestCount) {
      return res.status(400).json({ error: 'Missing required fields for inquiry submission.' });
    }

    const { inquiry, deduplicated } = await createInquiry(payload);
    return res.status(201).json({ inquiry, deduplicated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
