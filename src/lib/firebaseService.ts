import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc,
  doc,
  orderBy, 
  limit
} from 'firebase/firestore';
import { db } from './firebase';

export interface Flashcard {
  id: string;
  title: string;
  category: string;
}

// Get collection name from environment variable
const FLASHCARDS_COLLECTION = process.env.NEXT_PUBLIC_FIREBASE_FLASHCARDS_COLLECTION || 'flashcards';

/**
 * Search flashcards by title (case-insensitive partial match)
 * @param searchTerm - The search term to match against flashcard titles
 * @param maxResults - Maximum number of results to return (default: 50)
 * @returns Promise<Flashcard[]>
 */
export async function searchFlashcards(
  searchTerm: string,
  maxResults: number = 50
): Promise<Flashcard[]> {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }

  if (!searchTerm.trim()) {
    return [];
  }

  try {
    const flashcardsRef = collection(db, FLASHCARDS_COLLECTION);
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Firestore doesn't support case-insensitive search directly,
    // so we fetch and filter client-side for now
    // For better performance with large datasets, consider:
    // 1. Using Algolia for full-text search
    // 2. Storing lowercase titles in a separate field for indexing
    // 3. Using Cloud Functions for server-side search
    
    const q = query(
      flashcardsRef,
      orderBy('title'),
      limit(200) // Fetch more to filter client-side
    );

    const querySnapshot = await getDocs(q);
    const results: Flashcard[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const title = data.title || '';
      
      // Case-insensitive partial match
      if (title.toLowerCase().includes(searchLower)) {
        results.push({
          id: doc.id,
          title: data.title,
          category: data.category || '',
        });
      }
    });

    // Limit results
    return results.slice(0, maxResults);
  } catch (error) {
    console.error('Error searching flashcards:', error);
    return [];
  }
}

/**
 * Get all flashcards from the database
 * @param maxResults - Maximum number of results to return (default: 100)
 * @returns Promise<Flashcard[]>
 */
export async function getAllFlashcards(maxResults: number = 100): Promise<Flashcard[]> {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }

  try {
    const flashcardsRef = collection(db, FLASHCARDS_COLLECTION);
    const q = query(
      flashcardsRef,
      orderBy('title'),
      limit(maxResults)
    );

    const querySnapshot = await getDocs(q);
    const results: Flashcard[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      results.push({
        id: doc.id,
        title: data.title,
        category: data.category || '',
      });
    });

    return results;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return [];
  }
}

/**
 * Get flashcards by category
 * @param category - The category to filter by
 * @param maxResults - Maximum number of results to return (default: 50)
 * @returns Promise<Flashcard[]>
 */
export async function getFlashcardsByCategory(
  category: string,
  maxResults: number = 50
): Promise<Flashcard[]> {
  if (!db) {
    console.error('Firestore not initialized');
    return [];
  }

  if (!category.trim()) {
    return getAllFlashcards(maxResults);
  }

  try {
    const flashcardsRef = collection(db, FLASHCARDS_COLLECTION);
    const q = query(
      flashcardsRef,
      where('category', '==', category),
      orderBy('title'),
      limit(maxResults)
    );

    const querySnapshot = await getDocs(q);
    const results: Flashcard[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      results.push({
        id: doc.id,
        title: data.title,
        category: data.category || '',
      });
    });

    return results;
  } catch (error) {
    console.error('Error fetching flashcards by category:', error);
    return [];
  }
}

/**
 * Get a single flashcard by ID
 * @param id - The flashcard ID
 * @returns Promise<Flashcard | null>
 */
export async function getFlashcardById(id: string): Promise<Flashcard | null> {
  if (!db) {
    console.error('Firestore not initialized');
    return null;
  }

  try {
    const flashcardRef = doc(db, FLASHCARDS_COLLECTION, id);
    const docSnapshot = await getDoc(flashcardRef);
    
    if (!docSnapshot.exists()) {
      return null;
    }

    const data = docSnapshot.data();
    
    return {
      id: docSnapshot.id,
      title: data.title,
      category: data.category || '',
    };
  } catch (error) {
    console.error('Error fetching flashcard by ID:', error);
    return null;
  }
}

