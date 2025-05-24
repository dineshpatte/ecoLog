# EcoLog - Carbon Footprint Tracker

A modern web application for tracking your daily environmental impact and building sustainable habits. Monitor your carbon footprint, earn eco-rewards, and contribute to a greener future.

## Features

### Core Functionality
- Carbon Footprint Tracking - Monitor daily CO2 emissions from transportation, food, energy, and waste
- Activity Logging - Easy-to-use forms for logging daily environmental activities
- Visual Analytics - Beautiful charts and graphs showing your environmental progress
- Eco Rewards System - Earn points and achievements for sustainable choices
- Personalized Tips - AI-powered suggestions to reduce your carbon footprint

### User Experience
- Responsive Design - Works seamlessly on desktop, tablet, and mobile devices
- Modern UI - Clean, intuitive interface with glassmorphism effects
- Real-time Updates - Instant feedback on your environmental impact
- Progress Tracking - Weekly and monthly carbon footprint trends
- News Integration - Latest eco-friendly news and updates

### Authentication & Security
- User Registration - Secure account creation with avatar upload
- Login System - JWT-based authentication
- Password Management - Change password functionality
- Account Settings - Update profile information
- Data Privacy - Secure storage of personal environmental data

## Tech Stack

### Frontend
- React - Modern JavaScript library for building user interfaces
- React Router - Client-side routing for single-page application
- Tailwind CSS - Utility-first CSS framework for rapid UI development
- Lucide React - Beautiful, customizable icons
- Chart.js - Interactive charts for data visualization
- Axios - HTTP client for API requests

### Backend
- Node.js - JavaScript runtime for server-side development
- Express.js - Web application framework
- JWT - JSON Web Tokens for authentication
- MongoDB - NoSQL database for data storage
- Multer - File upload middleware

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm package manager
- MongoDB database

### Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/ecolog.git
cd ecolog
\`\`\`

### Backend Setup
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### Frontend Setup
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

The backend will run on `http://localhost:3000`
The frontend will run on `http://localhost:5173`

## Project Structure

\`\`\`
ecolog/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── navbar.tsx
│   │   │   ├── reward.tsx
│   │   │   ├── tip.tsx
│   │   │   └── carbonChart.tsx
│   │   ├── pages/
│   │   │   ├── home.tsx
│   │   │   ├── about.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   ├── log-activity.tsx
│   │   │   ├── change-password.tsx
│   │   │   └── update-account.tsx
│   │   ├── api/
│   │   │   └── index.js
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.js
└── README.md
\`\`\`

## Environment Variables

### Backend (.env)
\`\`\`env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecolog
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
\`\`\`

### Frontend (.env)
\`\`\`env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=EcoLog
\`\`\`

## API Endpoints

### Authentication
\`\`\`
POST /api/v1/users/register    - User registration
POST /api/v1/users/login       - User login
POST /api/v1/users/logout      - User logout
PUT  /api/v1/users/updatedetails - Update profile
POST /api/v1/users/changepassword - Change password
\`\`\`

### Activities
\`\`\`
POST /api/v1/activities/logactivity  - Log daily activities
GET  /api/v1/activities/history      - Get activity history
\`\`\`

### Rewards
\`\`\`
POST /api/v1/rewards/check-daily-reward  - Check daily rewards
GET  /api/v1/rewards/achievements         - Get user achievements
\`\`\`

## Development Scripts

### Backend
\`\`\`bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
npm test        # Run tests
\`\`\`

### Frontend
\`\`\`bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
\`\`\`

## Features Overview

### Dashboard
- Carbon footprint overview with circular progress indicator
- Daily rewards and achievements tracking
- Eco tips and personalized suggestions
- Environmental news feed integration
- Interactive charts and analytics

### Activity Logging
- Transportation tracking (car, bike, public transport, walking)
- Food consumption logging (meat, dairy, vegetables, local produce)
- Energy usage monitoring (electricity, gas consumption)
- Waste management tracking (recycling habits)
- Other eco-friendly actions recording

### User Management
- Registration with username, email, password, and avatar upload
- Secure login with JWT authentication
- Profile management and account updates
- Password change functionality
- Account security features

### About Page
- Carbon score explanation and methodology
- Environmental impact education
- Step-by-step usage guide
- Benefits to society and environment
- How carbon footprint is calculated

## Carbon Score Calculation

The carbon score is calculated based on:
- Transportation emissions (kg CO2 per km by transport mode)
- Food consumption impact (kg CO2 per serving by food type)
- Energy usage (kg CO2 per kWh based on energy source)
- Waste management practices (reduction factors for recycling)

Score ranges:
- Excellent: 0-5 kg CO2
- Good: 5-10 kg CO2
- Fair: 10-15 kg CO2
- Needs Improvement: 15+ kg CO2

## Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use TypeScript for type safety
- Maintain responsive design principles
- Write clean, commented code
- Test on multiple devices and browsers
- Follow existing code style and conventions

## Deployment

### Backend Deployment
\`\`\`bash
# Build and deploy to your preferred platform
npm run build
# Deploy to Heroku, Railway, or similar
\`\`\`

### Frontend Deployment
\`\`\`bash
# Build for production
npm run build

# Deploy to your preferred hosting platform
# Upload dist folder to hosting service
\`\`\`

## Database Schema

### User Model
\`\`\`javascript
{
  username: String,
  email: String,
  password: String (hashed),
  avatar: String (URL),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Activity Model
\`\`\`javascript
{
  userId: ObjectId,
  date: Date,
  transport: Array,
  food: Object,
  energy: Object,
  waste: Object,
  carbonScore: Number,
  createdAt: Date
}
\`\`\`

### Reward Model
\`\`\`javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  points: Number,
  date: Date,
  type: String
}
\`\`\`

## Testing

### Backend Testing
\`\`\`bash
cd backend
npm test
\`\`\`

### Frontend Testing
\`\`\`bash
cd frontend
npm run test
\`\`\`

## Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check MongoDB connection
   - Verify environment variables
   - Ensure port 3000 is available

2. **Frontend not connecting to backend**
   - Verify VITE_API_URL in frontend .env
   - Check CORS configuration in backend
   - Ensure backend is running

3. **Database connection issues**
   - Verify MongoDB is running
   - Check MONGODB_URI in backend .env
   - Ensure database permissions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions, issues, or suggestions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## Acknowledgments

- Lucide React for icons
- Tailwind CSS for styling
- Chart.js for data visualization
- React Router for navigation
- Express.js for backend framework
