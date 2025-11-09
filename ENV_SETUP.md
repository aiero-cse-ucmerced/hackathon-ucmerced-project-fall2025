# Environment Variables Setup

This project uses Firebase Firestore for search functionality. You need to set up the following environment variables.

## Required Environment Variables

Create a `.env.local` file in the root directory of your project with the following variables:

```env
# Firebase Configuration
# Get these values from your Firebase project settings
# https://console.firebase.google.com/

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Firestore Collection Name
# This is the collection name where flashcards are stored in Firestore
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

## Setting up Firestore

1. In Firebase Console, go to "Firestore Database"
2. Create a database (start in test mode for development)
3. Create a collection named `flashcards` (or update `NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION` to match your collection name)
4. Add documents with the following structure:
   ```json
   {
     "title": "DMV Permit Test",
     "category": "Driving"
   }
   ```

## Firestore Indexing

For better search performance, you may want to create composite indexes in Firestore:

1. Go to Firestore Database → Indexes
2. Create a composite index with:
   - Collection: `flashcards` (or your collection name)
   - Fields: `title` (Ascending), `category` (Ascending)

Note: The current implementation uses client-side filtering for case-insensitive search. For production with large datasets, consider:
- Using Algolia for full-text search
- Storing lowercase versions of titles in a separate field
- Using Cloud Functions for server-side search

## Security Rules

Make sure to set up proper Firestore security rules. For development, you can use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /flashcards/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

For production, implement proper authentication and authorization rules.

