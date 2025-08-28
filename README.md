# 🍽️ Meal Calorie Count Generator

A modern frontend application for calculating meal calories using an external USDA FoodData Central API. Features user authentication, real-time calorie calculations, meal history tracking, and beautiful responsive UI.

![Meal Calorie Count Generator](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## 📸 Screenshots


- **Landing Page**: [Screenshot will be added after deployment]
- **Dashboard**: [Screenshot will be added after deployment]
- **Login/Register**: [Screenshot will be added after deployment]

## 🌐 Live Demo


**Live Application**: [Deployment link will be added after Vercel deployment]

## ✨ Features

### 🔐 Authentication & Security

- **JWT-based Authentication** with bcrypt password hashing
- **User Registration & Login** with email validation
- **Protected Routes** with role-based access control
- **Rate Limiting** to prevent API abuse
- **Input Validation** and sanitization
- **CORS Configuration** for secure cross-origin requests

### 🍎 Calorie Calculation

- **USDA API Integration** for accurate nutritional data
- **Fuzzy Matching** using Levenshtein distance algorithm
- **Real-time Search** with autocomplete suggestions
- **Multiple Serving Sizes** support
- **Comprehensive Nutrition Data** (calories, protein, fat, carbs, etc.)
- **Caching System** for improved performance

### 📊 Analytics & Tracking

- **Meal History** with detailed logging
- **Nutrition Analytics** with charts and statistics
- **Daily/Weekly/Monthly** calorie tracking
- **Popular Dishes** tracking
- **Export Functionality** (CSV format)
- **Search & Filter** capabilities

### 🎨 Modern UI/UX

- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** with system preference detection
- **Smooth Animations** using Framer Motion
- **Accessible Components** with ARIA labels
- **Loading States** and error handling
- **Toast Notifications** for user feedback

### 🚀 Performance & Scalability

- **Server-Side Rendering** with Next.js
- **Code Splitting** and lazy loading
- **Image Optimization** and compression
- **Database Indexing** for fast queries
- **Caching Strategies** (Redis support)
- **Docker Containerization** for easy deployment

## 🏗️ Tech Stack

### External Backend API

- **External API** hosted at `https://flybackend-misty-feather-6458.fly.dev/`
- **JWT Authentication** with 1-hour token validity
- **USDA FoodData Central API** integration
- **RESTful API** design

### Frontend

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Zustand** for state management
- **React Query** for data fetching
- **Framer Motion** for animations

### DevOps

- **Docker** containerization
- **Docker Compose** for orchestration
- **Nginx** reverse proxy (optional)
- **Redis** caching (optional)
- **Health Checks** and monitoring

## 📋 Prerequisites

- Node.js 18+
- Docker & Docker Compose (for containerized deployment)
- Internet connection (for external API access)

## 🚀 Quick Start

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd meal-calorie-count-generator
   ```

2. **Set up environment variables**

   ```bash
   cp frontend/env.example frontend/.env.local
   ```

   Edit the file with your configuration:

   ```env
   # frontend/.env.local
   NEXT_PUBLIC_API_BASE_URL=https://flybackend-misty-feather-6458.fly.dev
   ```

3. **Start the application**

   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - External API: https://flybackend-misty-feather-6458.fly.dev

### Option 2: Local Development

1. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   cp env.example .env.local
   # Edit .env.local with your configuration
   npm run dev
   ```

2. **Environment Configuration**
   - The frontend connects to the external API at `https://flybackend-misty-feather-6458.fly.dev`
   - No local database setup required

## 🤔 Decisions & Trade-offs

### Architecture Decisions

1. **External API Integration**

   - **Decision**: Used external hosted backend instead of local development
   - **Trade-off**: Reduced setup complexity but increased dependency on external service
   - **Benefit**: Faster development and deployment, no database management needed

2. **Next.js 14 with App Router**

   - **Decision**: Used latest Next.js with App Router for modern React patterns
   - **Trade-off**: Learning curve for new routing system
   - **Benefit**: Better performance, SEO, and developer experience

3. **Zustand for State Management**

   - **Decision**: Chose Zustand over Redux or Context API
   - **Trade-off**: Less ecosystem compared to Redux
   - **Benefit**: Simpler API, smaller bundle size, easier to learn

4. **TypeScript Implementation**

   - **Decision**: Full TypeScript implementation
   - **Trade-off**: Additional development time
   - **Benefit**: Better code quality, fewer runtime errors, better IDE support

5. **shadcn/ui Component Library**
   - **Decision**: Used shadcn/ui instead of Material-UI or Ant Design
   - **Trade-off**: Less pre-built components
   - **Benefit**: More customizable, better performance, Tailwind CSS integration

### Technical Trade-offs

1. **Authentication Strategy**

   - **Decision**: JWT tokens with localStorage
   - **Trade-off**: Security concerns with localStorage
   - **Benefit**: Simpler implementation, works with external API

2. **Error Handling**

   - **Decision**: Comprehensive error handling with user-friendly messages
   - **Trade-off**: More complex error logic
   - **Benefit**: Better user experience

3. **Responsive Design**

   - **Decision**: Mobile-first approach with Tailwind CSS
   - **Trade-off**: More CSS classes and complexity
   - **Benefit**: Better mobile experience, consistent design system

4. **Performance Optimization**
   - **Decision**: Code splitting, lazy loading, and optimizations
   - **Trade-off**: Increased build complexity
   - **Benefit**: Faster load times, better user experience

## 📚 API Documentation

The application uses an external API hosted at `https://flybackend-misty-feather-6458.fly.dev/`

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "message": "User registered successfully",
  "token": "<JWT_TOKEN>"
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "token": "<JWT_TOKEN>"
}
```

### Calorie Calculation Endpoints

#### Calculate Calories

```http
POST /get-calories
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "dish_name": "chicken biryani",
  "servings": 2
}

Response:
{
  "dish_name": "Chicken Biryani",
  "servings": 2,
  "calories_per_serving": 350,
  "total_calories": 700,
  "source": "USDA FoodData Central"
}
```

**Note**: JWT tokens are valid for 1 hour.

## 🎯 Usage Guide

### 1. User Registration

- Navigate to the registration page
- Fill in your details (first name, last name, email, password)
- Password must be at least 8 characters with uppercase, lowercase, number, and special character
- Verify your email and log in

### 2. Calorie Calculation

- Enter the dish name in the search field
- Select from autocomplete suggestions or type your own
- Specify the number of servings
- Click "Calculate Calories" to get instant results
- View detailed nutrition information

### 3. Meal Tracking

- All calculated meals are automatically saved to your history
- View your meal history with timestamps
- Filter and search through your meals
- Export your data for external analysis

### 4. Analytics

- View your daily, weekly, and monthly calorie intake
- See your most popular dishes
- Track your nutrition trends
- Monitor your health goals

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_BASE_URL=https://flybackend-misty-feather-6458.fly.dev
NEXT_PUBLIC_APP_NAME=Meal Calorie Count Generator
NEXT_PUBLIC_APP_DESCRIPTION=Calculate calories for your meals using USDA data
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
npm test
npm run test:ui
npm run e2e
```

## 📦 Deployment

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Frontend
cd frontend
npm run build
npm start
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication (1-hour validity)
- **Input Validation**: Comprehensive validation and sanitization
- **CORS**: Configurable cross-origin resource sharing
- **Secure API Communication**: HTTPS-only external API communication

## 📊 Performance Features

- **External API Integration**: Leverages hosted backend for optimal performance
- **Code Splitting**: Lazy loading for better performance
- **Image Optimization**: Next.js built-in image optimization
- **Caching**: Browser-level caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Use conventional commit messages
- Ensure responsive design
- Maintain accessibility standards

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Acknowledgments

- [USDA FoodData Central](https://fdc.nal.usda.gov/) for providing the nutritional database
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework
- [Zustand](https://zustand-demo.pmnd.rs/) for state management

## 📞 Support

- **Documentation**: [Wiki](https://github.com/your-repo/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@mealcalorieapp.com

## 🚀 Roadmap

- [ ] Mobile app (React Native)
- [ ] Barcode scanning for packaged foods
- [ ] Meal planning and recipes
- [ ] Social features and sharing
- [ ] Integration with fitness trackers
- [ ] AI-powered meal recommendations
- [ ] Multi-language support
- [ ] Advanced analytics and insights

---

**Made with ❤️ for healthy living**
