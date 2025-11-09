# Intelligent Flashcards

A modern, AI-powered flashcard application built with Next.js, Firebase, and Tailwind CSS.

## Features

- 🎯 **Create Flashcards**: Easily create flashcard sets with AI assistance
- 🤖 **AI-Powered**: Generate flashcards using AI chatbot
- 📱 **Modern UI**: Beautiful, responsive design with dark mode support
- 🔐 **Authentication**: Secure authentication with Firebase (Email/Password, Google)
- 📊 **Study Mode**: Interactive 3D card flip animation for studying
- 🔍 **Search**: Search through your flashcard collection
- 📈 **Progress Tracking**: Track your study progress
- 🎨 **Themes**: Customizable themes with dark mode support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Components**: Custom React components
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Firebase project (see [Firebase Setup Guide](./FIREBASE_SETUP.md))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hackathon-Fall25
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration (see [Firebase Setup Guide](./FIREBASE_SETUP.md))
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION=flashcards
   ```

4. **Set up Firebase**
   - Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md) for detailed instructions
   - Enable Authentication (Email/Password, Google)
   - Set up Firestore database
   - Configure security rules

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Firebase Setup

For detailed Firebase setup instructions, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

### Quick Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Authentication (Email/Password, Google)
- [ ] Create Firestore database
- [ ] Set up security rules
- [ ] Configure environment variables
- [ ] Test authentication
- [ ] Create test flashcard sets

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── home/              # Home page (protected)
│   ├── flashcards/        # Create flashcards (protected)
│   ├── study/             # Study mode (protected)
│   ├── search/            # Search flashcards (protected)
│   ├── preferences/       # User preferences (protected)
│   ├── login/             # Login page
│   ├── signup/            # Sign up page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── AuthGuard.tsx     # Authentication guard
│   ├── ThemeProvider.tsx # Theme management
│   └── ...
├── lib/                   # Utilities and services
│   ├── firebase/         # Firebase configuration
│   ├── firebaseService.ts # Firestore operations
│   └── ...
└── hooks/                 # Custom React hooks
    └── useAuth.ts        # Authentication hook
```

## Authentication

The application uses Firebase Authentication with the following features:

- **Email/Password Authentication**: Users can sign up and sign in with email and password
- **Google Sign-In**: Users can sign in with their Google account
- **Protected Routes**: All main features require authentication
- **Automatic Redirects**: Unauthenticated users are redirected to the login page

### Protected Routes

The following routes require authentication:
- `/home` - Dashboard
- `/flashcards` - Create flashcards
- `/study/[id]` - Study mode
- `/search` - Search flashcards
- `/preferences` - User preferences

## Features

### Create Flashcards
- Create flashcard sets with titles and categories
- Add flashcards with words/terms and definitions
- Use AI chatbot to generate flashcards
- Save to Firestore

### Study Mode
- Interactive 3D card flip animation
- Keyboard navigation (Space, Arrow keys)
- Mark cards as known/unknown
- Progress tracking
- Completion screen

### Search
- Search through flashcard collection
- Filter by category
- Real-time search results

### Preferences
- Theme customization (Light/Dark/System)
- User profile management
- Notification preferences
- Account settings

## Environment Variables

Required environment variables (see `.env.local`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION=flashcards
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Security

- All protected routes require authentication
- Firebase security rules protect Firestore data
- Environment variables for sensitive configuration
- Secure authentication tokens stored in cookies

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Troubleshooting

### Common Issues

1. **Firebase Configuration Errors**
   - Check that all environment variables are set
   - Verify Firebase project is properly configured
   - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for details

2. **Authentication Issues**
   - Verify Authentication is enabled in Firebase Console
   - Check authorized domains in Firebase Console
   - Ensure security rules are properly configured

3. **Firestore Errors**
   - Check Firestore security rules
   - Verify collection name matches environment variable
   - Ensure database is created in Firebase Console

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [Firebase Setup Guide](./FIREBASE_SETUP.md)
- Review the troubleshooting section
- Open an issue on GitHub

## Acknowledgments

- Firebase for backend services
- Next.js for the framework
- Tailwind CSS for styling
- All contributors and users
