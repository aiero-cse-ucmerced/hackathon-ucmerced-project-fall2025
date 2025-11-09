"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AIChatbot from "../../components/AIChatbot";
import { createFlashcardSet } from "../../lib/firebaseService";
import type { FlashcardItem } from "../../lib/firebaseService";

export default function CreateFlashcardSet() {
  const router = useRouter();
  const [deckTitle, setDeckTitle] = useState("");
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [flashcards, setFlashcards] = useState<FlashcardItem[]>([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAddFlashcard = () => {
    if (word.trim() && definition.trim()) {
      setFlashcards([...flashcards, { word: word.trim(), definition: definition.trim() }]);
      setWord("");
      setDefinition("");
      setError(""); // Clear any previous errors
    } else {
      setError("Please fill in both word and definition");
    }
  };

  const handleRemoveFlashcard = (indexToRemove: number) => {
    setFlashcards(flashcards.filter((_, index) => index !== indexToRemove));
  };

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  const handleAddFlashcardFromAI = (word: string, definition: string) => {
    setFlashcards((prevFlashcards) => [...prevFlashcards, { word, definition }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Shift+Enter for new lines, but don't submit on Enter alone for textarea
    // The submit will be handled by the button click
  };

  const handleSaveFlashcardSet = async () => {
    // Clear previous errors
    setError("");

    // Validation
    if (!deckTitle.trim()) {
      setError("Please enter a deck title");
      return;
    }

    if (flashcards.length === 0) {
      setError("Please add at least one flashcard");
      return;
    }

    setIsSaving(true);
    setSuccess(false);

    try {
      const setId = await createFlashcardSet({
        title: deckTitle.trim(),
        category: category.trim() || "General",
        flashcards: flashcards,
      });

      if (setId) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/home");
        }, 1500);
      } else {
        setError("Failed to save flashcard set. Please try again.");
      }
    } catch (err) {
      console.error("Error saving flashcard set:", err);
      setError("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create Flashcard Set</h1>
          <Link href="/home">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 dark:text-green-300 font-medium">Flashcard set created successfully! Redirecting...</p>
            </div>
          </div>
        )}

        {/* Deck Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Deck Information</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="deckTitle" className="block text-sm font-medium mb-2">
                Deck Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="deckTitle"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-gray-100 transition-all"
                value={deckTitle}
                onChange={(e) => {
                  setDeckTitle(e.target.value);
                  setError(""); // Clear error when user types
                }}
                placeholder="e.g., Spanish Vocabulary"
                disabled={isSaving}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-gray-100 transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Languages, Science, History"
                disabled={isSaving}
              />
            </div>
          </div>
        </div>

        {/* Add Flashcard Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Add New Flashcard</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="word" className="block text-sm font-medium mb-2">
                Word/Term
              </label>
              <input
                type="text"
                id="word"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-gray-100 transition-all"
                value={word}
                onChange={(e) => {
                  setWord(e.target.value);
                  setError(""); // Clear error when user types
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && word.trim() && definition.trim()) {
                    handleAddFlashcard();
                  }
                }}
                placeholder="Enter word or term"
                disabled={isSaving}
              />
            </div>

            <div>
              <label htmlFor="definition" className="block text-sm font-medium mb-2">
                Definition
              </label>
              <textarea
                id="definition"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-700 dark:text-gray-100 resize-none transition-all"
                value={definition}
                onChange={(e) => {
                  setDefinition(e.target.value);
                  setError(""); // Clear error when user types
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter definition"
                disabled={isSaving}
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddFlashcard}
                disabled={isSaving || !word.trim() || !definition.trim()}
                className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                Add Flashcard
              </button>
              <button
                onClick={handleOpenChatbot}
                disabled={isSaving}
                className="px-6 py-3 bg-green-600 dark:bg-green-500 text-white rounded-xl font-medium hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Ask AI
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Flashcards List Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Flashcards in Set <span className="text-blue-600 dark:text-blue-400">({flashcards.length})</span>
            </h2>
            {flashcards.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to clear all flashcards?")) {
                    setFlashcards([]);
                  }
                }}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
                disabled={isSaving}
              >
                Clear All
              </button>
            )}
          </div>

          {flashcards.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No flashcards added yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Add your first flashcard above</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {flashcards.map((card, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                      </div>
                      <p className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1 break-words">
                        {card.word}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
                        {card.definition}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFlashcard(index)}
                      disabled={isSaving}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      title="Remove flashcard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveFlashcardSet}
            disabled={isSaving || flashcards.length === 0 || !deckTitle.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Flashcard Set"
            )}
          </button>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        onAddFlashcard={handleAddFlashcardFromAI}
      />
    </div>
  );
}
