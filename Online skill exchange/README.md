# Skill Exchange Platform

A fully functional web application for users in India to share skills, learn from others, and collaborate through a comprehensive skill exchange platform.

## Features

### 🔐 Authentication System
- User registration with email and password
- Secure login system
- Demo account available (praveena@example.com / password123)
- Protected routes with automatic redirects

### 📊 Dashboard
- Personalized welcome message
- Statistics overview (teaching skills, learning skills, matches, messages)
- Quick view of your skills
- Suggested skill exchange matches
- Quick action buttons

### 🎓 Skill Management
- Add skills you can teach
- Add skills you want to learn
- Categorize skills (optional)
- Remove skills
- Browse other users' skills
- View skills by category

### 🤝 Smart Matching
- Automatic skill exchange matching
- Find users who teach what you want to learn
- Find users who want to learn what you teach
- View matched skills for each connection

### 💬 Real-time Chat
- One-to-one messaging
- Message timestamps
- Chat history
- Unread message notifications
- Search for users to start conversations
- Conversation list with last message preview

### 👤 User Profiles
- Edit username and bio
- View teaching and learning skills
- Account statistics
- Theme preference (persisted)

### 🎨 Theme System
- Light mode (white-blue theme)
- Dark mode
- Toggle between themes
- Preference saved per user
- Smooth theme transitions

### 📱 Responsive Design
- Mobile-friendly interface
- Tablet optimized
- Desktop experience
- Card-based layout
- Smooth animations

## Demo Users

The application comes pre-seeded with demo users:

1. **Praveena** (praveena@example.com / password123)
   - Teaches: React Development, JavaScript
   - Wants to learn: Graphic Design

2. **Rishi Prakash** (rishi@example.com / password123)
   - Teaches: Graphic Design, Adobe Photoshop
   - Wants to learn: Python

3. **Shiny** (shiny@example.com / password123)
   - Teaches: Python, Data Science
   - Wants to learn: Digital Marketing

4. **Aji Sharmila** (aji@example.com / password123)
   - Teaches: Digital Marketing, SEO
   - Wants to learn: React Development

5. **Bagyalakshmi** (bagya@example.com / password123)
   - Teaches: UI/UX Design, Figma
   - Wants to learn: Node.js

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router v7** - Navigation
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### UI Components
- **Radix UI** - Accessible component primitives
- **Custom component library** - Pre-built UI components

### State Management
- **React Context API** - Global state
- **localStorage** - Data persistence

## Data Persistence

All user data is stored in browser localStorage:

- **users** - User accounts and profiles
- **skills** - All skills (teaching and learning)
- **messages** - Chat messages
- **currentUserId** - Active session

Data persists across page refreshes and browser sessions.

## Application Structure

```
/src/app/
├── contexts/
│   ├── AuthContext.tsx      # Authentication and user management
│   ├── SkillsContext.tsx    # Skill management and matching
│   └── ChatContext.tsx      # Messaging system
├── pages/
│   ├── Landing.tsx          # Landing page
│   ├── Login.tsx            # Login page
│   ├── Register.tsx         # Registration page
│   ├── Dashboard.tsx        # Main dashboard
│   ├── Skills.tsx           # Skill management
│   ├── Messages.tsx         # Chat interface
│   ├── Profile.tsx          # User profile
│   └── NotFound.tsx         # 404 page
├── components/
│   ├── Navbar.tsx           # Navigation component
│   └── ui/                  # Reusable UI components
├── utils/
│   └── seedData.ts          # Demo data seeding
├── routes.tsx               # Route configuration
└── App.tsx                  # Main app component
```

## Key Features Explained

### Skill Matching Algorithm
The platform automatically finds matches by:
1. Finding users who teach what you want to learn
2. Finding users who want to learn what you teach
3. Combining both criteria for perfect matches
4. Displaying mutual skill exchange opportunities

### Chat System
- Messages are stored with sender, receiver, content, and timestamp
- Unread message tracking per conversation
- Automatic read status updates when viewing conversation
- Search functionality to find users
- Real-time message display (simulated with state updates)

### Theme System
- Theme preference stored per user in localStorage
- Applied to document root with 'dark' class
- Smooth CSS transitions between themes
- Persists across sessions

## Getting Started

1. Visit the landing page
2. Click "Get Started Free" to register
3. Or use the demo account to login immediately
4. Explore the dashboard
5. Add your skills (teaching and learning)
6. View suggested matches
7. Start chatting with other users

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Data Privacy

**Note:** This is a demonstration application. All data is stored locally in your browser. Do not use this application for collecting personally identifiable information (PII) or storing sensitive data in production environments.

## Future Enhancements

Potential improvements for production use:
- Backend API integration (Supabase, Firebase, etc.)
- Real-time messaging with WebSockets
- Email verification
- Password recovery
- Profile pictures
- Skill endorsements
- Rating system
- Video call integration
- Calendar scheduling
- Notifications system
