# Lahore Elite Weddings 🎊

A premium wedding planner web application for Lahore's top marquees. Built with Next.js and Tailwind CSS.

## Features

- 🏰 **10+ Premium Marquees** - Royal Palm, PC, Faletti's, Serena, and more
- 💰 **Budget Calculator** - Comprehensive pricing for menu, decor, photography
- 📊 **Venue Comparison** - Side-by-side comparison of venues
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Beautiful UI** - Modern, elegant design with gold & burgundy theme

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. **Navigate to the project folder:**
   ```bash
   cd C:\WeddingPlannerApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## AI Assistant Backend (OpenAI / Gemini)

The assistant now uses a secure server-side API route at `pages/api/assistant-chat.js`.
API keys are read on the server only and are never exposed to the browser.

### Setup

1. Copy `.env.example` to `.env.local`.
2. Configure one provider:

```bash
# OpenAI
LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# OR Gemini
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

3. Restart the dev server after editing environment variables.

If no key is configured, the assistant returns a configuration error message from the backend.

## Project Structure

```
WeddingPlannerApp/
├── components/          # Reusable UI components
│   ├── Navbar.js
│   ├── Footer.js
│   └── MarqueeCard.js
├── data/
│   └── marquees.js      # All marquee data & pricing
├── pages/
│   ├── index.js         # Homepage
│   ├── calculator.js    # Budget calculator
│   ├── compare.js       # Venue comparison
│   └── marquees/
│       ├── index.js     # All marquees listing
│       └── [slug].js    # Individual marquee page
├── styles/
│   └── globals.css      # Global styles & Tailwind
└── public/              # Static assets
```

## Marquees Included

1. Royal Palm Golf & Country Club
2. Pearl Continental Marquee
3. Faletti's Hotel
4. Nishat Hotel
5. Lahore Gymkhana
6. The Grand Marquee (Packages Mall)
7. Serena Hotel Lahore
8. Fortress Stadium Marquee
9. Barood Khana Marquee
10. Royal Pines (DHA)

## Calculator Features

- Guest count slider (100 - 4000)
- Multiple event support (Mehndi, Barat, Walima)
- Menu package selection
- Decor package selection
- Photography & videography packages
- Entertainment options
- Transport services
- Wedding invitations
- Tax & contingency calculation
- Per-guest cost breakdown

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Playfair Display, Inter

## Customization

### Adding New Marquees

Edit `data/marquees.js` and add a new object to the `marquees` array:

```javascript
{
  id: 11,
  name: "Your Marquee Name",
  slug: "your-marquee-slug",
  location: "Address, Lahore",
  // ... other properties
}
```

### Modifying Pricing

All pricing data is in `data/marquees.js`:
- `menuPackages` - Per-head menu options
- `decorPackages` - Decoration packages
- `additionalServices` - Photography, entertainment, etc.

## License

This project is for educational/personal use.

---

Made with ❤️ for the beautiful weddings of Lahore
