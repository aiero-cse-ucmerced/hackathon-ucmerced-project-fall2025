"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getFlashcardSetById, FlashcardSet, FlashcardItem } from "../../../lib/firebaseService";

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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (flashcardSet && currentIndex < flashcardSet.flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkAsKnown = () => {
    setKnownCards(new Set([...knownCards, currentIndex]));
    handleNext();
  };

  const handleMarkAsUnknown = () => {
    const newKnown = new Set(knownCards);
    newKnown.delete(currentIndex);
    setKnownCards(newKnown);
    handleNext();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-secondary">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (error || !flashcardSet) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
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
          <div
            className="relative h-96 cursor-pointer perspective-1000"
            onClick={handleFlip}
          >
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front of card (Question) */}
              <div
                className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 ${
                  isFlipped ? "hidden" : ""
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
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
              <div
                className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 border-2 border-yellow-300 dark:border-yellow-600 ${
                  !isFlipped ? "hidden" : ""
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
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
              <h3 className="text-2xl font-bold mb-2">Great job! 🎉</h3>
              <p className="mb-4">You've completed this flashcard set</p>
              <div className="flex gap-4 justify-center">
                <Link href="/home">
                  <button className="px-6 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Back to Home
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setIsFlipped(false);
                    setKnownCards(new Set());
                  }}
                  className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
                >
                  Study Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

