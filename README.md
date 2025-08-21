npm# CrossList App - Marketplace Management Platform

A modern React application for managing products across multiple marketplaces with a beautiful neumorphic design system.

## Features

- 🛍️ **Product Management**: Create, edit, and organize your product catalog
- 📊 **Multi-Marketplace Listings**: Manage listings across eBay, Amazon, Facebook, Mercari, Poshmark, Depop, Etsy, and Shopify
- 📈 **Analytics Dashboard**: Track performance metrics and sales data
- 🎨 **Neumorphic Design**: Modern, soft UI with depth and visual appeal
- 🤖 **AI Integration**: AI-powered listing optimization for better marketplace performance
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom neumorphic design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for beautiful, consistent icons
- **Routing**: React Router for navigation
- **API**: Base44 integration for backend services

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd crosslist-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── listings/       # Listing management components
│   └── products/       # Product management components
├── entities/           # Data entity classes
├── pages/              # Main page components
├── services/           # API and external service integrations
├── utils/              # Utility functions and helpers
├── App.jsx            # Main application component
├── Layout.jsx         # Application layout with navigation
└── main.jsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### API Configuration

The app is configured to work with Base44 API. Update the following in `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://app.base44.com/api';
const APP_ID = 'your-app-id';
const API_KEY = 'your-api-key';
```

### Design System

The neumorphic design system uses custom Tailwind CSS classes and CSS variables. Colors and shadows can be customized in:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Custom CSS variables and neumorphic styles

## Key Components

### Dashboard
- Stats cards showing key metrics
- Quick action buttons
- Recent products and active listings
- Performance charts by marketplace

### Products
- Product catalog management
- Category and condition filtering
- Bulk operations support
- Photo upload integration

### Listings
- Multi-marketplace listing creation
- AI-powered content optimization
- Status tracking and management
- Bulk listing operations

### Analytics
- Performance metrics visualization
- Marketplace comparison charts
- Category performance analysis
- Top-performing listings table

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using React and modern web technologies.
