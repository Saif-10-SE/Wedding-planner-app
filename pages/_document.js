import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Lahore's Premier Wedding Planner - Discover extraordinary venues for your dream celebration" />
        {/* Google Fonts — Playfair Display (serif headings), Cormorant Garamond (display), Inter (body sans) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:opsz,wght@14..32,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" 
          rel="stylesheet"
        />
      </Head>
      <body className="font-sans antialiased bg-neutral-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
