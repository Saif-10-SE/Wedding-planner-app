import { deleteInquiry, updateInquiry } from '@/lib/inquiryStore';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid inquiry id.' });
  }

  if (req.method === 'PATCH') {
    const { status } = req.body || {};
    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    const updated = await updateInquiry(id, { status });
    if (!updated) return res.status(404).json({ error: 'Inquiry not found.' });
    return res.status(200).json({ inquiry: updated });
  }

  if (req.method === 'DELETE') {
    const deleted = await deleteInquiry(id);
    if (!deleted) return res.status(404).json({ error: 'Inquiry not found.' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
