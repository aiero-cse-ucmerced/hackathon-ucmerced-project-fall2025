"use client";

import { useState } from "react";
import Layout from "../layout";

interface Flashcard {
  word: string;
  definition: string;
}

export default function CreateFlashcardSet() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleAddFlashcard = () => {
    if (word.trim() && definition.trim()) {
      setFlashcards([...flashcards, { word, definition }]);
      setWord("");
      setDefinition("");
    }
  };

  return (
    <Layout includeHeader centerChildren>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Flashcard Set</h1>

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

        <button
          onClick={handleAddFlashcard}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Flashcard
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Flashcards in Set:</h2>
          {flashcards.length === 0 ? (
            <p>No flashcards added yet.</p>
          ) : (
            <ul className="space-y-2">
              {flashcards.map((card, index) => (
                <li key={index} className="p-3 border rounded-md bg-gray-50">
                  <p className="font-medium">{card.word}</p>
                  <p className="text-gray-600 text-sm">{card.definition}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}