import React, { useState } from 'react';

/**
 * Version 0x04: Basic Counter Application using React's built-in useState hook.
 *
 * This component demonstrates local state management:
 * 1. The 'count' state is managed entirely within this component.
 * 2. Changes to 'count' only trigger re-renders of this component (and its children).
 * 3. State cannot be easily accessed by sibling or distant parent components.
 */
const CounterApp: React.FC = () => {
  // Initialize the local state 'count' with a value of 0.
  const [count, setCount] = useState(0);

  /**
   * Increments the count by 1.
   * Treats state as immutable by creating a new value (count + 1).
   */
  const increment = () => {
    setCount(count + 1);
  };

  /**
   * Decrements the count by 1, but prevents it from going below 0.
   * This logic maintains data integrity (the count must be non-negative).
   */
  const decrement = () => {
    // Check if count is greater than 0 before decrementing.
    setCount(currentCount => (currentCount > 0 ? currentCount - 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 to-pink-500 flex flex-col justify-center items-center text-white p-4">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-center">🤖 Fun Counter App 🎉</h1>

        {/* Funny message / Status Indicator */}
        <p className="text-lg font-medium mb-8 text-center min-h-6">
          {/* Display current count and a fun message based on its value */}
          Current count: {count} {count === 0 ? (
            "🙈 No clicks yet!"
          ) : count % 10 === 0 ? (
            "🔥 You're on fire!"
          ) : (
            `Keep going!`
          )}
        </p>

        {/* Counter Display */}
        <div className="text-8xl font-black mb-10 text-center bg-white text-pink-600 p-4 rounded-xl shadow-inner">
          {count}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 justify-center">
          <button
            onClick={increment}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-300 min-w-[150px]"
          >
            Increment 🚀
          </button>
          <button
            onClick={decrement}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-300 min-w-[150px]"
          >
            Decrement 👎
          </button>
        </div>

        {/* Footer message */}
        <p className="mt-8 text-sm text-center text-white opacity-90">
          *This version uses the simple local **useState** hook.
        </p>
      </div>
    </div>
  );
}

export default CounterApp;
