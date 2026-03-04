import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const logoOptions = [
  { id: '01', title: 'Royal Monogram', subtitle: 'Premium classic identity', file: '/logos/wedify-logo-01.svg' },
  { id: '02', title: 'Crest Wave', subtitle: 'Modern + elegant blend', file: '/logos/wedify-logo-02.svg' },
  { id: '03', title: 'Smart Signature', subtitle: 'Best for AI-first branding', file: '/logos/wedify-logo-03.svg' },
  { id: '04', title: 'Celebration Arc', subtitle: 'Playful and warm', file: '/logos/wedify-logo-04.svg' },
];

export default function LogosPage() {
  return (
    <>
      <Head>
        <title>Wedify Logos</title>
        <meta name="description" content="Interactive logo options for Wedify brand" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-cream-100 to-white pt-28 pb-16">
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 text-accent-800 text-xs font-medium mb-3">Brand Concepts</p>
            <h1 className="text-4xl md:text-5xl font-serif text-primary-900">Wedify Logo Options</h1>
            <p className="text-primary-500 mt-3 max-w-3xl">Hover each card for interactive preview, then download the SVG you like best.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {logoOptions.map((logo) => (
              <article key={logo.id} className="group bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-luxury-md transition-all duration-500 hover:-translate-y-1">
                <div className="p-5 border-b border-neutral-200 bg-cream-50 flex items-center justify-between">
                  <div>
                    <p className="font-serif text-xl text-primary-900">{logo.title}</p>
                    <p className="text-sm text-primary-500">{logo.subtitle}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary-900 text-white">Option {logo.id}</span>
                </div>

                <div className="p-4">
                  <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white transform-gpu transition-transform duration-500 group-hover:scale-[1.02]">
                    <img src={logo.file} alt={`Wedify logo option ${logo.id}`} className="w-full h-auto" />
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={logo.file}
                      download
                      className="px-4 py-2 rounded-xl bg-primary-950 text-white text-sm font-medium hover:bg-primary-800 transition-colors"
                    >
                      Download SVG
                    </a>
                    <a
                      href={logo.file}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl border border-neutral-300 text-primary-700 text-sm font-medium hover:border-primary-500"
                    >
                      Open Full Size
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
