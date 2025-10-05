import { NavBar } from "./NavBar";
import { useState } from "react";

export const Roomate = ({ students }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Roommate
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Search for compatible roommates based on your study program and
            preferences
          </p>

          {/* Search Box */}
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, program, or email..."
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 shadow-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:outline-none transition-all duration-300 transform focus:-translate-y-1"
              />
            </div>
          </div>
        </div>

        {/* Search Prompt - Show when no search term */}

        <div className="text-center py-20">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Start Your Search
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Begin typing to discover students who are looking for roommates.
            Search by name, study program, or email.
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm">
              Try: "ASEDS"
            </span>
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm">
              Try: "Cloud"
            </span>
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm">
              Try: "Smart"
            </span>
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm">
              Try: "SESNUM"
            </span>
          </div>
        </div>

        {/* Students Grid - Only show when there are results */}

        {/* No Results - Show only when user has searched but no matches found */}

        <div className="text-center py-16">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            No students found
          </h3>
          <p className="text-gray-600 mb-6">
            No matches for " ". Try different keywords or browse with broader
            terms.
          </p>
          <button className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-full hover:bg-indigo-200 transition-all duration-300">
            Clear Search
          </button>
        </div>
      </div>
    </div>
  );
};
