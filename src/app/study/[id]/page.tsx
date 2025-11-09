"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getFlashcardSetById, FlashcardSet } from "../../../lib/firebaseService";

export default function StudyFlashcardPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());

  // Define handlers using useCallback to avoid dependency issues
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (flashcardSet && prev < flashcardSet.flashcards.length - 1) {
        setIsFlipped(false);
        return prev + 1;
      }
      return prev;
    });
  }, [flashcardSet]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        setIsFlipped(false);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const handleMarkAsKnown = useCallback(() => {
    setKnownCards((prev) => new Set([...prev, currentIndex]));
    handleNext();
  }, [currentIndex, handleNext]);

  const handleMarkAsUnknown = useCallback(() => {
    setKnownCards((prev) => {
      const newKnown = new Set(prev);
      newKnown.delete(currentIndex);
      return newKnown;
    });
    handleNext();
  }, [currentIndex, handleNext]);

  // Fetch flashcard set
  useEffect(() => {
    const fetchFlashcardSet = async () => {
      if (!id) {
        setError("Invalid flashcard set ID");
        setIsLoading(false);
        return;
      }

      try {
        const set = await getFlashcardSetById(id);
        if (set) {
          setFlashcardSet(set);
        } else {
          setError("Flashcard set not found");
        }
      } catch (err) {
        console.error("Error fetching flashcard set:", err);
        setError("Failed to load flashcard set");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashcardSet();
  }, [id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isLoading || !flashcardSet || !flashcardSet.flashcards || flashcardSet.flashcards.length === 0) return;
      
      // Don't handle keyboard shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          if (isFlipped) {
            handleNext();
          } else {
            handleFlip();
          }
          break;
        case 'Enter':
          e.preventDefault();
          handleFlip();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isFlipped) {
            handleFlip();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isFlipped) {
            handleFlip();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, flashcardSet, isLoading, handleFlip, handleNext, handlePrevious]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-secondary">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (error || !flashcardSet) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-md bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-secondary mb-6">{error || "Flashcard set not found"}</p>
          <Link href="/home">
            <button className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Check if flashcard set has flashcards
  if (!flashcardSet.flashcards || flashcardSet.flashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center max-w-md bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Empty Flashcard Set</h2>
          <p className="text-secondary mb-6">This flashcard set doesn't have any cards yet.</p>
          <Link href="/home">
            <button className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = flashcardSet.flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcardSet.flashcards.length) * 100;
  const isKnown = knownCards.has(currentIndex);
  const isLastCard = currentIndex === flashcardSet.flashcards.length - 1;
  const isFirstCard = currentIndex === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pb-20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">{flashcardSet.title}</h1>
              <p className="text-sm text-secondary">{flashcardSet.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {currentIndex + 1} of {flashcardSet.flashcards.length}
            </p>
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
              <div
                className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Flashcard */}
        <div className="mb-6">
          <div className="relative h-96 cursor-pointer perspective-1000" onClick={handleFlip}>
            <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}>
              {/* Front of card (Question) */}
              <div className="flashcard-front rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                <div className="text-center w-full">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                      QUESTION
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 break-words">
                    {currentCard.word}
                  </h2>
                  <p className="text-secondary text-sm">Tap to reveal answer</p>
                </div>
              </div>

              {/* Back of card (Answer) */}
              <div className="flashcard-back rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 border-2 border-yellow-300 dark:border-yellow-600">
                <div className="text-center w-full">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
                      ANSWER
                    </span>
                  </div>
                  <p className="text-2xl font-semibold text-white break-words">
                    {currentCard.definition}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Flip hint */}
          <div className="text-center mt-4">
            <button
              onClick={handleFlip}
              className="text-sm text-secondary hover:text-gray-900 dark:hover:text-gray-100 transition-colors underline"
            >
              {isFlipped ? "Show Question" : "Reveal Answer"}
            </button>
          </div>
        </div>

        {/* Navigation and Actions */}
        <div className="space-y-4">
          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={isFirstCard}
              className="flex-1 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
            </button>

            <button
              onClick={handleNext}
              disabled={isLastCard}
              className="flex-1 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <span className="flex items-center justify-center gap-2">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mark as Known/Unknown buttons - only show when flipped */}
          {isFlipped && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleMarkAsUnknown}
                className="px-6 py-3 bg-red-500 dark:bg-red-600 text-white rounded-xl font-medium hover:bg-red-600 dark:hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Still Learning
                </span>
              </button>
              <button
                onClick={handleMarkAsKnown}
                className="px-6 py-3 bg-green-500 dark:bg-green-600 text-white rounded-xl font-medium hover:bg-green-600 dark:hover:bg-green-700 transition-all shadow-sm hover:shadow-md"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  I Know This
                </span>
              </button>
            </div>
          )}

          {/* Completion message */}
          {isLastCard && isFlipped && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white text-center shadow-lg">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Great job! 🎉</h3>
              <p className="mb-2">You've completed this flashcard set</p>
              <p className="text-sm opacity-90 mb-4">
                {knownCards.size} of {flashcardSet.flashcards.length} cards marked as known
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/home">
                  <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium hover:bg-gray-100 transition-colors shadow-md">
                    Back to Home
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setIsFlipped(false);
                    setKnownCards(new Set());
                  }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30 shadow-md"
                >
                  Study Again
                </button>
              </div>
            </div>
          )}
          
          {/* Keyboard shortcuts hint */}
          {!isLastCard && (
            <div className="mt-4 text-center">
              <p className="text-xs text-secondary">
                💡 Use arrow keys to navigate • Space/Enter to flip
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
