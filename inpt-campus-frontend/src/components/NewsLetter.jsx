import React from "react";
import { ArrowRight } from "iconoir-react";
export const NewsLetter = () => {
  return (
    <div className="bg-[#F6F6F6] min-h-[30vh] py-8 md:py-10">
      <div className="px-4 sm:px-8 md:px-16 lg:px-40 max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Subscribe to our Newsletter
        </h1>
        <p className="text-gray-500 mb-4 text-sm md:text-base">
          Get the latest updates directly to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-2/3 lg:w-1/2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
          />
          <button className="bg-[#3337BF] text-white text-xs md:text-sm rounded-lg px-4 py-2 md:py-3 w-full sm:w-[130px] hover:bg-[#2a2eb5] transition flex items-center justify-center gap-1">
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
