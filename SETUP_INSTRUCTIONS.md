# Setup Instructions for Intelligent Flashcards

This document provides step-by-step instructions for setting up the Intelligent Flashcards application.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Google account (for Firebase)
- A code editor (VS Code recommended)

## Step 1: Install Dependencies

1. Open a terminal in the project root directory
2. Run the following command:
   ```bash
   npm install
   ```

## Step 2: Set Up Firebase

### 2.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "Intelligent Flashcards")
4. Click **"Continue"**
5. (Optional) Enable Google Analytics
6. Click **"Create project"**
7. Wait for the project to be created

### 2.2 Register Your Web App

1. In Firebase Console, click the web icon (`</>`)
2. Register your app with a nickname
3. Click **"Register app"**
4. **Copy the `firebaseConfig` object** - you'll need these values

### 2.3 Enable Authentication

1. Go to **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"**:
   - Toggle **"Enable"** to ON
   - Click **"Save"**
5. Enable **"Google"**:
   - Toggle **"Enable"** to ON
   - Enter your project support email
   - Click **"Save"**

### 2.4 Set Up Firestore Database

1. Go to **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose a location (closest to your users)
5. Click **"Enable"**

### 2.5 Configure Security Rules

1. Go to **"Firestore Database"** → **"Rules"** tab
2. Replace the rules with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /flashcards/{flashcardId} {
         allow read: if true;
         allow create: if request.auth != null;
         allow update: if request.auth != null && 
                          (resource.data.userId == request.auth.uid || 
                           request.auth.uid == resource.data.userId);
         allow delete: if request.auth != null && 
                          (resource.data.userId == request.auth.uid || 
                           request.auth.uid == resource.data.userId);
       }
       match /users/{userId} {
         allow read: if request.auth != null && request.auth.uid == userId;
         allow create: if request.auth != null && request.auth.uid == userId;
         allow update: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
3. Click **"Publish"**

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root directory
2. Copy the following template:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION=flashcards
   ```
3. Replace the values with your Firebase configuration:
   - Go to Firebase Console → Project Settings → Your apps
   - Copy values from the `firebaseConfig` object
   - Paste them into `.env.local`

### Example `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCY97F1PWgEkVgNn-yJPSea93Ym46qX1p8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gen-lang-client-0599013375.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gen-lang-client-0599013375
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gen-lang-client-0599013375.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=145593178509
NEXT_PUBLIC_FIREBASE_APP_ID=1:145593178509:web:50b83b138f71ddec4785c4
NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION=flashcards
```

## Step 4: Run the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Step 5: Test the Application

1. **Test Authentication**:
   - Click "Get Started" on the landing page
   - Create a new account with email/password
   - Or sign in with Google
   - Verify you're redirected to the home page

2. **Test Flashcard Creation**:
   - Click the "+" button (floating action button)
   - Create a flashcard set
   - Add flashcards
   - Save the set

3. **Test Study Mode**:
   - Click on a flashcard set
   - Study the flashcards
   - Test keyboard navigation (Space, Arrow keys)

4. **Test Search**:
   - Use the search bar
   - Search for flashcards
   - Filter by category

## Troubleshooting

### Issue: "Firebase: Error (auth/invalid-api-key)"
**Solution**: 
- Check that your `NEXT_PUBLIC_FIREBASE_API_KEY` is correct
- Make sure the API key is enabled in Firebase Console
- Restart your development server after changing `.env.local`

### Issue: "Firebase: Error (auth/unauthorized-domain)"
**Solution**:
- Go to Firebase Console → Authentication → Settings → Authorized domains
- Make sure `localhost` is in the list
- Add your domain if deploying to production

### Issue: "Permission denied" errors
**Solution**:
- Check your Firestore security rules
- Make sure the user is authenticated
- Verify the rules are published

### Issue: Environment variables not working
**Solution**:
- Make sure variables start with `NEXT_PUBLIC_`
- Restart your development server
- Check that `.env.local` is in the root directory
- Verify the file is not in `.gitignore` (it should be)

### Issue: Authentication not working
**Solution**:
- Verify Authentication is enabled in Firebase Console
- Check that Email/Password and Google are enabled
- Verify authorized domains include `localhost`
- Check browser console for errors

## Next Steps

1. **Customize the App**:
   - Update the app name and branding
   - Customize themes and colors
   - Add your own features

2. **Deploy to Production**:
   - Set up a production Firebase project
   - Update security rules for production
   - Deploy to Vercel, Netlify, or another platform
   - Update environment variables in your hosting platform

3. **Set Up Monitoring**:
   - Enable Firebase App Check
   - Set up billing alerts
   - Monitor usage and performance

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the Firebase setup guide
3. Check the browser console for errors
4. Verify your environment variables
5. Ensure Firebase services are enabled

## Security Notes

- **Never commit `.env.local` to version control**
- Use proper Firestore security rules in production
- Enable Firebase App Check for production
- Set up proper authentication and authorization
- Monitor your Firebase usage and set billing alerts

