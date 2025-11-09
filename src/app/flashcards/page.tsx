"use client";

import React, { useState } from "react";
import Layout from "../layout";
import AIChatbot from "../../components/AIChatbot";

interface Flashcard {
  word: string;
  definition: string;
}

export default function CreateFlashcardSet() {
  const [deckTitle, setDeckTitle] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

  return (
    <Layout includeHeader centerChildren>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Flashcard Set</h1>

        <div className="mb-4">
          <label htmlFor="deckTitle" className="block text-sm font-medium text-gray-700">
            Deck Title
          </label>
          <input
            type="text"
            id="deckTitle"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
            placeholder="e.g., Spanish Vocabulary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="word" className="block text-sm font-medium text-gray-700">
            Word
          </label>
          <input
            type="text"
            id="word"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="definition" className="block text-sm font-medium text-gray-700">
            Definition
          </label>
          <textarea
            id="definition"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          ></textarea>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleAddFlashcard}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Flashcard
          </button>
          <button
            onClick={() => {
              setDeckTitle("");
              setWord("");
              setDefinition("");
              setFlashcards([]);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancel Set
          </button>
          <button
            onClick={handleOpenChatbot}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Ask AI
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Flashcards in Set:</h2>
          {flashcards.length === 0 ? (
            <p>No flashcards added yet.</p>
          ) : (
            <ul className="space-y-2">
              {flashcards.map((card, index) => (
                <li key={index} className="p-3 border rounded-md bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{card.word}</p>
                    <p className="text-gray-600 text-sm">{card.definition}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFlashcard(index)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        onAddFlashcard={handleAddFlashcardFromAI}
      />
    </Layout>
  );
}