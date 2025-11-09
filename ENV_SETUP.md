# Environment Variables Setup

This project uses Firebase for authentication, database, and storage. You need to set up environment variables in a `.env.local` file.

## Quick Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration values (see below)

3. Restart your development server

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
# Get these values from Firebase Console → Project Settings → Your apps → Web app config

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Firestore Collection Name
NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION=flashcards
```

## Getting Firebase Configuration Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on the web app icon (</>)
7. Copy the configuration values from the `firebaseConfig` object

## Example Configuration

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCY97F1PWgEkVgNn-yJPSea93Ym46qX1p8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gen-lang-client-0599013375.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gen-lang-client-0599013375
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gen-lang-client-0599013375.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=145593178509
NEXT_PUBLIC_FIREBASE_APP_ID=1:145593178509:web:50b83b138f71ddec4785c4
NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION=flashcards
```

## Important Notes

- **Never commit `.env.local` to version control** - it's already in `.gitignore`
- Environment variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- Restart your development server after changing `.env.local`
- For production, set these variables in your hosting platform's environment variable settings

## Firebase Setup

For complete Firebase setup instructions, see:
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Detailed Firebase setup guide
- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Complete setup instructions

## Troubleshooting

### Environment variables not working?

1. Make sure the file is named `.env.local` (not `.env`)
2. Verify variables start with `NEXT_PUBLIC_`
3. Restart your development server
4. Check that the file is in the root directory
5. Verify there are no syntax errors (no spaces around `=`)

### Firebase errors?

1. Check that all environment variables are set correctly
2. Verify your Firebase project is properly configured
3. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions

## Security

- Keep your `.env.local` file secure
- Never share your Firebase API keys publicly
- Use different Firebase projects for development and production
- Set up proper Firestore security rules
- Enable Firebase App Check for production
