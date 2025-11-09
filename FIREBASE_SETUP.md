# Firebase Setup Instructions

This guide will walk you through setting up Firebase for the Intelligent Flashcards application.

## Prerequisites

- A Google account
- Node.js and npm installed
- Basic understanding of Firebase services

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "Intelligent Flashcards")
4. Click **"Continue"**
5. (Optional) Enable Google Analytics if desired
6. Click **"Create project"**
7. Wait for the project to be created, then click **"Continue"**

## Step 2: Register Your Web App

1. In the Firebase Console, click on the web icon (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Intelligent Flashcards Web")
3. **Do NOT** check "Also set up Firebase Hosting" (unless you want to use it)
4. Click **"Register app"**
5. Copy the `firebaseConfig` object that appears - you'll need these values

## Step 3: Enable Authentication

1. In the Firebase Console, go to **"Authentication"** in the left sidebar
2. Click **"Get started"** if this is your first time
3. Go to the **"Sign-in method"** tab
4. Enable the following sign-in providers:

### Email/Password Authentication
- Click on **"Email/Password"**
- Toggle **"Enable"** to ON
- Click **"Save"**

### Google Authentication
- Click on **"Google"**
- Toggle **"Enable"** to ON
- Enter your project support email
- Click **"Save"**

### (Optional) Facebook Authentication
- Click on **"Facebook"**
- Toggle **"Enable"** to ON
- You'll need to create a Facebook App ID and App Secret
- Enter the credentials and click **"Save"**

## Step 4: Set Up Firestore Database

1. In the Firebase Console, go to **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** for development (you can change rules later)
4. Select a location for your database (choose the closest to your users)
5. Click **"Enable"**

### Firestore Security Rules

Update your Firestore security rules to the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Flashcards collection
    match /flashcards/{flashcardId} {
      // Anyone can read flashcards
      allow read: if true;
      // Only authenticated users can create/update/delete
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                       (resource.data.userId == request.auth.uid || 
                        request.auth.uid == resource.data.userId);
      allow delete: if request.auth != null && 
                       (resource.data.userId == request.auth.uid || 
                        request.auth.uid == resource.data.userId);
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      // Users can create/update their own data
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

To update rules:
1. Go to **"Firestore Database"** → **"Rules"** tab
2. Paste the rules above
3. Click **"Publish"**

## Step 5: Set Up Storage (Optional)

1. In the Firebase Console, go to **"Storage"** in the left sidebar
2. Click **"Get started"**
3. Start in test mode (you can change rules later)
4. Select a location (same as Firestore is recommended)
5. Click **"Done"**

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Only authenticated users can upload files
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 6: Configure Environment Variables

1. Create a `.env.local` file in the root directory of your project
2. Add the following environment variables with values from your Firebase config:

```env
# Firebase Configuration
# Get these from Firebase Console → Project Settings → Your apps → Web app config

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Firestore Collection Name
NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION=flashcards
```

### How to Get Your Firebase Config Values

1. Go to Firebase Console
2. Click the gear icon ⚙️ next to "Project Overview"
3. Select **"Project settings"**
4. Scroll down to **"Your apps"** section
5. Click on your web app
6. In the "SDK setup and configuration" section, you'll see the `firebaseConfig` object
7. Copy each value to your `.env.local` file

Example `firebaseConfig`:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## Step 7: Create Firestore Indexes (Optional but Recommended)

For better query performance, create indexes:

1. Go to **"Firestore Database"** → **"Indexes"** tab
2. Click **"Create Index"**
3. Collection ID: `flashcards`
4. Add fields:
   - `title` (Ascending)
   - `category` (Ascending)
   - `createdAt` (Descending)
5. Click **"Create"**

## Step 8: Test Your Setup

1. Make sure your `.env.local` file is properly configured
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Try to:
   - Sign up for a new account
   - Sign in with email/password
   - Sign in with Google
   - Create a flashcard set
   - View flashcards

## Step 9: Set Up Domain Restrictions (Production)

For production, configure authorized domains:

1. Go to **"Authentication"** → **"Settings"** → **"Authorized domains"**
2. Add your production domain (e.g., `yourdomain.com`)
3. Remove `localhost` if you don't want local development (keep it for development)

## Step 10: Enable Additional Security Features

### Enable Email Verification (Optional)
1. Go to **"Authentication"** → **"Settings"** → **"Users"**
2. Enable **"Email link (passwordless sign-in)"** if desired
3. Configure email templates in **"Templates"** tab

### Set Up CORS (If Needed)
If you're making requests from a different domain, configure CORS in Firebase Storage rules.

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your `NEXT_PUBLIC_FIREBASE_API_KEY` is correct
   - Make sure the API key is enabled in Firebase Console

2. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to authorized domains in Firebase Console
   - For local development, `localhost` should be authorized by default

3. **"Permission denied" errors in Firestore**
   - Check your Firestore security rules
   - Make sure the user is authenticated
   - Verify the user has the correct permissions

4. **"Missing or insufficient permissions"**
   - Update your Firestore security rules
   - Make sure `request.auth != null` for protected operations

5. **Environment variables not working**
   - Make sure variables start with `NEXT_PUBLIC_`
   - Restart your development server after changing `.env.local`
   - Check that `.env.local` is in the root directory

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Security Best Practices

1. **Never commit `.env.local` to version control**
   - Add `.env.local` to your `.gitignore` file
   - Use environment variables for sensitive data

2. **Use proper Firestore security rules**
   - Don't use test mode in production
   - Implement proper authentication checks
   - Validate user permissions

3. **Enable Firebase App Check** (Production)
   - Helps protect your backend resources from abuse
   - Go to **"App Check"** in Firebase Console

4. **Monitor your usage**
   - Set up billing alerts
   - Monitor authentication attempts
   - Review Firestore usage

5. **Keep Firebase SDK updated**
   ```bash
   npm update firebase
   ```

## Next Steps

After setting up Firebase:

1. Test all authentication methods
2. Create some test flashcard sets
3. Verify data is being saved to Firestore
4. Test the search functionality
5. Set up proper security rules for production
6. Configure custom domain (if applicable)
7. Set up monitoring and alerts

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Firebase documentation
3. Check the browser console for errors
4. Verify your environment variables are correct
5. Ensure Firebase services are enabled in the console

