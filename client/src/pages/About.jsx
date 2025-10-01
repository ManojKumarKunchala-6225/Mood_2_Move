import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 py-24 md:px-20 lg:px-32"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Navbar />
      {/* Added a container for better padding and centering on all screen sizes */}
      <div className="max-w-4xl mx-auto bg-black bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 mt-8 mb-8 text-center">
          About Mood2Move
        </h1>

        {/* Adjusted text size for better readability on smaller screens */}
        <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
          <strong>Mood2Move</strong> is a unique tourism web application designed to help travelers discover the perfect destinations across India based on their current mood, trip preferences, and location interests.
        </p>
        <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
          Whether you're seeking spiritual solace, fun entertainment, or peaceful retreats, Mood2Move curates personalized travel suggestions tailored just for you. By selecting your mood and trip type, you can explore a handpicked list of places that resonate with your vibe — whether you’re traveling solo, as a couple, or with family.
        </p>
        <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
          Built with rich visuals, intuitive navigation, and engaging animations, Mood2Move makes trip planning enjoyable and inspiring. From interactive image carousels showcasing stunning landscapes to seamless browsing experiences, every feature aims to spark your wanderlust and simplify your travel decisions.
        </p>
        <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
          Our mission is to connect travelers with India’s diverse cultural and natural wonders in a way that feels personal and meaningful. Inspired by the rich heritage and vibrant diversity of India, Mood2Move invites you to embark on journeys that uplift your spirit and create lasting memories.
        </p>

        <p className="text-blue-400 text-base sm:text-lg leading-relaxed text-center font-extrabold mt-10">
          Ready to find your next adventure? Dive in and let Mood2Move guide your travel story.
        </p>
      </div>
    </section>
  );
};

export default About;
