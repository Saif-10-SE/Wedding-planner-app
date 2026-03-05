import Head from 'next/head';
import { useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Clock3, Mail, Phone, Trash2, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWedding } from '@/context/WeddingContext';

const statusConfig = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  in_progress: { label: 'In Progress', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  entertained: { label: 'Entertained', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
};

const formatDate = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleString('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function DashboardPage() {
  const { submittedInquiries, updateInquiryStatus, removeSubmittedInquiry, showNotification } = useWedding();
  const [statusFilter, setStatusFilter] = useState('all');

  const uniqueInquiries = useMemo(() => {
    const seen = new Set();
    return submittedInquiries.filter((item) => {
      const key = [
        item.email?.toLowerCase?.() || '',
        item.phone || '',
        item.eventDate || '',
        item.venueSlug || '',
        item.eventType || '',
      ].join('|');

      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [submittedInquiries]);

  const filteredInquiries = useMemo(() => {
    if (statusFilter === 'all') return uniqueInquiries;
    return uniqueInquiries.filter(item => item.status === statusFilter);
  }, [uniqueInquiries, statusFilter]);

  const counts = useMemo(() => ({
    total: uniqueInquiries.length,
    new: uniqueInquiries.filter(i => i.status === 'new').length,
    inProgress: uniqueInquiries.filter(i => i.status === 'in_progress').length,
    entertained: uniqueInquiries.filter(i => i.status === 'entertained').length,
  }), [uniqueInquiries]);

  const handleStatusUpdate = async (id, status, successMessage) => {
    try {
      await updateInquiryStatus(id, status);
      showNotification(successMessage);
    } catch (error) {
      showNotification(error?.message || 'Unable to update inquiry.', 'error');
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeSubmittedInquiry(id);
      showNotification('Inquiry removed');
    } catch (error) {
      showNotification(error?.message || 'Unable to remove inquiry.', 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Inquiry Dashboard - Wedify</title>
        <meta name="description" content="Manage and entertain incoming wedding inquiries" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-cream-100 to-white pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-medium mb-3">
              <Clock3 className="w-3.5 h-3.5" /> Inquiry Operations
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary-900">Inquiry Dashboard</h1>
            <p className="text-primary-500 mt-3">Every inquiry from event forms is stored here so your team can entertain and track it quickly.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-4">
              <p className="text-xs text-primary-500">Total</p>
              <p className="text-2xl font-semibold text-primary-900 mt-1">{counts.total}</p>
            </div>
            <div className="bg-white rounded-2xl border border-blue-200 p-4">
              <p className="text-xs text-blue-600">New</p>
              <p className="text-2xl font-semibold text-blue-700 mt-1">{counts.new}</p>
            </div>
            <div className="bg-white rounded-2xl border border-amber-200 p-4">
              <p className="text-xs text-amber-600">In Progress</p>
              <p className="text-2xl font-semibold text-amber-700 mt-1">{counts.inProgress}</p>
            </div>
            <div className="bg-white rounded-2xl border border-emerald-200 p-4">
              <p className="text-xs text-emerald-600">Entertained</p>
              <p className="text-2xl font-semibold text-emerald-700 mt-1">{counts.entertained}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-6 flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'new', label: 'New' },
              { id: 'in_progress', label: 'In Progress' },
              { id: 'entertained', label: 'Entertained' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setStatusFilter(option.id)}
                className={`px-3 py-1.5 rounded-full text-xs border ${statusFilter === option.id ? 'bg-primary-900 text-white border-primary-900' : 'bg-white text-primary-600 border-neutral-300 hover:border-primary-500'}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-10 text-center text-primary-500">
              <p className="text-lg font-serif text-primary-800 mb-2">No inquiries yet</p>
              <p>When users submit inquiry forms, records will appear here automatically.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInquiries.map((inquiry) => {
                const status = statusConfig[inquiry.status] || statusConfig.new;
                return (
                  <article key={inquiry.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-primary-500">{formatDate(inquiry.createdAt)}</p>
                        <h2 className="text-xl font-serif text-primary-900 mt-1">{inquiry.name || 'Unknown'} - {inquiry.eventType || 'Event'}</h2>
                        <p className="text-sm text-primary-500 mt-1">Venue: <span className="font-medium text-primary-700">{inquiry.venueName || '-'}</span></p>
                      </div>
                      <span className={`text-xs px-3 py-1.5 rounded-full border ${status.className}`}>{status.label}</span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-sm">
                      <div className="p-3 rounded-xl bg-cream-50 border border-neutral-200">
                        <p className="text-xs text-primary-500 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</p>
                        <p className="text-primary-800 mt-1 break-all">{inquiry.email || '-'}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-cream-50 border border-neutral-200">
                        <p className="text-xs text-primary-500 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</p>
                        <p className="text-primary-800 mt-1">{inquiry.phone || '-'}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-cream-50 border border-neutral-200">
                        <p className="text-xs text-primary-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Event Date</p>
                        <p className="text-primary-800 mt-1">{inquiry.eventDate || '-'}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-cream-50 border border-neutral-200">
                        <p className="text-xs text-primary-500 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Guests</p>
                        <p className="text-primary-800 mt-1">{inquiry.guestCount || '-'}</p>
                      </div>
                    </div>

                    {inquiry.message && (
                      <div className="mt-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
                        <p className="text-xs text-primary-500 mb-1">Additional Details</p>
                        <p className="text-sm text-primary-700">{inquiry.message}</p>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStatusUpdate(inquiry.id, 'in_progress', 'Inquiry moved to In Progress')}
                        className="px-3 py-2 text-xs rounded-lg border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
                      >
                        Mark In Progress
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(inquiry.id, 'entertained', 'Inquiry marked as Entertained ✅')}
                        className="px-3 py-2 text-xs rounded-lg border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 inline-flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Entertained
                      </button>
                      <button
                        onClick={() => handleRemove(inquiry.id)}
                        className="px-3 py-2 text-xs rounded-lg border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
