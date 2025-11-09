"use client";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="inline-block bg-orange-400 text-white px-4 py-2 rounded-lg mb-2">Welcome</span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">back!</span>
          </h1>
          <p className="text-lg text-secondary">You're all set to start learning</p>
          <Link
            href="/home"
            className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Intelligent Flashcards</h1>
          <Link
            href="/login"
            className="text-sm md:text-base text-secondary hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12 md:py-20">
        <div className="max-w-4xl w-full text-center space-y-12">
          {/* Title with Split Background */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="inline-block bg-orange-400 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl mb-3 md:mb-4 shadow-lg">
                Let's start your
              </span>
              <br />
              <span className="text-blue-600 dark:text-blue-400">journey.</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
              Create intelligent flashcards with AI and master any subject faster
            </p>
          </div>

          {/* Network Visualization */}
          <div className="relative flex items-center justify-center py-12 md:py-16">
            <div className="relative w-64 h-64 md:w-80 md:h-80 max-w-full">
              {/* Connection Lines */}
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 320 320"
                style={{ zIndex: 1 }}
                preserveAspectRatio="xMidYMid meet"
              >
                {[0, 60, 120, 180, 240, 300].map((angle, index) => {
                  const radius = 110;
                  const angleRad = (angle * Math.PI) / 180;
                  const centerX = 160;
                  const centerY = 160;
                  const x = centerX + Math.cos(angleRad) * radius;
                  const y = centerY + Math.sin(angleRad) * radius;
                  return (
                    <line
                      key={index}
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-purple-300 dark:text-purple-600 opacity-40"
                    />
                  );
                })}
              </svg>

              {/* Central Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-purple-400 dark:bg-purple-500 rounded-full flex items-center justify-center shadow-xl z-10 border-4 border-white dark:border-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 md:h-12 md:w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              {/* Connected Circles */}
              {[
                { angle: 0, size: "w-14 h-14 md:w-16 md:h-16", bg: "bg-green-400 dark:bg-green-500", icon: "📚" },
                { angle: 60, size: "w-12 h-12 md:w-14 md:h-14", bg: "bg-blue-400 dark:bg-blue-500", icon: "🧠" },
                { angle: 120, size: "w-14 h-14 md:w-16 md:h-16", bg: "bg-orange-400 dark:bg-orange-500", icon: "✨" },
                { angle: 180, size: "w-12 h-12 md:w-14 md:h-14", bg: "bg-purple-400 dark:bg-purple-500", icon: "🎯" },
                { angle: 240, size: "w-14 h-14 md:w-16 md:h-16", bg: "bg-pink-400 dark:bg-pink-500", icon: "🚀" },
                { angle: 300, size: "w-12 h-12 md:w-14 md:h-14", bg: "bg-yellow-400 dark:bg-yellow-500", icon: "💡" },
              ].map((circle, index) => {
                // Use percentage-based positioning for better responsiveness
                const radiusPercent = 38; // Percentage of container width
                const angleRad = (circle.angle * Math.PI) / 180;
                const xPercent = 50 + Math.cos(angleRad) * radiusPercent;
                const yPercent = 50 + Math.sin(angleRad) * radiusPercent;

                return (
                  <div
                    key={index}
                    className={`absolute ${circle.size} ${circle.bg} rounded-full flex items-center justify-center text-2xl md:text-3xl shadow-lg z-10 border-2 border-white dark:border-gray-800`}
                    style={{
                      top: `${yPercent}%`,
                      left: `${xPercent}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {circle.icon}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <Link
              href="/signup"
              className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 md:px-12 md:py-5 rounded-xl font-bold text-lg md:text-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
            </Link>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base text-secondary">
              <span>Already have an account?</span>
              <Link
                href="/login"
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-20">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
              <p className="text-sm text-secondary">
                Generate flashcards instantly with AI assistance
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">Study Faster</h3>
              <p className="text-sm text-secondary">
                Master any subject with spaced repetition
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-bold text-lg mb-2">Anywhere</h3>
              <p className="text-sm text-secondary">
                Study on any device, anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
