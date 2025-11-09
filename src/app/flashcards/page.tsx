"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Main from "../../components/main";
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
      setFlashcards([...flashcards, { word, definition }]);
      setWord("");
      setDefinition("");
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddFlashcard();
    }
  };

  const handleSaveFlashcardSet = async () => {
    if (!deckTitle.trim()) {
      setError("Please enter a deck title");
      return;
    }

    if (flashcards.length === 0) {
      setError("Please add at least one flashcard");
      return;
    }

    setIsSaving(true);
    setError("");
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
    <Main includeHeader centerChildren>
      <div className="container mx-auto p-4 max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-4">Create Flashcard Set</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-md">
            Flashcard set created successfully! Redirecting...
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="deckTitle" className="block text-sm font-medium mb-2">
            Deck Title *
          </label>
          <input
            type="text"
            id="deckTitle"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-800 dark:text-gray-100"
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
            placeholder="e.g., Spanish Vocabulary"
            disabled={isSaving}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-800 dark:text-gray-100"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Languages, Science, History"
            disabled={isSaving}
          />
        </div>

        <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-lg font-semibold mb-3">Add New Flashcard</h2>
          <div className="mb-4">
            <label htmlFor="word" className="block text-sm font-medium mb-2">
              Word/Term
            </label>
            <input
              type="text"
              id="word"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-800 dark:text-gray-100"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter word or term"
              disabled={isSaving}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="definition" className="block text-sm font-medium mb-2">
              Definition
            </label>
            <textarea
              id="definition"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 dark:bg-gray-800 dark:text-gray-100"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Enter definition"
              disabled={isSaving}
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddFlashcard}
              disabled={isSaving || !word.trim() || !definition.trim()}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Flashcard
            </button>
            <button
              onClick={handleOpenChatbot}
              disabled={isSaving}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Ask AI
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Flashcards in Set ({flashcards.length}):</h2>
          {flashcards.length === 0 ? (
            <p className="text-secondary">No flashcards added yet. Add your first flashcard above.</p>
          ) : (
            <ul className="space-y-2">
              {flashcards.map((card, index) => (
                <li key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{card.word}</p>
                    <p className="text-sm text-secondary mt-1">{card.definition}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFlashcard(index)}
                    disabled={isSaving}
                    className="ml-4 px-3 py-1 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 flex space-x-4 justify-end">
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-6 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-md hover:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveFlashcardSet}
            disabled={isSaving || flashcards.length === 0 || !deckTitle.trim()}
            className="px-6 py-2 bg-blue-500 dark:bg-teal-500 text-white rounded-md hover:bg-blue-600 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSaving ? "Saving..." : "Create Flashcard Set"}
          </button>
        </div>
      </div>
      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        onAddFlashcard={handleAddFlashcardFromAI}
      />
    </Main>
  );
}