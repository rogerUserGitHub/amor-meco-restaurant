# Amor Meco Restaurant Website

A modern, responsive restaurant website built with Next.js, TypeScript, and Tailwind CSS. Features multilingual support, dark/light mode, and a beautiful user interface for the Amor Meco Portuguese restaurant.

## 🚀 Features

### Core Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Multilingual Support**: Portuguese, Dutch, English, and Spanish
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Modern UI/UX**: Beautiful animations and interactions using Framer Motion
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

### Sections

- **Hero Section**: Full-screen background with parallax effect
- **Menu**: Card-based layout with downloadable PDF menu
- **Gallery**: Image carousel with Swiper.js
- **Event Booking**: Special events and private dining
- **Reservations**: Integrated booking widget
- **About**: Restaurant story, team, and philosophy
- **Reviews**: Customer testimonials with auto-slide
- **Contact**: Contact form, map, and social media links

### Technical Features

- **Performance**: Optimized images, lazy loading, and minimal JavaScript
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **PWA Ready**: Progressive Web App capabilities
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Carousel**: Swiper.js
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/amor-meco-restaurant.git
   cd amor-meco-restaurant
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
amor-meco-restaurant/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── pdfmenu/           # PDF menu page
├── components/            # React components
│   ├── Navigation.tsx     # Navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── Menu.tsx          # Menu section
│   ├── Gallery.tsx       # Gallery carousel
│   ├── EventBooking.tsx  # Events section
│   ├── Reservations.tsx  # Reservations form
│   ├── About.tsx         # About section
│   ├── Reviews.tsx       # Reviews carousel
│   ├── Contact.tsx       # Contact form
│   ├── Footer.tsx        # Footer
│   ├── ScrollToTop.tsx   # Scroll to top button
│   ├── FloatingForkKnife.tsx # Floating menu button
│   ├── ThemeProvider.tsx # Dark/light mode provider
│   └── LanguageProvider.tsx # Multilingual provider
├── public/               # Static assets
│   ├── images/          # Image files
│   └── locales/         # Translation files
├── lib/                 # Utility functions
├── tailwind.config.js   # Tailwind configuration
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Customization

### Colors

The primary color scheme is defined in `tailwind.config.js`:

- Primary: `#5E2129` (Burgundy)
- Secondary: `#8B4513` (Brown)
- Accent: `#D4AF37` (Gold)

### Fonts

- **Quiverleaf CF**: Used for headings (restaurant branding)
- **Inter**: Used for body text

### Images

Replace placeholder images in the components with your restaurant's actual photos. Update image URLs in:

- Hero section background
- Menu item images
- Gallery carousel
- Team member photos

## 🌐 Multilingual Support

The website supports four languages:

- Portuguese (default)
- Dutch
- English
- Spanish

Translations are managed through the `LanguageProvider` component. Add new translations by updating the `translations` object in `components/LanguageProvider.tsx`.

## 📱 PWA Features

The website is PWA-ready with:

- Service worker support
- Add to home screen capability
- Offline functionality (can be enhanced)
- App-like experience

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### SEO Configuration

Update SEO settings in `app/layout.tsx`:

- Meta tags
- Open Graph tags
- Twitter cards
- Structured data

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Traditional hosting with `npm run export`

## 📞 Support

For support or questions:

- Email: info@amormeco.pt
- Phone: +XXXXXXX

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Unsplash for placeholder images
- Lucide for beautiful icons

---

**Amor Meco Restaurant** - Where tradition meets innovation in Portuguese cuisine.
