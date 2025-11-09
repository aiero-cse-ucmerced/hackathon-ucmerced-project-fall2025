"use client";

import React, { useState, useEffect, useRef } from "react";

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFlashcard: (word: string, definition: string) => void;
}

interface Message {
  sender: "user" | "ai";
  text: string;
  flashcard?: {
    word: string;
    definition: string;
  };
}

export default function AIChatbot({
  isOpen,
  onClose,
  onAddFlashcard,
}: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          sender: "ai",
          text: "Hello! I can help you create flashcards. What topic or specific flashcard would you like to create?",
        },
      ]);
    } else {
      setMessages([]); // Clear messages when closed
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    const userInput = input; 
    setInput("");

    try {
      // ✅ FIX APPLIED: Correct API route path
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: userInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle 400 (Bad Request) or 500 (Internal Server Error)
        console.error("API error:", data.error, data.details);
        throw new Error(data.details || data.error || "API request failed.");
      }

      if (data.flashcards && data.flashcards.length > 0) {
        // Success path: flashcards received
        data.flashcards.forEach((fc: { word: string; definition: string }) => {
          const aiMessage: Message = {
            sender: "ai",
            text: `Here's a flashcard for "${fc.word}":`,
            flashcard: {
              word: fc.word,
              definition: fc.definition,
            },
          };
          setMessages((prevMessages) => [...prevMessages, aiMessage]);
        });
      } else {
        // Model returned a non-JSON/polite message
        const aiMessage: Message = {
          sender: "ai",
          text: data.message || "I couldn't generate a flashcard for that. Please try another topic.",
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      console.error("Error communicating with API:", error);
      // Display the specific error detail caught from the server
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: `Error: ${(error as Error).message || "Something went wrong while trying to connect."}`,
        },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col" style={{ height: "80vh" }}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">AI Flashcard Assistant</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
                {msg.flashcard && (
                  <div className="mt-2 p-2 bg-blue-100 rounded-md">
                    <p className="font-semibold">{msg.flashcard.word}</p>
                    <p className="text-sm">{msg.flashcard.definition}</p>
                    <button
                      onClick={() => onAddFlashcard(msg.flashcard!.word, msg.flashcard!.definition)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
                    >
                      Add to Deck
                    </button>
                  </div>
                )}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t flex">
          <input
            type="text"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}